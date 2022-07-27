import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL = "http://localhost:8080/employees";

class EmployeeService{



    getAllEmployees(){
        return axios.get(EMPLOYEE_BASE_REST_API_URL)
    }

    createEmployee(employee){
        return axios.post(EMPLOYEE_BASE_REST_API_URL,employee)
    }

    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_BASE_REST_API_URL + "/" + employeeId)
    }

    updateEmployee(employeeId,employee){
        return axios.put(EMPLOYEE_BASE_REST_API_URL + "/" + employeeId,employee)

    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_BASE_REST_API_URL + "/" + employeeId)
    }

    queryEmployeeByDept(employeeDept){
        if(employeeDept === ""){
            return this.getAllEmployees()
        }
        else{
            return axios.get(EMPLOYEE_BASE_REST_API_URL + "/s/" + employeeDept)
        }       
    }
    list(pageNum, size){
        return axios.get(EMPLOYEE_BASE_REST_API_URL + "/list?pageNum=" + pageNum + "&size=" + size)
    }

}

export default new EmployeeService();