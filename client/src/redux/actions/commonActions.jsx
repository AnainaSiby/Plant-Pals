import { USER_INFO } from "../../constants/constants";
import AXIOS from "axios";

const userInfo = async (token,dispatch) => {
    console.log("token", token)
/*    const url = "http://localhost:9000/api/userinfo";
    return async () => {
        try {
            const response = await AXIOS.get(url, {
                headers: {
                    "x-access-token": token
                }
            });
            if (response) {
                dispatch({
                    type: USER_INFO,
                    payload: response?.data
                })
            }
        } catch (error) {
            console.error("Error fetching user information:", error);
        }
    }*/
};

export default {
  userInfo,
};
