import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

const TabProfile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempImage, setTempImage] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user_data');
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue);
        setUserData(data);
        setTempName(data.name);
        setTempImage(data.image);
      }
    } catch (e) {
      console.error('Error loading user data:', e);
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 800,
      maxWidth: 800,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', 'Image picker error: ' + response.errorMessage);
        return;
      }
      if (response.assets && response.assets[0]) {
        const imageUri = `data:image/jpeg;base64,${response.assets[0].base64}`;
        setTempImage(imageUri);
      }
    });
  };

  const saveUserData = async () => {
    if (!tempName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (!tempImage) {
      Alert.alert('Error', 'Please select a profile image');
      return;
    }

    try {
      const newUserData = {
        name: tempName,
        image: tempImage,
        dateCreated: new Date().toISOString(),
      };
      await AsyncStorage.setItem('@user_data', JSON.stringify(newUserData));
      setUserData(newUserData);
      setIsEditing(false);
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (e) {
      console.error('Error saving user data:', e);
      Alert.alert('Error', 'Failed to save profile data');
    }
  };

  const updateUserData = async () => {
    try {
      const updatedData = {
        ...userData,
        name: tempName,
        image: tempImage,
      };
      await AsyncStorage.setItem('@user_data', JSON.stringify(updatedData));
      setUserData(updatedData);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (e) {
      console.error('Error updating user data:', e);
      Alert.alert('Error', 'Failed to update profile data');
    }
  };

  const deleteProfile = async () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@user_data');
              setUserData(null);
              setTempName('');
              setTempImage(null);
              Alert.alert('Success', 'Profile deleted successfully!');
            } catch (e) {
              console.error('Error deleting profile:', e);
              Alert.alert('Error', 'Failed to delete profile');
            }
          },
        },
      ],
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/bg/bg.png')}
      style={styles.container}>
      <LinearGradient
        colors={['rgba(12, 45, 72, 0.45)', 'rgba(20, 93, 160, 0.6)']}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
                {tempImage ? (
                  <Image source={{uri: tempImage}} style={styles.profileImage} />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>Add Photo</Text>
                  </View>
                )}
              </TouchableOpacity>

              {!userData ? (
                // New User View
                <View style={styles.editContainer}>
                  <TextInput
                    style={styles.input}
                    value={tempName}
                    onChangeText={setTempName}
                    placeholder="Enter your name"
                    placeholderTextColor="#B4B4B4"
                  />
                  <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={saveUserData}>
                    <Text style={styles.buttonText}>Save Profile</Text>
                  </TouchableOpacity>
                </View>
              ) : isEditing ? (
                // Edit Mode View
                <View style={styles.editContainer}>
                  <TextInput
                    style={styles.input}
                    value={tempName}
                    onChangeText={setTempName}
                    placeholder="Enter your name"
                    placeholderTextColor="#B4B4B4"
                  />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.saveButton]}
                      onPress={updateUserData}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.cancelButton]}
                      onPress={() => {
                        setIsEditing(false);
                        setTempName(userData.name);
                        setTempImage(userData.image);
                      }}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                // Display Mode View
                <View style={styles.infoContainer}>
                  <Text style={styles.nameText}>{userData.name}</Text>
                  {userData.dateCreated && (
                    <Text style={styles.dateText}>
                      Member since:{' '}
                      {new Date(userData.dateCreated).toLocaleDateString()}
                    </Text>
                  )}
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.editButton]}
                      onPress={() => setIsEditing(true)}>
                      <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.deleteButton]}
                      onPress={deleteProfile}>
                      <Text style={styles.buttonText}>Delete Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileContainer: {
    padding: 20,
    alignItems: 'center',
    // marginTop: '10%',
  },
  imageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 250,
    height: 250,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#B4E0FF',
  },
  placeholderImage: {
    width: 250,
    height: 250,
    borderRadius: 75,
    backgroundColor: 'rgba(180, 224, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#B4E0FF',
  },
  placeholderText: {
    color: '#FFFFFF',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  editContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B4E0FF',
  },
  infoContainer: {
    alignItems: 'center',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  dateText: {
    fontSize: 16,
    color: '#B4E0FF',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 120,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: 'rgba(20, 93, 160, 0.6)',
    borderWidth: 1,
    borderColor: '#B4E0FF',
  },
  saveButton: {
    backgroundColor: 'rgba(76, 175, 80, 0.6)',
    borderWidth: 1,
    borderColor: '#B4E0FF',
  },
  cancelButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.6)',
    borderWidth: 1,
    borderColor: '#B4E0FF',
  },
  deleteButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.6)',
    borderWidth: 1,
    borderColor: '#B4E0FF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
  },
});

export default TabProfile;
