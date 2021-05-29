export default class NotificationActions {

    static MODIFY_VALUE = 'NotificationActions_MODIFY_VALUE';
    static RESET_STATE = 'NotificationActions_RESET_STATE';

    static modifyValue(id, value) {
        return {
            type: NotificationActions.MODIFY_VALUE,
            payload: {
                id,
                value
            }
        };
    }

    static resetState(){
        return {
            type: NotificationActions.RESET_STATE,
            payload: {}
        };
    }
}
