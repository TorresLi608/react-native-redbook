import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useRef} from 'react';
import CategoryModal, {CategoryModalRef} from './CategoryModal';

import icon_arrow from '../../../assets/icon_arrow.png';

type Props = {
  categoryList: Category[];
  tab: number | string;
  onChange: (curTab: string) => void;
};

const CategoryList = ({tab, categoryList, onChange}: Props) => {
  const myList = categoryList.filter(i => i.isAdd);
  const categoryModalRef = useRef<CategoryModalRef>();
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {myList.map((item: Category) => {
          return (
            <TouchableOpacity
              key={item.name}
              style={styles.item}
              onPress={() => onChange(item.name)}>
              <Text
                style={[
                  styles.itemText,
                  tab === item.name && styles.activeItemText,
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          categoryModalRef.current.show();
        }}>
        <Image style={styles.icon_arrow} source={icon_arrow} />
      </TouchableOpacity>
      <CategoryModal ref={categoryModalRef} categoryList={categoryList} />
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    marginBottom: 6,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    height: '100%',
  },
  openButton: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_arrow: {
    width: 18,
    height: 18,
    resizeMode: 'cover',
    transform: [{rotate: '-90deg'}],
  },
  item: {
    width: 64,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#999',
  },
  activeItemText: {
    color: '#333',
    fontWeight: 'bold',
  },
});
