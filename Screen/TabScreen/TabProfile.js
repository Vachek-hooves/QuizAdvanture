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
  const [userData, setUserData] = useState({
    name: '',
    image: null,
    dateCreated: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

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
      }
    } catch (e) {
      console.error('Error loading user data:', e);
    }
  };

  const saveUserData = async () => {
    try {
      const newUserData = {
        ...userData,
        name: tempName,
        dateCreated: userData.dateCreated || new Date().toISOString(),
      };
      await AsyncStorage.setItem('@user_data', JSON.stringify(newUserData));
      setUserData(newUserData);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (e) {
      console.error('Error saving user data:', e);
      Alert.alert('Error', 'Failed to save profile data');
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
      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        Alert.alert('Error', 'Image picker error: ' + response.errorMessage);
        return;
      }

      if (response.assets && response.assets[0]) {
        const newUserData = {
          ...userData,
          image: `data:image/jpeg;base64,${response.assets[0].base64}`,
        };
        setUserData(newUserData);
        saveUserData();
      }
    });
  };

  const deleteProfile = async () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('@user_data');
              setUserData({
                name: '',
                image: null,
                dateCreated: '',
              });
              setTempName('');
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
      source={require('../../assets/bg/warrior.png')}
      style={styles.container}>
      <LinearGradient
        colors={['rgba(12, 45, 72, 0.45)', 'rgba(20, 93, 160, 0.6)']}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
                {userData.image ? (
                  <Image
                    source={{uri: userData.image}}
                    style={styles.profileImage}
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>Add Photo</Text>
                  </View>
                )}
              </TouchableOpacity>

              {isEditing ? (
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
                      onPress={saveUserData}>
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.cancelButton]}
                      onPress={() => {
                        setIsEditing(false);
                        setTempName(userData.name);
                      }}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.infoContainer}>
                  <Text style={styles.nameText}>
                    {userData.name || 'Add Your Name'}
                  </Text>
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
    marginTop:'40%',
  },
  imageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#B4E0FF',
  },
  placeholderImage: {
    width: 150,
    height: 150,
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