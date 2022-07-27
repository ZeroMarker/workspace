import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL = "http://localhost:8080/upload";

class UploadService{



    Upload(file){
        return axios.post(EMPLOYEE_BASE_REST_API_URL, file)
    }


}

export default new UploadService();