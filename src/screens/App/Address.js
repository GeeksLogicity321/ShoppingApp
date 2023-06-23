import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';

const Address = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header
        leftTitle="Address"
        isBack
        isRightIcon={false}
        onLeftPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({});
