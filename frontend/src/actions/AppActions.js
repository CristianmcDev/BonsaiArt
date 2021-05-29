export default class AppActions {

    static USER_LOGGED = 'USER_LOGGED';
    static MODIFY_VALUE = 'MODIFY_VALUE_APP';
    static RESET_STATE = 'APP_RESET_STATE';

    static resetState() {
        return {type: AppActions.APP_RESET_STATE, payload: {}};
    }

    static modifyValue(id, value) {
        return {
            type: AppActions.MODIFY_VALUE,
            payload: {
                id,
                value
            }
        };
    }

    static setUserLogged(user) {
        return {
            type: AppActions.USER_LOGGED,
            payload: {
                userLogged: user
            }
        };
    }
}
