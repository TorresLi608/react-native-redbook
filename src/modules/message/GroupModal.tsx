import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

import icon_group from '../../assets/icon_group.png';
import icon_create_group from '../../assets/icon_create_group.png';

type Props = {};

export interface ModelRef {
  show: (pageY: number) => void;
  hide: () => void;
}

export default forwardRef((props: Props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [y, setY] = useState<number>(20);
  const show = (pageY: number) => {
    setY(pageY);
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    return {
      show,
      hide,
    };
  });

  return (
    <Modal
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      animationType="fade"
      onRequestClose={hide}>
      <TouchableOpacity style={styles.root} onPress={hide}>
        <View style={[styles.wrap, {top: y + 48}]}>
          <TouchableOpacity style={styles.optionLayout}>
            <Image style={styles.icon} source={icon_group} />
            <Text style={styles.text}>群聊广场</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity style={styles.optionLayout}>
            <Image style={styles.icon} source={icon_create_group} />
            <Text style={styles.text}>创建群聊</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
});

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000040',
  },
  wrap: {
    position: 'absolute',
    right: 20,
    width: 170,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingLeft: 20,
  },
  optionLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    color: '#000',
  },
  line: {
    width: 130,
    height: 1,
    backgroundColor: '#dedede',
  },
});
