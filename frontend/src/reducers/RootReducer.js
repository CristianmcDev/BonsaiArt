import {combineReducers} from 'redux';
import {AppReducer} from './AppReducer';
import {NotificationReducer} from './NotificationReducer';
import {OrderListReducer} from './OrderListReducer';
import {OrderReducer} from './OrderReducer';
import {ShopReducer} from './ShopReducer';

export const RootReducer = combineReducers({
  app: AppReducer,
  notification: NotificationReducer,
  orderList: OrderListReducer,
  order: OrderReducer,
  shop: ShopReducer,
});
