import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../home/Home';
import Shop from '../shop/Shop';
import Message from '../message/Message';
import Mine from '../mine/Mine';

import icon_tab_publish from '../../assets/icon_tab_publish.png';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

const BottomTab = createBottomTabNavigator();
const MainTab = () => {
  // eslint-disable-next-line react/no-unstable-nested-components
  const RedBookTabBar = ({state, descriptors, navigation}: any) => {
    const {routes, index} = state;
    const onPublishPress = () => {
      launchImageLibrary(
        {
          mediaType: 'photo',
          quality: 1,
          includeBase64: true,
        },
        (res: ImagePickerResponse) => {
          const {assets} = res;
          if (!assets?.length) {
            console.log('选中图片失败');
            return;
          }
          // const {uri, width, height, fileName, fileSize, type} = assets[0];
        },
      );
    };
    return (
      <View style={styles.tabBarContainer}>
        {routes.map((route: any, i: number) => {
          const {options} = descriptors[route.key];
          const label = options.title;
          const isFocused = index === i;
          if (i === 2) {
            return (
              <TouchableOpacity
                key={label}
                style={styles.tabItem}
                onPress={onPublishPress}>
                <Image
                  style={styles.icon_tab_publish}
                  source={icon_tab_publish}
                />
              </TouchableOpacity>
            );
          }
          return (
            <TouchableOpacity
              key={label}
              style={styles.tabItem}
              onPress={() => {
                navigation.navigate(route.name);
              }}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: isFocused ? 18 : 16,
                  color: isFocused ? '#333' : '#999',
                  fontWeight: isFocused ? 'bold' : 'normal',
                }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.root}>
      <BottomTab.Navigator tabBar={props => <RedBookTabBar {...props} />}>
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{title: '首页', headerShown: false}}
        />
        <BottomTab.Screen
          name="Shop"
          component={Shop}
          options={{title: '购物', headerShown: false}}
        />
        <BottomTab.Screen
          name="Publish"
          component={Shop}
          options={{title: '发布', headerShown: false}}
        />
        <BottomTab.Screen
          name="Message"
          component={Message}
          options={{title: '消息', headerShown: false}}
        />
        <BottomTab.Screen
          name="Mine"
          component={Mine}
          options={{title: '我的', headerShown: false}}
        />
      </BottomTab.Navigator>
    </View>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  tabBarContainer: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tabItem: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_tab_publish: {
    width: 58,
    height: 42,
    resizeMode: 'contain',
  },
});
