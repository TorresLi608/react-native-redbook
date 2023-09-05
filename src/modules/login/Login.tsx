import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Linking,
  TextInput,
  LayoutAnimation,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Toast from '../../components/widget/Toast';
import UserStore from '../../stores/UserStore';
import {formatPhone, replaceBlank} from '../../utils/StringUtil';
import icon_main_logo from '../../assets/icon_main_logo.png';
import icon_unselected from '../../assets/icon_unselected.png';
import icon_selected from '../../assets/icon_selected.png';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_wx from '../../assets/icon_wx.png';
import icon_wx_small from '../../assets/icon_wx_small.png';
import icon_eye_close from '../../assets/icon_eye_close.png';
import icon_eye_open from '../../assets/icon_eye_open.png';
import icon_exchange from '../../assets/icon_exchange.png';
import icon_triangle from '../../assets/icon_triangle.png';
import icon_close_modal from '../../assets/icon_close_modal.png';
import icon_qq from '../../assets/icon_qq.webp';

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
  const [check, setCheck] = useState(false);
  const [displayPassword, setDisplayPassword] = useState<boolean>(true);
  const [phone, setPhone] = useState<string>('');
  const [pwd, setPwd] = useState<string>('');
  const canLogin = useMemo(() => {
    return replaceBlank(phone).length === 11 && pwd;
  }, [phone, pwd]);

  const onLoginPress = async () => {
    if (!canLogin || !check) {
      if (!canLogin) {
        Toast.show('请输入正确的手机号和密码');
        return;
      }
      if (!check) {
        Toast.show('请阅读用户协议');
        return;
      }

      return;
    }

    UserStore.requestLogin(replaceBlank('dagongjue'), pwd, success => {
      if (success) {
        navigation.replace('MainTab');
      } else {
        Toast.show('登录失败,账号或密码错误！');
      }
    });
  };
  const renderQuickLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        paddingHorizontal: 56,
      },
      protocolLayout: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
      },
      radioButton: {
        width: 20,
        height: 20,
      },
      labelText: {
        fontSize: 12,
        color: '#999',
        marginLeft: 6,
      },
      protocolText: {
        fontSize: 12,
        color: '#1020ff',
      },
      otherLoginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom: 100,
      },
      otherLoginText: {
        fontSize: 14,
        color: '#303080',
      },
      icon_arrow: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
        marginLeft: 4,
        marginTop: 2,
        transform: [{rotate: '180deg'}],
      },
      wxLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#05c160',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
      icon_wx: {
        width: 40,
        height: 40,
      },
      wxLoginText: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      oneKeyLoginButton: {
        width: '100%',
        height: 56,
        backgroundColor: '#ff2442',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
      },
      oneKeyLoginText: {
        fontSize: 18,
        color: 'white',
        marginLeft: 6,
      },
      icon_main_logo: {
        width: 180,
        height: 95,
        resizeMode: 'contain',
        position: 'absolute',
        top: 170,
      },
    });
    return (
      <View style={styles.root}>
        <View style={styles.protocolLayout}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!check);
            }}>
            <Image
              style={styles.radioButton}
              source={check ? icon_selected : icon_unselected}
            />
          </TouchableOpacity>
          <Text style={styles.labelText}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.baidu.com');
            }}>
            <Text style={styles.protocolText}>《用户协议》和《隐私政策》</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.otherLoginButton}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setLoginType('input');
          }}>
          <Text style={styles.otherLoginText}>其他登录方式</Text>
          <Image style={styles.icon_arrow} source={icon_arrow} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wxLoginButton} activeOpacity={0.7}>
          <Image style={styles.icon_wx} source={icon_wx_small} />
          <Text style={styles.wxLoginText}>微信登录</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.oneKeyLoginButton} activeOpacity={0.7}>
          <Text style={styles.oneKeyLoginText}>一键登录</Text>
        </TouchableOpacity>
        <Image style={styles.icon_main_logo} source={icon_main_logo} />
      </View>
    );
  };
  const renderInputLogin = () => {
    const styles = StyleSheet.create({
      root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 54,
      },
      close_modal_box: {
        position: 'absolute',
        left: 40,
        top: 20,
      },
      icon_close_modal: {
        width: 28,
        height: 28,
      },
      passwordLoginText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: 50,
        marginBottom: 10,
      },
      profileText: {
        fontSize: 14,
        color: '#dedede',
      },
      phoneInputBox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        borderBottomWidth: 1,
        borderBlockColor: '#dedede',
        paddingBottom: 0,
      },
      numberText: {
        fontSize: 28,
      },
      icon_triangle: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
        marginLeft: 2,
      },
      phoneInput: {
        fontSize: 24,
        marginLeft: 8,
      },
      passwordInputBox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBlockColor: '#dedede',
        paddingBottom: 0,
      },
      passwordInput: {
        fontSize: 24,
        flexGrow: 1,
      },
      icon_eye: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginLeft: 4,
      },
      exchangeBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 14,
      },
      codeLeft: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon_exchange: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
      },
      codeLoginText: {
        fontSize: 14,
        marginLeft: 2,
      },
      forgetPasswordText: {
        fontSize: 14,
      },
      loginButton: {
        width: '100%',
        height: 50,
        borderRadius: 20,
        backgroundColor: '#ff2442',
        color: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
      loginButtonDisable: {
        width: '100%',
        height: 50,
        borderRadius: 20,
        backgroundColor: '#dddddd',
        color: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
      loginText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
      },
      protocolLayout: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 10,
      },
      radioButton: {
        width: 20,
        height: 20,
      },
      labelText: {
        fontSize: 12,
        color: '#999',
        marginLeft: 6,
      },
      protocolText: {
        fontSize: 12,
        color: '#1020ff',
      },
      buttonBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
      },
      icon_wx_small: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
      },
      icon_qq: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
      },
    });
    return (
      <View style={styles.root}>
        <TouchableOpacity
          style={styles.close_modal_box}
          onPress={() => {
            LayoutAnimation.easeInEaseOut();
            setLoginType('quick');
          }}>
          <Image source={icon_close_modal} style={styles.icon_close_modal} />
        </TouchableOpacity>
        <Text style={styles.passwordLoginText}>密码登录</Text>
        <Text style={styles.profileText}>
          未注册的手机号登录成功后将自动注册
        </Text>
        <View style={styles.phoneInputBox}>
          <Text style={styles.numberText}>+86</Text>
          <Image source={icon_triangle} style={styles.icon_triangle} />
          <TextInput
            style={styles.phoneInput}
            placeholder="请输入手机号码"
            placeholderTextColor="#bbb"
            keyboardType="number-pad"
            maxLength={13}
            autoFocus={false}
            value={phone}
            onChangeText={(text: string) => {
              setPhone(formatPhone(text));
            }}
          />
        </View>
        <View style={styles.passwordInputBox}>
          <TextInput
            placeholder="输入密码"
            placeholderTextColor="#dedede"
            secureTextEntry={displayPassword}
            style={styles.passwordInput}
            value={pwd}
            onChangeText={(text: string) => {
              setPwd(text);
            }}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setDisplayPassword(!displayPassword);
            }}>
            <Image
              source={displayPassword ? icon_eye_close : icon_eye_open}
              style={styles.icon_eye}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.exchangeBox}>
          <TouchableOpacity style={styles.codeLeft}>
            <Image source={icon_exchange} style={styles.icon_exchange} />
            <Text style={styles.codeLoginText}>验证码登录</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgetPasswordText}>忘记密码?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={canLogin ? styles.loginButton : styles.loginButtonDisable}
          activeOpacity={canLogin ? 0.7 : 1}
          onPress={onLoginPress}>
          <Text style={styles.loginText}>登录</Text>
        </TouchableOpacity>
        <View style={styles.protocolLayout}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!check);
            }}>
            <Image
              style={styles.radioButton}
              source={check ? icon_selected : icon_unselected}
            />
          </TouchableOpacity>
          <Text style={styles.labelText}>我已阅读并同意</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.baidu.com');
            }}>
            <Text style={styles.protocolText}>《用户协议》和《隐私政策》</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity>
            <Image style={styles.icon_wx_small} source={icon_wx} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.icon_qq} source={icon_qq} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      {loginType === 'quick' ? renderQuickLogin() : renderInputLogin()}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
