export default class OrderListActions {

    static MODIFY_VALUE = 'OrderListActions_MODIFY_VALUE';
    static RESET_STATE = 'OrderListActions_RESET_STATE';
    static MODIFY_MODAL = 'MODIFY_MODAL_ORDER';
    static MODIFY_ORDER_STATE = 'OrderListActions_MODIFY_ORDER_STATE';
    
    static modifyValue(id, value) {
        return {
            type: OrderListActions.MODIFY_VALUE,
            payload: {
                id,
                value
            }
        };
    }
    static modifyOrderState(id, value) {
        return {
            type: OrderListActions.MODIFY_ORDER_STATE,
            payload: {
                id: id,
                value: value
            }
        };

    }

    static modifyModal(id, value) {
        return {
            type: OrderListActions.MODIFY_MODAL,
            payload: {
                id: id,
                value: value
            }
        };
    }

    static resetState() {
        return {type: OrderListActions.RESET_STATE, payload: {}};
    }
}
