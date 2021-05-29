import ProfileActions from "../actions/ProfileActions";

const initialStateProfile = () => {
    return {
        profile: {}
    }
}

export function ProfileReducer(state = initialStateProfile, action) {

    if (typeof(state) === "function"){
        state=state()
    }

    switch (action.type) {
        case ProfileActions.MODIFY_VALUE:
            const prof={
                nickname: action.payload.nickname,
                email: action.payload.email,
                work: action.payload.work,
                address: action.payload.address,
                city: action.payload.city,
                province: action.payload.province,
                cp: action.payload.cp,
                password: action.payload.password,
            };
            return Object.assign({}, {...prof});
        case ProfileActions.RESET_STATE:
            return Object.assign({}, initialStateProfile());
        default:
            return state;
    }
}
