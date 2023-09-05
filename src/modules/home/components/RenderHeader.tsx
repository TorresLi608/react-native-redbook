import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import icon_daily from '../../../assets/icon_daily.png';
import icon_search from '../../../assets/icon_search.png';

type Props = {
  tab: number;
  onChange: (curTab: number) => void;
};

const RenderHeader = ({tab = 1, onChange}: Props) => {
  return (
    <View style={styles.headerLayout}>
      <Image style={styles.icon_daily} source={icon_daily} />
      <View style={styles.centerTab}>
        <TouchableOpacity style={styles.tabItem} onPress={() => onChange(1)}>
          <Text style={[styles.tabText, tab === 1 && styles.activeTabText]}>
            关注
          </Text>
          {tab === 1 && <View style={styles.tabLine}></View>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => onChange(2)}>
          <Text style={[styles.tabText, tab === 2 && styles.activeTabText]}>
            发现
          </Text>
          {tab === 2 && <View style={styles.tabLine}></View>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => onChange(3)}>
          <Text style={[styles.tabText, tab === 3 && styles.activeTabText]}>
            成都
          </Text>
          {tab === 3 && <View style={styles.tabLine}></View>}
        </TouchableOpacity>
      </View>
      <Image style={styles.icon_search} source={icon_search} />
    </View>
  );
};

export default RenderHeader;

const styles = StyleSheet.create({
  headerLayout: {
    height: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  icon_daily: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  icon_search: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  centerTab: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabItem: {},
  tabText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 4,
  },
  activeTabText: {
    color: '#333',
    fontSize: 16,
  },
  tabLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#ff2442',
    borderRadius: 1,
  },
});
