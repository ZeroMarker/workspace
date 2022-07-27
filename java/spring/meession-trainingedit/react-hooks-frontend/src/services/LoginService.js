import axios from 'axios'

const LOGIN_BASE_REST_API_URL = "http://localhost:8080/users"

class LoginService {
    login(userName, password) {
        return axios.get(LOGIN_BASE_REST_API_URL + "/" + "login?userName=" + userName + "&password=" + password)
    }
}

export default new LoginService();