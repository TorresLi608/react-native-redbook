import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useLocalStore, observer} from 'mobx-react';
import dayjs from 'dayjs';
import ArticleDetailStore from './ArticleDetailStore';
import {ImageSlider} from '../../components/slidePager';
import Heart from '../../components/Heart';
import UserStore from '../../stores/UserStore';

import icon_arrow from '../../assets/icon_arrow.png';
import icon_share from '../../assets/icon_share.png';
import icon_collection from '../../assets/icon_collection.png';
import icon_collection_selected from '../../assets/icon_collection_selected.png';
import icon_comment from '../../assets/icon_comment.png';
import icon_edit_comment from '../../assets/icon_edit_comment.png';
const {width: SCREEN_WIDTH} = Dimensions.get('window');

type RouterParams = {
  ArticleDetail: {
    id: number;
  };
};

const ArticleDetail = observer(() => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const store = useLocalStore(() => new ArticleDetailStore());
  const {params} = useRoute<RouteProp<RouterParams, 'ArticleDetail'>>();
  const [imageHeight, setImageHeight] = useState(0);
  const initData = async () => {
    await store.requestArticleDetail(params.id);
    const {details} = store;
    if (details.images?.length) {
      Image.getSize(details.images[0], (width: number, height: number) => {
        const showHeight = (SCREEN_WIDTH * height) / width;
        setImageHeight(showHeight);
      });
    }
  };
  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const RenderTilte = () => {
    const {details} = store;
    if (!details) {
      return;
    }
    const {avatarUrl, userName} = details;
    const styles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
      },
      icon_arrow: {
        width: 28,
        height: 28,
      },
      icon_avatar: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 20,
        marginLeft: 6,
      },
      userNameText: {
        fontSize: 15,
        color: '#333',
        marginLeft: 10,
        flex: 1,
      },
      attentionButton: {
        width: 50,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#aaaaaa',
        borderRadius: 15,
      },
      attentionText: {
        paddingHorizontal: 16,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ff2442',
        fontSize: 12,
        color: '#ff2442',
        textAlign: 'center',
        textAlignVertical: 'center',
      },
      icon_share: {
        width: 28,
        height: 28,
        marginLeft: 8,
      },
    });
    return (
      <View style={styles.titleLayout}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}>
          <Image style={styles.icon_arrow} source={icon_arrow}></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.icon_avatar} source={{uri: avatarUrl}}></Image>
        </TouchableOpacity>
        <Text style={styles.userNameText}>{userName}</Text>
        <TouchableOpacity>
          <Text style={styles.attentionText}>关注</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={styles.icon_share} source={icon_share} />
        </TouchableOpacity>
      </View>
    );
  };
  const RenderImage = () => {
    const {details} = store;
    if (!details) {
      return;
    }
    const {images} = details;
    const data: any[] = images.map(image => {
      return {img: image};
    });
    return (
      <View style={{paddingBottom: 26}}>
        <ImageSlider
          data={data}
          autoPlay={false}
          closeIconColor="#fff"
          caroselImageStyle={{width: SCREEN_WIDTH, height: imageHeight}}
          indicatorContainerStyle={{bottom: -40}}
          activeIndicatorStyle={styles.activeDot}
          inActiveIndicatorStyle={styles.inAcitveDot}
        />
      </View>
    );
  };
  const RenderInfo = () => {
    const {details} = store;
    if (!details) {
      return;
    }
    const tags = details.tag?.map(i => `# ${i}`).join(' ');
    return (
      <>
        <Text style={styles.articleTitleTxt}>{details.title}</Text>
        <Text style={styles.descTxt}>{details.desc}</Text>
        <Text style={styles.tagsTxt}>{tags}</Text>
        <Text style={styles.timeAndLocationTxt}>
          {details.dateTime} {details.location}
        </Text>
        <View style={styles.line} />
      </>
    );
  };
  const RenderComments = () => {
    const {details} = store;
    if (!details) {
      return;
    }
    const count = details.comments?.length || 0;
    const {userInfo} = UserStore;

    const styles = StyleSheet.create({
      commentsCountTxt: {
        fontSize: 14,
        color: '#666',
        marginTop: 20,
        marginLeft: 16,
      },
      inputLayout: {
        width: '100%',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
      },
      userAvatarImg: {
        width: 32,
        height: 32,
        borderRadius: 16,
        resizeMode: 'cover',
      },
      commentInput: {
        flex: 1,
        height: 32,
        borderRadius: 16,
        marginLeft: 12,
        backgroundColor: '#f0f0f0',
        fontSize: 14,
        color: '#333',
        textAlignVertical: 'center',
        paddingVertical: 0,
        paddingHorizontal: 12,
      },
      commentsContainer: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
      },
      commentItem: {
        width: '100%',
        flexDirection: 'row',
      },
      cAvatar: {
        width: 36,
        height: 36,
        resizeMode: 'cover',
        borderRadius: 18,
      },
      contentLayout: {
        flex: 1,
        marginHorizontal: 12,
      },
      nameTxt: {
        fontSize: 12,
        color: '#999',
      },
      messageTxt: {
        fontSize: 14,
        color: '#333',
        marginTop: 6,
      },
      timeLocationTxt: {
        fontSize: 12,
        color: '#bbb',
      },
      countLayout: {
        alignItems: 'center',
      },
      fCount: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
      },
      divider: {
        marginLeft: 50,
        marginRight: 0,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#eee',
        marginVertical: 16,
      },
    });

    return (
      <>
        <Text style={styles.commentsCountTxt}>
          {count ? `共 ${count} 条评论` : '暂无评论'}
        </Text>
        <View style={styles.inputLayout}>
          <Image style={styles.userAvatarImg} source={{uri: userInfo.avatar}} />
          <TextInput
            style={styles.commentInput}
            placeholder="说点什么吧，万一火了呢～"
            placeholderTextColor={'#bbb'}
          />
        </View>

        {!!count && (
          <View style={styles.commentsContainer}>
            {details.comments?.map((i: ArticleComment, index: number) => {
              return (
                <View key={`${index}`} style={{}}>
                  <View style={styles.commentItem}>
                    <Image style={styles.cAvatar} source={{uri: i.avatarUrl}} />
                    <View style={styles.contentLayout}>
                      <Text style={styles.nameTxt}>{i.userName}</Text>
                      <Text style={styles.messageTxt}>
                        {i.message}
                        <Text style={styles.timeLocationTxt}>
                          {dayjs(i.dateTime).format('MM-DD')} {i.location}
                        </Text>
                      </Text>

                      {!!i.children?.length &&
                        i.children.map(
                          (j: ArticleComment, subIndex: number) => {
                            console.log(j, 'jjj');
                            return (
                              <View
                                key={`${index}-${subIndex}`}
                                style={[
                                  styles.commentItem,
                                  {marginTop: 12, width: SCREEN_WIDTH - 80},
                                ]}>
                                <Image
                                  style={[
                                    styles.cAvatar,
                                    {width: 32, height: 32},
                                  ]}
                                  source={{uri: j.avatarUrl}}
                                />
                                <View style={styles.contentLayout}>
                                  <Text style={styles.nameTxt}>
                                    {j.userName}
                                  </Text>
                                  <Text style={styles.messageTxt}>
                                    {j.message}
                                    <Text style={styles.timeLocationTxt}>
                                      {dayjs(j.dateTime).format('MM-DD')}{' '}
                                      {j.location}
                                    </Text>
                                  </Text>
                                </View>

                                <View style={styles.countLayout}>
                                  <Heart size={20} value={j.isFavorite} />
                                  <Text style={styles.fCount}>
                                    {j.favoriteCount}
                                  </Text>
                                </View>
                              </View>
                            );
                          },
                        )}
                      {/* <Text>展开{i.children?.length - 1}条回复</Text> */}
                    </View>

                    <View style={styles.countLayout}>
                      <Heart size={20} value={i.isFavorite} />
                      <Text style={styles.fCount}>{i.favoriteCount}</Text>
                    </View>
                  </View>

                  <View style={styles.divider} />
                </View>
              );
            })}
          </View>
        )}
      </>
    );
  };

  const RenderBottom = () => {
    const {details} = store;
    if (!details) {
      return;
    }
    return (
      <View style={styles.bottomLayout}>
        <View style={styles.bottomEditLayout}>
          <Image style={styles.editImg} source={icon_edit_comment} />
          <TextInput
            style={styles.bottomCommentInput}
            placeholder="说点什么"
            placeholderTextColor={'#333'}
          />
        </View>
        <Heart size={30} value={details.isFavorite} />
        <Text style={styles.bottomCount}>{details.favoriteCount}</Text>

        <Image
          style={styles.bottomIcon}
          source={
            details.isCollection ? icon_collection_selected : icon_collection
          }
        />
        <Text style={styles.bottomCount}>{details.collectionCount}</Text>

        <Image style={styles.bottomIcon} source={icon_comment} />
        <Text style={styles.bottomCount}>{details.comments?.length || 0}</Text>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {RenderTilte()}
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingBottom: 64}}
        showsVerticalScrollIndicator={false}>
        {RenderImage()}
        {RenderInfo()}
        {RenderComments()}
      </ScrollView>
      {RenderBottom()}
    </View>
  );
});

export default ArticleDetail;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
  activeDot: {
    width: 6,
    height: 6,
    backgroundColor: '#ff2442',
    borderRadius: 3,
  },
  inAcitveDot: {
    width: 6,
    height: 6,
    backgroundColor: '#c0c0c0',
    borderRadius: 3,
  },
  articleTitleTxt: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  descTxt: {
    fontSize: 15,
    color: '#333',
    marginTop: 6,
    paddingHorizontal: 16,
  },
  tagsTxt: {
    fontSize: 15,
    color: '#305090',
    marginTop: 6,
    paddingHorizontal: 16,
  },
  timeAndLocationTxt: {
    fontSize: 12,
    color: '#bbb',
    marginVertical: 16,
    marginLeft: 16,
  },
  line: {
    marginHorizontal: 16,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#eee',
  },
  bottomLayout: {
    width: '100%',
    height: 64,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  bottomEditLayout: {
    height: 40,
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 12,
  },
  editImg: {
    width: 20,
    height: 20,
    tintColor: '#333',
  },
  bottomCommentInput: {
    height: '100%',
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'center',
    paddingVertical: 0,
  },
  bottomCount: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bottomIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 12,
  },
});
