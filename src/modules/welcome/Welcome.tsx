import {StyleSheet, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {load} from '../../utils/Storage';
import icon_main_logo from '../../assets/icon_main_logo.png';
import UserStore from '../../stores/UserStore';

const Welcome = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const getUserInfo = async () => {
    const cacheUserInfo = await load('userInfo');
    if (cacheUserInfo && JSON.parse(cacheUserInfo)) {
      UserStore.setUserInfo(JSON.parse(cacheUserInfo));
      startHome();
    } else {
      startLogin();
    }
  };
  const startHome = () => {
    navigation.replace('MainTab');
  };
  const startLogin = () => {
    navigation.replace('Login');
  };
  useEffect(() => {
    setTimeout(() => {
      getUserInfo();
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <View style={styles.root}>
      <Image style={styles.main_logo} source={icon_main_logo} />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
  },
  main_logo: {
    width: 200,
    height: 105,
    marginTop: 200,
    resizeMode: 'contain',
  },
});
