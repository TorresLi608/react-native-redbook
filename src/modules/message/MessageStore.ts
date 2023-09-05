import {observable, action} from 'mobx';
import {request} from '../../utils/request';
export default class MessageStore {
  page: number = 1;
  size: number = 10;

  @observable messageList: MessageListItem[] = [];
  @observable refreshing: boolean = false;
  @observable unRead: UnRead = {} as UnRead;
  @action
  resetPage = () => {
    this.page = 1;
  };

  @action
  requestMessageList = async () => {
    if (this.refreshing) {
      return;
    }
    this.refreshing = true;
    try {
      const params = {
        page: this.page,
        size: this.size,
      };
      const {data} = await request('messageList', params);
      if (data?.length) {
        if (this.page === 1) {
          this.messageList = data;
        } else {
          this.messageList = [...this.messageList, ...data];
        }
        this.page = this.page + 1;
      } else {
        if (this.page === 1) {
          this.messageList = [];
        } else {
          // 加载完成没有更多数据
        }
      }
      this.refreshing = false;
    } catch (error) {
      this.refreshing = false;
    }
  };

  @action
  requestUnRead = async () => {
    const {data} = await request('unread', {});
    this.unRead = data;
  };
}
