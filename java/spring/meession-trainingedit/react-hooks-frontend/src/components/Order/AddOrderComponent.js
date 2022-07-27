import React,{ useState } from 'react'
import OrdersService from '../../services/OrdersService'

const AddOrderComponent = ({setShowAddOrder,getAllOrders}) => {

    const [orderName, setOrderName] = useState("")
    const [orderInfo, setOrderInfo] = useState("")
    
 


    const saveOrder = (e)=>{
        e.preventDefault();

        const order = {orderName,orderInfo};

        // console.log(order)

        
        OrdersService.createOrder(order).then(response=>{

            console.log(response.data)
            setShowAddOrder(false);
            getAllOrders();
                
    
        }).catch(error=>{
            console.log(error)
        })
        

        
    }

  
    return (
        <div style={{position:"absolute",width:"100%",top:"250px",left:"50%",transform:"translateX(-50%) translateY(-50%)"}}>
            
           <div className="container">
               <div className="row">
                   <div className="card col-md-6 offset-md-3 offset-md-3" style={{boxShadow:"1px 2px 2px grey,-1px -2px 2px grey"}}>
                      <div style={{textAlign:"center",fontSize:"20px",fontWeight:"bold"}}> 添加订单</div>
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
                                    name="orderName"
                                    className="form-control"
                                    value = {orderInfo}
                                    onChange={e=>setOrderInfo(e.target.value)} />
                               </div>
                              

                                <button className="btn btn-success" onClick={(e)=>saveOrder(e)}>提交</button>
                                <button style={{marginLeft:"20px"}} className="btn btn-danger" onClick={()=>setShowAddOrder(false)}>取消</button>
                           </form>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default AddOrderComponent
