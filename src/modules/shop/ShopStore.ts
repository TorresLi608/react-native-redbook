import {observable, action} from 'mobx';
import {request} from '../../utils/request';
export default class ShopStore {
  page: number = 1;
  size: number = 10;

  @observable goodsList: GoodsSimple[] = [];
  @observable refreshing: boolean = false;
  @observable top10CategoryList: GoodsCategory[] = [];
  @action
  resetPage = () => {
    this.page = 1;
  };

  @action
  requestGoodsList = async () => {
    if (this.refreshing) {
      return;
    }
    this.refreshing = true;
    try {
      const params = {
        page: this.page,
        size: this.size,
      };
      const {data} = await request('goodsList', params);
      if (data?.length) {
        if (this.page === 1) {
          this.goodsList = data;
        } else {
          this.goodsList = [...this.goodsList, ...data];
        }
        this.page = this.page + 1;
      } else {
        if (this.page === 1) {
          this.goodsList = [];
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
  top10Category = async () => {
    try {
      const {data} = await request('top10Category', {});
      this.top10CategoryList = data || [];
    } catch (error) {}
  };
}
