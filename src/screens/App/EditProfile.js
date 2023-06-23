import {heightPercentageToDP} from 'react-native-responsive-screen';
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import Header from '../../components/Header';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../redux/userSlice';
import {setLoader} from '../../redux/globalSlice';

const EditProfile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isLogin, userData} = useSelector(state => state.user);
  const [firstName, setFirstName] = useState(
    isLogin ? userData?.firstName : '',
  );
  const [lastName, setLastName] = useState(isLogin ? userData?.lastName : '');

  const saveChanges = () => {
    dispatch(setLoader(true));
    let payload = {
      firstName,
      lastName,
    };
    setTimeout(() => {
      dispatch(setUser({...userData, ...payload}));
      dispatch(setLoader(false));
      Toast.show({
        type: 'success',
        text1: 'Successfully',
        text2: 'Your profile name has been successfully changed.',
      });
      navigation.goBack();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Header
        leftTitle="Edit Profile"
        isBack
        isRightIcon={false}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={styles.child}>
        <Input
          title={'Edit First Name'}
          placeholderText={''}
          value={firstName}
          handleOnChangeTxt={text => setFirstName(text)}
          marginTop={heightPercentageToDP(3)}
        />
        <Input
          title={'Edit Last Name'}
          placeholderText={''}
          value={lastName}
          handleOnChangeTxt={text => setLastName(text)}
          marginTop={heightPercentageToDP(3)}
        />
        <PrimaryButton text={'Save Changes'} onPress={() => saveChanges()} />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  child: {
    width: '90%',
    alignSelf: 'center',
  },
});
