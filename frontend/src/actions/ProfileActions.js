export default class ProfileActions {

    static MODIFY_VALUE = 'ProfileActions_MODIFY_VALUE';
    static RESET_STATE = 'ProfileActions_RESET_STATE';

    static modifyValue(obj) {
        return {
            type: ProfileActions.MODIFY_VALUE,
            payload: obj
        };
    }

    static resetState(){
        return {
            type: ProfileActions.RESET_STATE,
            payload: {}
        };
    }
}
