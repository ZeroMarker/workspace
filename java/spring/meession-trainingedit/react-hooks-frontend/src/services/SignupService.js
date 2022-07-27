import axios from "axios";

const BASE_REST_API_URL = "http://localhost:8080/users";

class SignupService{
    login(userName, userPassword){
        return axios.get(BASE_REST_API_URL + "/login?userName=" + userName + "?userPassword=" + userPassword)
    }
}

export default SignupService