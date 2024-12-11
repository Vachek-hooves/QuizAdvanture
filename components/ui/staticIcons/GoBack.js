import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      activeOpacity={0.5}
      style={{
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 70,
        marginBottom: 50,
      }}>
      <Image
        source={require('../../../assets/icons/return.png')}
        style={{width: 50, height: 50, tintColor: 'white'}}
      />
    </TouchableOpacity>
  );
};

export default GoBack;
