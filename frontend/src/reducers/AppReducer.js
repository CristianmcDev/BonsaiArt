import AppActions from "../actions/AppActions";

const initialStateApp = {
    userLogged: {
        logged: false
    },
    notification: 10,
};

export function AppReducer(state = initialStateApp, action) {
    switch (action.type) {
        case AppActions.USER_LOGGED:
            return Object.assign({}, state, {userLogged: action.payload.userLogged});
        case AppActions.APP_RESET_STATE:
            return Object.assign({}, initialStateApp);
        default:
            return state;
    }
}
