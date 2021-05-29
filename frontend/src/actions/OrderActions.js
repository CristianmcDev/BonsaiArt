export default class OrderActions {

    static MODIFY_VALUE = 'OrderActions_MODIFY_VALUE';
    static RESET_STATE = 'OrderActions_RESET_STATE';

    static modifyValue(id, value) {
        return {
            type: OrderActions.MODIFY_VALUE,
            payload: {
                id,
                value
            }
        };
    }

    static resetState() {
        return {type: OrderActions.RESET_STATE, payload: {}};
    }
}
