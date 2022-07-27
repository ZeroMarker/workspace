import React,{ useState } from 'react'
import CustomersService from '../../services/CustomersService'

const AddCustomerComponent = ({setShowAddCustomer,getAllCustomers}) => {

    const [customerName, setCustomerName] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [customerAddress, setCustomerAddress] = useState("")
    const [customerSex, setCustomerSex] = useState("")
    
 


    const saveCustomer = (e)=>{
        e.preventDefault();

        const customer = {customerName,customerSex,customerPhone,customerAddress};

        // console.log(customer)

        
        CustomersService.createCustomer(customer).then(response=>{

            // console.log(response.data)
            setShowAddCustomer(false);
            getAllCustomers();
                
    
        }).catch(error=>{
            console.log(error)
        })
        

        
    }

  
    return (
        <div style={{position:"absolute",width:"100%",top:"250px",left:"50%",transform:"translateX(-50%) translateY(-50%)"}}>
            
           <div className="container">
               <div className="row">
                   <div className="card col-md-6 offset-md-3 offset-md-3" style={{boxShadow:"1px 2px 2px grey,-1px -2px 2px grey"}}>
                      <div style={{textAlign:"center",fontSize:"20px",fontWeight:"bold"}}> 添加用户</div>
                       <div className="card-body">
                           <form>
                               <div className="form-group mb-2">
                                   <label className="form-label">用户名 :</label>
                                   <input 
                                    type="text" 
                                    placeholder="请输入用户名"
                                    name="customerName"
                                    className="form-control"
                                    value = {customerName}
                                    onChange={e=>setCustomerName(e.target.value)} />
                               </div>
                               <div className="form-group mb-2">
                                   {/* <label className="form-label">性别 :</label>
                                   <input 
                                    type="text" 
                                    placeholder="请输入性别 "
                                    name="customerSex"
                                    className="form-control"
                                    value = {customerSex}
                                    onChange={e=>setCustomerSex(e.target.value)} /> */}
                                    <div >
                                        <label className="form-label" style={{float:"left"}} >性别 :</label>
                                        <div className="form-check" style={{float:"left"}}>                                           
                                            <label className="form-check-label" for="radio1">
                                                <input type="radio" className="form-check-input" id="radio1" name="customerSex" value = "男"  onChange={e=>setCustomerSex(e.target.value)} />
                                            男</label>
                                        </div>
                                        <div className="form-check" style={{float:"left"}}>                                           
                                            <label className="form-check-label" for="radio2">
                                                <input type="radio" className="form-check-input" id="radio2" name="customerSex" value = "女" onChange={e=>setCustomerSex(e.target.value)} />
                                            女</label>  
                                        </div>
                                    </div>
                                    <br/>
                               </div>                               
                               <div className="form-group mb-2">
                                   <label className="form-label">联系方式 :</label>
                                   <input 
                                    type="text" 
                                    placeholder="请输入联系方式 "
                                    name="customerPhone"
                                    className="form-control"
                                    value = {customerPhone}
                                    onChange={e=>setCustomerPhone(e.target.value)} />
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">所在地 :</label>
                                   <input 
                                    type="text" 
                                    placeholder="请输入地址 "
                                    name="customerAddress"
                                    className="form-control"
                                    value = {customerAddress}
                                    onChange={e=>setCustomerAddress(e.target.value)} />
                               </div>
                              
                                <button className="btn btn-success" onClick={(e)=>saveCustomer(e)}>提交</button>
                                <button style={{marginLeft:"20px"}} className="btn btn-danger" onClick={()=>setShowAddCustomer(false)}>取消</button>
                           </form>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default AddCustomerComponent
