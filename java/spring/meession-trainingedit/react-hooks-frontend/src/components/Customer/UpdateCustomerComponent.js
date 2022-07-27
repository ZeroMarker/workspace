import React,{ useState,useEffect } from 'react'

import CustomersService from '../../services/CustomersService'

const UpdateCustomerComponent = ({id,setShowUpdateCustomer,getAllCustomers}) => {

    const [customerName, setCustomerName] = useState("")
    const [customerSex, setCustomerSex] = useState("")
    const [customerPhone, setCustomerPhone] = useState("")
    const [customerAddress, setCustomerAddress] = useState("")
    



    const UpdateCustomer = (e)=>{
        e.preventDefault();

        const customer = {customerName,customerSex,customerPhone,customerAddress};

        // console.log(customer)

      
        CustomersService.updateCustomer(id,customer).then(response => {

                setShowUpdateCustomer(false);

                getAllCustomers();

            }).catch(error=>{

                console.log(error);

            })

        

        
    }

    useEffect(() => {
        
        CustomersService.getCustomerById(id).then(response=>{
            setCustomerName(response.data.customerName);
            setCustomerSex(response.data.customerSex);
            setCustomerPhone(response.data.customerPhone);
            setCustomerAddress(response.data.customerAddress)
            
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
                        <h2 className="text-center">更新用户信息</h2>
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
                                    placeholder="请输入联系方式"
                                    name="customerPhone"
                                    className="form-control"
                                    value = {customerPhone}
                                    onChange={e=>setCustomerPhone(e.target.value)} />
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">所在地 :</label>
                                   <input 
                                    type="text" 
                                    placeholder="请输入地址"
                                    name="customerAddress"
                                    className="form-control"
                                    value = {customerAddress}
                                    onChange={e=>setCustomerAddress(e.target.value)} />
                               </div>
                              

                                <button className="btn btn-success" onClick={(e)=>UpdateCustomer(e)}>提交</button>
                                <button style={{marginLeft:'20px'}} className="btn btn-danger" onClick={()=>setShowUpdateCustomer(false)}>取消</button>
                           </form>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default UpdateCustomerComponent
