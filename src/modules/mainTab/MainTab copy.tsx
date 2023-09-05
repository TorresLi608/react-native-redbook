import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../home/Home';
import Shop from '../shop/Shop';
import Message from '../message/Message';
import Mine from '../mine/Mine';

import icon_tab_home_normal from '../../assets/icon_tab_home_normal.png';
import icon_tab_home_selected from '../../assets/icon_tab_home_selected.png';
import icon_tab_shop_normal from '../../assets/icon_tab_shop_normal.png';
import icon_tab_shop_selected from '../../assets/icon_tab_shop_selected.png';
import icon_tab_message_normal from '../../assets/icon_tab_message_normal.png';
import icon_tab_message_selected from '../../assets/icon_tab_message_selected.png';
import icon_tab_mine_normal from '../../assets/icon_tab_mine_normal.png';
import icon_tab_mine_selected from '../../assets/icon_tab_mine_selected.png';

const BottomTab = createBottomTabNavigator();
const MainTab = () => {
  return (
    <View style={styles.root}>
      <BottomTab.Navigator
        screenOptions={({route}) => {
          return {
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused
                  ? icon_tab_home_selected
                  : icon_tab_home_normal;
              } else if (route.name === 'Shop') {
                iconName = focused
                  ? icon_tab_shop_selected
                  : icon_tab_shop_normal;
              } else if (route.name === 'Message') {
                iconName = focused
                  ? icon_tab_message_selected
                  : icon_tab_message_normal;
              } else if (route.name === 'Mine') {
                iconName = focused
                  ? icon_tab_mine_selected
                  : icon_tab_mine_normal;
              }
              return (
                <Image
                  source={iconName}
                  style={{width: size, height: size, tintColor: color}}
                />
              );
            },
          };
        }}
        // tabBarOptions={{
        //   activeTintColor: '#f00',
        //   inactiveTintColor: '#999',
        // }}
      >
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{title: '首页'}}
        />
        <BottomTab.Screen
          name="Shop"
          component={Shop}
          options={{title: '购物'}}
        />
        <BottomTab.Screen
          name="Message"
          component={Message}
          options={{title: '消息'}}
        />
        <BottomTab.Screen
          name="Mine"
          component={Mine}
          options={{title: '我的'}}
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
});
