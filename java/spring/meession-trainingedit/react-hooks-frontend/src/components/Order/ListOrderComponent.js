import React,{useState,useEffect} from 'react'
import OrdersService from '../../services/OrdersService'
import AddOrderComponent from './AddOrderComponent'
import UpdateOrderComponent from './UpdateOrderComponent'
import HeaderComponent from '../../layouts/HeaderComponent'
import FooterComponent from '../../layouts/FooterComponent'
import { Pagination} from 'antd';
import 'antd/dist/antd.css';


const onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  };

const ListOrderComponent = () => {

    // define orders state and get a methed to update orders
    const [orders, setOrders] = useState([])

    // define addOrder's Pop-ups state
    const [showAddOrder,setShowAddOrder] = useState(false);

    // define updateOrder's Pop-ups state
    const [showUpdateOrder,setShowUpdateOrder] = useState(false);

    // define the updateId
    let [activeId,setActiveId] = useState(null);


    // get orders data from backend
    const getAllOrders = () =>{
        OrdersService.getAllOrders().then((response) => {
            // console.log(response.data)
            setOrders(response.data);
        }).catch(error=>{
            console.log(error)
        })
    }

    // Call the method when the component didmount
    useEffect(() => {
       
        getAllOrders();
        

    }, [])

    const updateOrder = (orderId) => {
        setActiveId(orderId);
        setShowUpdateOrder(true);
    }

    const deleteOrder = (orderId) => {
        // console.log(orderId);
        OrdersService.deleteOrder(orderId).then(response=>{

            getAllOrders();

        }).catch(error=>{
            console.log(error)
        })
    }


    return (
        <div>
            <HeaderComponent />
        
        <div className="col-8 offset-2">
            <h2 className="text-center">订单列表</h2>
            <button style={{float:"left"}} className="btn btn-primary mb-2" onClick={()=>setShowAddOrder(true)}>添加订单</button>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" >批量导入</button></div>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" >批量导出</button></div>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" >批量删除</button></div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>订单名称</th>
                        <th>订单信息</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order=>
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.orderName}</td>
                                <td>{order.orderInfo}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updateOrder(order.id)}>更新</button>
                                    <button className="btn btn-danger" onClick={() => deleteOrder(order.id)} 
                                        style={{marginLeft:"10px"}}
                                    >删除</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className='pagination justify-content-center'>
            <Pagination showQuickJumper defaultCurrent={2} total={50} onChange={onChange} />
        </div> 
            {
                showAddOrder? <AddOrderComponent setShowAddOrder={setShowAddOrder} getAllOrders={getAllOrders} /> : null
            }
            {
                showUpdateOrder? <UpdateOrderComponent id={activeId} setShowUpdateOrder={setShowUpdateOrder} getAllOrders={getAllOrders} /> : null
            }
            
        </div>
        <FooterComponent />
        </div>
    )
}

export default ListOrderComponent;
