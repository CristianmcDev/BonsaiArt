import ShopActions from "../actions/ShopActions";

const initialStateNotification = () => {
    return {
      cart_number: 0,
      sidebar: true,
      category: "principal",
      searchbox: ""
    }
}

export function ShopReducer(state = initialStateNotification, action) {

    if (typeof(state) === "function") {
        state = state()
    }
    switch (action.type) {
        case ShopActions.MODIFY_VALUE:
            return Object.assign({}, state, {
                [action.payload.id]: action.payload.value
            });
        case ShopActions.MODIFY_MODAL:
            return Object.assign({}, state, {
                [action.payload.id]: action.payload.value
            });
        case ShopActions.RESET_STATE:
            return Object.assign({}, initialStateNotification());
        default:
            return state;
    }
}
