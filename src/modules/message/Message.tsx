import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  GestureResponderEvent,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useLocalStore, observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import MessageStore from './MessageStore';
import GroupModal, {ModelRef} from './GroupModal';

import icon_group from '../../assets/icon_group.png';
import icon_star from '../../assets/icon_star.png';
import icon_new_follow from '../../assets/icon_new_follow.png';
import icon_comments from '../../assets/icon_comments.png';
import icon_to_top from '../../assets/icon_to_top.png';

const Message = observer(() => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const store = useLocalStore(() => new MessageStore());
  const haderList = [
    {id: 1, name: '赞和收藏', image: icon_star, messageName: 'unreadFavorate'},
    {
      id: 2,
      name: '新增关注',
      image: icon_new_follow,
      messageName: 'newFollow',
    },
    {
      id: 3,
      name: '评论和@',
      image: icon_comments,
      messageName: 'comment',
    },
  ];
  const groupModalRef = useRef<ModelRef>();
  useEffect(() => {
    store.requestMessageList();
    store.requestUnRead();
  }, [store]);

  const RenderTitle = () => {
    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
      },
      titleText: {
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        color: '#333',
      },
      icon_group: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginTop: 3,
      },
      groupText: {
        fontSize: 16,
        marginLeft: 6,
      },
      grouoLayout: {
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 12,
        // top: 10,
      },
    });
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleText}>消息</Text>
        <TouchableOpacity
          style={styles.grouoLayout}
          onPress={(e: GestureResponderEvent) => {
            groupModalRef.current?.show(e.nativeEvent.pageY);
          }}>
          <Image source={icon_group} style={styles.icon_group} />
          <Text style={styles.groupText}>群聊</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const Header = () => {
    const styles = StyleSheet.create({
      headerLayout: {
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 16,
      },
      headerItem: {
        alignItems: 'center',
      },
      headerImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
      },
      headerNameText: {
        fontSize: 20,
        color: '#000',
        marginTop: 10,
      },
      messageText: {
        position: 'absolute',
        top: 0,
        right: 2,
        fontSize: 12,
        backgroundColor: '#ff2442',
        paddingHorizontal: 2,
        borderRadius: 100,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
      },
    });
    return (
      <View style={styles.headerLayout}>
        {haderList.map(item => {
          const message = store.unRead[item.messageName];
          return (
            <TouchableOpacity style={styles.headerItem} key={item.id}>
              <Image source={item.image} style={styles.headerImage} />
              <Text style={styles.headerNameText}>{item.name}</Text>
              {message && (
                <Text style={styles.messageText}>
                  {message > 99 ? '99+' : message}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const RenderItem = ({item}: {item: MessageListItem}) => {
    const styles = StyleSheet.create({
      renderItem: {
        width: '100%',
        height: 60,
        // backgroundColor: 'red',
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
      },
      itemAvatar: {width: 50, height: 50, borderRadius: 25},
      messageLayout: {
        flex: 1,
        paddingHorizontal: 10,
      },
      nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
      },
      lastMessageText: {
        marginTop: 4,
      },
      timeLayout: {
        alignItems: 'flex-end',
      },
      lastMessageTimeText: {},
      icon_to_top: {
        width: 10,
        height: 10,
        resizeMode: 'contain',
        marginTop: 6,
      },
    });
    return (
      <View style={styles.renderItem}>
        <Image source={{uri: item.avatarUrl}} style={styles.itemAvatar} />
        <View style={styles.messageLayout}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.lastMessageText} numberOfLines={1}>
            {item.lastMessage}
          </Text>
        </View>
        <View style={styles.timeLayout}>
          <Text style={styles.lastMessageTimeText}>
            {item.lastMessageTime || '昨天'}
          </Text>
          <Image source={icon_to_top} style={styles.icon_to_top} />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {RenderTitle()}
      {Header()}
      <FlatList
        style={{flex: 1}}
        data={store.messageList}
        extraData={[store.unRead]}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={RenderItem}
        // ListHeaderComponent={Header}
      />
      <GroupModal ref={groupModalRef} />
    </View>
  );
});

export default Message;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});
