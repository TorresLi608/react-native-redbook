import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import React, {useEffect, useState} from 'react';
import {useLocalStore, observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  checkUpdate,
  downloadUpdate,
  switchVersion,
  isFirstTime,
  isRolledBack,
  markSuccess,
} from 'react-native-update';
import FlowList from '../../components/flowlist/FlowList';
import ResizeImage from '../../components/ResizeImage';
import Heart from '../../components/Heart';
import RenderHeader from './components/RenderHeader';
import CategoryList from './components/CategoryList';
import HomeStore from './HomeStore';
import _updateConfig from '../../../update.json';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const {appKey} = _updateConfig[Platform.OS];
const Home = observer(() => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const store = useLocalStore(() => new HomeStore());
  const [categoryTab, setCategoryTab] = useState<string | number>();
  const [headerTab, setHeaderTab] = useState(1);
  const onRefresh = () => {
    store.resetPage();
    store.requestHomeList();
  };
  const onEndReached = () => {
    store.requestHomeList();
  };
  const onPressRenderItem = ({item}: {item: ArticleSimple}) => {
    navigation.push('ArticleDetail', {id: item.id});
  };
  const renderItem = ({item, index}: {item: ArticleSimple; index: number}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        key={index}
        onPress={() => onPressRenderItem({item})}>
        <ResizeImage uri={item.image} />
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.nameLayout}>
          <Image style={styles.avatarImg} source={{uri: item.avatarUrl}} />
          <Text style={styles.nameTxt}>{item.userName}</Text>
          <Heart value={item.isFavorite} />
          <Text style={styles.favoriteCountText}>{item.favoriteCount}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const Footer = () => {
    return <Text style={styles.footerText}>没有更多数据</Text>;
  };

  const initData = async () => {
    store.requestHomeList();
    await store.getCategoryList();
    setCategoryTab(store.categoryList[0].name);
  };

  // 检查补丁
  const checkPatch = async () => {
    try {
      const info: any = await checkUpdate(appKey);
      console.log(info, 'aasss');
      const {update} = info;
      if (update) {
        const hash = await downloadUpdate(
          info,
          // 下载回调为可选参数，从v5.8.3版本开始加入
          {
            onDownloadProgress: ({received, total}) => {
              // 已下载的字节数, 总字节数
              console.log(received, total);
            },
          },
        );
        if (hash) {
          switchVersion(hash);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    checkPatch();
    initData();
    if (isFirstTime) {
      // 必须调用此更新成功标记方法
      // 否则默认更新失败，下一次启动会自动回滚
      markSuccess();
      console.log('更新完成');
    } else if (isRolledBack) {
      console.log('刚刚更新失败了,版本被回滚.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.root, {paddingTop: insets.top}]}>
      <RenderHeader tab={headerTab} onChange={(v: number) => setHeaderTab(v)} />
      <FlowList
        style={styles.flatList}
        data={store.homeList}
        keyExtrator={(item: ArticleSimple) => `${item.id}`}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
        refreshing={store.refreshing}
        onRefresh={onRefresh} // 下拉刷新
        onEndReachedThreshold={0.1} // 距离底部还剩多少进行加载
        onEndReached={onEndReached} // 上拉刷新
        ListFooterComponent={Footer}
        ListHeaderComponent={
          <CategoryList
            tab={categoryTab}
            categoryList={store.categoryList}
            onChange={(v: number | string) => setCategoryTab(v)}
          />
        }
      />
    </View>
  );
});

export default Home;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  flatList: {
    width: '100%',
    height: '100%',
  },
  contentContainerStyle: {
    // paddingTop: 6,
  },
  item: {
    width: (SCREEN_WIDTH - 18) / 2,
    minHeight: 260,
    marginLeft: 6,
    marginBottom: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  itemTitleText: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 12,
    marginVertical: 4,
  },
  nameLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  avatarImg: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameTxt: {
    fontSize: 12,
    color: '#999',
    marginLeft: 6,
    flex: 1,
  },
  icon_heart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  favoriteCountText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  footerText: {
    width: '100%',
    fontSize: 14,
    color: '#999',
    marginVertical: 16,
    textAlign: 'center',
  },
});
