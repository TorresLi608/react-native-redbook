import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useLocalStore, observer} from 'mobx-react';
import ShopStore from './ShopStore';

import icon_search from '../../assets/icon_search.png';
import icon_shop_car from '../../assets/icon_shop_car.png';
import icon_orders from '../../assets/icon_orders.png';
import icon_menu_more from '../../assets/icon_menu_more.png';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SHOW_WIDTH = (SCREEN_WIDTH - 18) / 2;

const Shop = observer(() => {
  const store = useLocalStore(() => new ShopStore());
  const navigation = useNavigation<StackNavigationProp<any>>();
  const onSearchPress = () => {
    console.log('aaa');
    navigation.push('SearchGoods');
  };
  useEffect(() => {
    store.requestGoodsList();
    store.top10Category();
  }, [store]);

  const RenderTitle = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
      },
      inputLayout: {
        width: 280,
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
        // flex: 1,
        fontSize: 14,
        marginLeft: 6,
      },
      icon_shop_car: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
      },
      icon_orders: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
      },
      icon_menu_more: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
      },
    });
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity style={styles.inputLayout} onPress={onSearchPress}>
          <Image source={icon_search} style={styles.icon_search} />
          <Text style={styles.textInput}>点我搜索</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={icon_shop_car} style={styles.icon_shop_car} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={icon_orders} style={styles.icon_orders} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={icon_menu_more} style={styles.icon_menu_more} />
        </TouchableOpacity>
      </View>
    );
  };
  const RenderItem = ({item, index}) => {
    const styles = StyleSheet.create({
      item: {
        width: SHOW_WIDTH,
        borderRadius: 8,
        overflow: 'hidden',
        marginLeft: 6,
        marginTop: 6,
      },
      img: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
      },
      title: {
        fontSize: 14,
        color: '#333',
        marginBottom: 6,
      },
      textLayout: {
        padding: 4,
      },
      prefix: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
      },
      priceText: {
        fontSize: 22,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'justify',
      },
      originPriceText: {
        fontSize: 13,
        color: '#999',
        fontWeight: 'normal',
      },
      promotionText: {
        width: 78,
        fontSize: 12,
        color: '#999',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#bbb',
        textAlign: 'center',
      },
    });
    return (
      <View style={styles.item}>
        <Image source={{uri: item.image}} style={styles.img} />
        <View style={styles.textLayout}>
          <Text style={styles.title}>{item.title}</Text>
          {item?.promotion && (
            <Text style={styles.promotionText}>{item.promotion}</Text>
          )}
          <Text style={styles.prefix}>
            ¥ <Text style={styles.priceText}>{item.price}</Text>
            {'   '}
            {item?.originPrice && (
              <Text style={styles.originPriceText}>
                原价：{item.originPrice}
              </Text>
            )}
          </Text>
        </View>
      </View>
    );
  };
  const ListHeader = () => {
    const {top10CategoryList} = store;
    const styles = StyleSheet.create({
      contariner: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
      },
      categoryItem: {
        width: '20%',
        alignItems: 'center',
      },
      itemImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
      },
      nameText: {
        fontSize: 14,
        color: '#333',
        marginTop: 6,
      },
    });
    return (
      <View style={styles.contariner}>
        {top10CategoryList.map((item: GoodsCategory) => {
          return (
            <View style={styles.categoryItem} key={item.id}>
              <Image source={{uri: item.image}} style={styles.itemImage} />
              <Text style={styles.nameText}>{item.name}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {RenderTitle()}
      <FlatList
        style={{flex: 1}}
        data={store.goodsList}
        extraData={[store.top10CategoryList]}
        showsVerticalScrollIndicator={false}
        renderItem={RenderItem}
        ListHeaderComponent={ListHeader}
        numColumns={2}
      />
    </View>
  );
});

export default Shop;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});
