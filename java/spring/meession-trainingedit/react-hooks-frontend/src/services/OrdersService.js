import axios from 'axios'

const EMPLOYEE_BASE_REST_API_URL = "http://localhost:8080/orders";

class OrdersService{



    getAllOrders(){
        return axios.get(EMPLOYEE_BASE_REST_API_URL)
    }

    createOrder(order){
        return axios.post(EMPLOYEE_BASE_REST_API_URL,order)
    }

    getOrderById(orderId){
        return axios.get(EMPLOYEE_BASE_REST_API_URL + "/" + orderId)
    }

    updateOrder(orderId,order){
        return axios.put(EMPLOYEE_BASE_REST_API_URL + "/" + orderId,order)

    }

    deleteOrder(orderId){
        return axios.delete(EMPLOYEE_BASE_REST_API_URL + "/" + orderId);
    }

}

export default new OrdersService();