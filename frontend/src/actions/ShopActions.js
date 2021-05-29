export default class ShopActions {

    static MODIFY_VALUE = 'ShopActions_MODIFY_VALUE';
    static RESET_STATE = 'RESET_STATE';
    static MODIFY_MODAL = 'MODIFY_MODAL_SHOP';

    static resetState() {
        return {type: ShopActions.RESET_STATE, payload: {}};
    }

    static modifyModal(id, value) {
        return {
            type: ShopActions.MODIFY_MODAL,
            payload: {
                id: id,
                value: value
            }
        };
    }

    static modifyValue(id, value) {
        return {
            type: ShopActions.MODIFY_VALUE,
            payload: {
                id,
                value
            }
        };
    }
}
