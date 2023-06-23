import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {RFPercentage} from 'react-native-responsive-fontsize';

import colors from '../../constants/colors';
import {fontsFamily, fontsSize} from '../../constants/fonts';
import Header from '../../components/Header';

const Profile = () => {
  const navigation = useNavigation();

  let profileListing = [
    {
      title: 'Edit Profile',
      icon: (
        <FontAwesome
          name={'user-circle'}
          size={RFPercentage(2.5)}
          color={colors.textLight}
        />
      ),
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      title: 'Change Password',
      icon: (
        <MaterialCommunityIcons
          name={'onepassword'}
          size={RFPercentage(2.5)}
          color={colors.textLight}
        />
      ),
      onPress: () => navigation.navigate('ChangePassword'),
    },
  ];
  return (
    <View style={styles.container}>
      <Header
        leftTitle="Profile"
        isBack
        isRightIcon={false}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.flatlistWrapper}>
          <FlatList
            data={profileListing}
            ListEmptyComponent={() => <View style={{height: 100}} />}
            renderItem={({item, index}) => {
              return (
                <View style={styles.cardWrapper}>
                  <TouchableOpacity
                    onPress={item.onPress}
                    activeOpacity={0.9}
                    style={[styles.card, styles.shadow]}>
                    <View style={styles.rowDirection}>
                      {item.icon}
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <Ionicons
                      name={'chevron-forward'}
                      size={RFPercentage(2.5)}
                      color={colors.textLight}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  flatlistWrapper: {
    width: '100%',
    marginTop: heightPercentageToDP(1),
  },
  cardWrapper: {
    paddingHorizontal: widthPercentageToDP(4),
  },
  card: {
    marginTop: heightPercentageToDP(1),
    marginBottom: heightPercentageToDP(1),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentageToDP(3),
    paddingVertical: heightPercentageToDP(2),
    borderRadius: widthPercentageToDP(2),
  },
  shadow: {
    shadowColor: '#afafaf',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: fontsFamily.regular,
    fontSize: fontsSize.md1,
    marginLeft: widthPercentageToDP(2),
    color: colors.textDark,
  },
  heading: {
    paddingLeft: widthPercentageToDP(4),
    marginBottom: heightPercentageToDP(2),
    fontFamily: fontsFamily.semibold,
    fontSize: fontsSize.lg2,
    color: colors.textDark,
    textAlign: 'left',
  },
});
