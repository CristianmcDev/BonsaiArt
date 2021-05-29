import NotificationActions from "../actions/NotificationActions";

const initialStateNotification = () => {
    return {
        checkboxes: {}
    }
}

export function NotificationReducer(state = initialStateNotification, action) {

if (typeof(state) === "function"){
    state=state()
}

    switch (action.type) {
        case NotificationActions.MODIFY_VALUE:
            return Object.assign({}, state, {
                [action.payload.id]: action.payload.value
            });
        case NotificationActions.RESET_STATE:
            return Object.assign({}, initialStateNotification());
        default:
            return state;
    }
}
