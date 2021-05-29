import OrderActions from "../actions/OrderActions";

const initialStateNotification = () => {
    return {}
}

export function OrderReducer(state = initialStateNotification, action) {

    if (typeof(state) === "function") {
        state = state()
    }
    switch (action.type) {
        case OrderActions.MODIFY_VALUE:
            return Object.assign({}, state, {
                [action.payload.id]: action.payload.value
            });

        case OrderActions.RESET_STATE:
            return Object.assign({}, initialStateNotification());
        default:
            return state;
    }
}
