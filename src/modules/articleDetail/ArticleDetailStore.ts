import {observable, action} from 'mobx';
import {request} from '../../utils/request';
import Loading from '../../components/widget/Loading';
export default class ArticleDetailStore {
  @observable details: Article | null = null;

  @action
  requestArticleDetail = async (id: number) => {
    Loading.show();
    const params = {
      id: id,
    };
    try {
      const {data} = await request('articleDetail', params);
      if (data) {
        this.details = data;
        console.log(data, 'data');
      }
    } catch (error) {
    } finally {
      Loading.hide();
    }
  };
}
