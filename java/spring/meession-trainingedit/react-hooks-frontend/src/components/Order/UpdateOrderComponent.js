import React,{ useState,useEffect } from 'react'

import OrdersService from '../../services/OrdersService'

const UpdateOrderComponent = ({id,setShowUpdateOrder,getAllOrders}) => {

    const [orderName, setOrderName] = useState("")
    const [orderInfo, setOrderInfo] = useState("")
    



    const UpdateOrder = (e)=>{
        e.preventDefault();

        const order = {orderName,orderInfo};

        // console.log(order)

      
        OrdersService.updateOrder(id,order).then(response => {

                setShowUpdateOrder(false);

                getAllOrders();

            }).catch(error=>{

                console.log(error);

            })

        

        
    }

    useEffect(() => {
        
        OrdersService.getOrderById(id).then(response=>{
            setOrderName(response.data.orderName);
            setOrderInfo(response.data.orderInfo);
            
        }).catch(error=>{
            console.log(error);
        })

    }, [])

 

    return (
        <div style={{position:"absolute",width:"100%",top:"250px",left:"50%",transform:"translateX(-50%) translateY(-50%)"}}>
            <br/>
           <div className="container">
               <div className="row">
                   <div className="card col-md-6 offset-md-3 offset-md-3" style={{boxShadow:"1px 2px 2px grey,-1px -2px 2px grey"}}>
                        <h2 className="text-center">更新订单信息</h2>
                       <div className="card-body">
                           <form>
                               <div className="form-group mb-2">
                                   <label className="form-label">订单名称 :</label>
                                   <input 
                                    type="text" 
                                    placeholder="请输入订单名称"
                                    name="orderName"
                                    className="form-control"
                                    value = {orderName}
                                    onChange={e=>setOrderName(e.target.value)} />
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">订单信息 :</label>
                                   <input 
                                    type="text" 
                                    placeholder="请输入订单信息"
                                    name="orderInfo"
                                    className="form-control"
                                    value = {orderInfo}
                                    onChange={e=>setOrderInfo(e.target.value)} />
                               </div>
                              

                                <button className="btn btn-success" onClick={(e)=>UpdateOrder(e)}>提交</button>
                                <button style={{marginLeft:'20px'}} className="btn btn-danger" onClick={()=>setShowUpdateOrder(false)}>取消</button>
                           </form>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default UpdateOrderComponent
