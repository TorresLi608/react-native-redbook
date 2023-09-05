import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  LayoutAnimation,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import icon_search from '../../assets/icon_search.png';
import icon_arrow from '../../assets/icon_arrow.png';

const SearchGoods = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [showArrow, setShowArrow] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const onPressSearchGoods = () => {
    setShowArrow(false);
    LayoutAnimation.easeInEaseOut();
    setTimeout(() => {
      navigation.pop();
    }, 300);
  };
  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setShowArrow(true);
      inputRef.current?.focus();
    }, 100);
  }, []);
  return (
    <View style={styles.titleLayout}>
      {showArrow && (
        <TouchableOpacity onPress={onPressSearchGoods}>
          <Image source={icon_arrow} style={styles.icon_arrow} />
        </TouchableOpacity>
      )}

      <View style={styles.inputLayout}>
        <Image source={icon_search} style={styles.icon_search} />
        <TextInput
          ref={inputRef}
          placeholder="bm吊带"
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.searchText}>搜索</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchGoods;

const styles = StyleSheet.create({
  titleLayout: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  inputLayout: {
    flex: 1,
    height: 36,
    backgroundColor: '#dedede',
    borderRadius: 18,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon_search: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 6,
    paddingVertical: 0,
  },
  searchText: {
    fontSize: 20,
    marginLeft: 8,
  },
  icon_arrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
});
