import { USER_INFO } from "../../constants/constants";

const initialState = {
  userDetail:{}
}

const commonReducers = (state=initialState,action)=>{
switch (action.type) {
    case USER_INFO:
        return{
            ...state,
            userDetail:action.payload
        }

    default: return{...state};
}
}

export default commonReducers;

