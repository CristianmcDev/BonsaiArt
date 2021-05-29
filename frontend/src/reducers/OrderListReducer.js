import OrderListActions from "../actions/OrderListActions";

const initialStateNotification = () => {
    return {
      index: 0
    }
}

export function OrderListReducer(state = initialStateNotification, action) {

    if (typeof(state) === "function") {
        state = state()
    }
    switch (action.type) {
        case OrderListActions.MODIFY_VALUE:
            return Object.assign({}, state, {
                [action.payload.id]: action.payload.value
            });

        case OrderListActions.MODIFY_MODAL:
            return Object.assign({}, state, {
                [action.payload.id]: action.payload.value
            });

        case OrderListActions.MODIFY_ORDER_STATE:
            let new_order_list;
            try {
                new_order_list = state.order_list.slice();
                new_order_list[action.payload.id].order_state = action.payload.value;
            } catch (e) {
                new_order_list = []
            }
            return Object.assign({}, state, {order_list:new_order_list})

        case OrderListActions.RESET_STATE:
            return Object.assign({}, initialStateNotification());
        default:
            return state;
    }
}
