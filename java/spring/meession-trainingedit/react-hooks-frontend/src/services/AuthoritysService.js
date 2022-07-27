import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL = "http://localhost:8080/authoritys";

class AuthoritysService{



    getAllAuthoritys(){
        return axios.get(EMPLOYEE_BASE_REST_API_URL)
    }

    createAuthority(authority){
        return axios.post(EMPLOYEE_BASE_REST_API_URL,authority)
    }

    getAuthorityById(authorityId){
        return axios.get(EMPLOYEE_BASE_REST_API_URL + "/" + authorityId)
    }

    updateAuthority(authorityId,authority){
        return axios.put(EMPLOYEE_BASE_REST_API_URL + "/" + authorityId,authority)

    }

    deleteAuthority(authorityId){
        return axios.delete(EMPLOYEE_BASE_REST_API_URL + "/" + authorityId);
    }

}

export default new AuthoritysService();