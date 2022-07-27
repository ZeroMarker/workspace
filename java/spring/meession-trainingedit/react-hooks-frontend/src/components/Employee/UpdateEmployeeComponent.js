import React,{ useState,useEffect } from 'react'

import EmployeesService from '../../services/EmployeesService'

const UpdateEmployeeComponent = ({id,setShowUpdateEmployee,getAllEmployees}) => {

    const [employeeDept, setEmployeeDept] = useState("")
    const [employeeName, setEmployeeName] = useState("")
    const [employeeOffice, setEmployeeOffice] = useState("")
    const [employeePhone, setEmployeePhone] = useState("")
    const [employeeSex, setEmployeeSex] = useState("")



    const UpdateEmployee = (e)=>{
        e.preventDefault();

        const employee = {employeeDept,employeeName,employeeOffice,employeePhone,employeeSex};

        // console.log(employee)

      
            EmployeesService.updateEmployee(id,employee).then(response => {

                setShowUpdateEmployee(false);

                getAllEmployees();

            }).catch(error=>{

                console.log(error);

            })

        

        
    }

    useEffect(() => {
        
        EmployeesService.getEmployeeById(id).then(response=>{
            setEmployeeDept(response.data.employeeDept);
            setEmployeeName(response.data.employeeName);
            setEmployeeOffice(response.data.employeeOffice);
            setEmployeePhone(response.data.employeePhone);
            setEmployeeSex(response.data.employeeSex);
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
                        <h2 className="text-center">更新员工信息</h2>
                       <div className="card-body">
                           <form>
                           {/* <div className="form-group mb-2">
                                   <label className="form-label">所属部门 :</label>
                                   <input 
                                    type="email" 
                                    placeholder="请输入所属部门"
                                    name="employeeDept"
                                    className="form-control"
                                    value = {employeeDept}
                                    onChange={e=>setEmployeeDept(e.target.value)} />
                               </div> */}
                               <div className="form-group mb-2">
                                   <label className="form-label">所属部门 :</label>
                                     <div style={{width:"50%"}}>
                                        <select class="form-select mb-2" id="sel1"  name="employeeDept" value = {employeeDept}  onChange={e=>setEmployeeDept(e.target.value)}>
                                            <option>请选择部门</option>
                                            <option>总裁办</option>
                                            <option>人事部</option>
                                            <option>市场部</option>
                                            <option>财务部</option>
                                            <option>销售部</option>
                                            <option>技术部</option>
                                        </select>  
                                    </div>
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">姓名 :</label>
                                   <input 
                                    type="email" 
                                    placeholder="请输入姓名"
                                    name="employeeName"
                                    className="form-control"
                                    value = {employeeName}
                                    onChange={e=>setEmployeeName(e.target.value)} />
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">职务 :</label>
                                   <input 
                                    type="email" 
                                    placeholder="请输入职务"
                                    name="employeeOffice"
                                    className="form-control"
                                    value = {employeeOffice}
                                    onChange={e=>setEmployeeOffice(e.target.value)} />
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">联系方式 :</label>
                                   <input 
                                    type="email" 
                                    placeholder="请输入联系方式"
                                    name="employeePhone"
                                    className="form-control"
                                    value = {employeePhone}
                                    onChange={e=>setEmployeePhone(e.target.value)} />
                               </div>
                               {/* <div className="form-group mb-2">
                                   <label className="form-label">性别 :</label>
                                   <input 
                                    type="email" 
                                    placeholder="请输入性别"
                                    name="employeeSex"
                                    className="form-control"
                                    value = {employeeSex}
                                    onChange={e=>setEmployeeSex(e.target.value)} />
                               </div> */}
                               <div className="form-group mb-2">
                                    <div >
                                        <label className="form-label" style={{float:"left"}} >性别 :</label>
                                        <div className="form-check" style={{float:"left"}}>
                                           
                                            <label className="form-check-label" for="radio1"><input type="radio" className="form-check-input" id="radio1" name="employeeSex" value= "男" onChange={e=>setEmployeeSex(e.target.value)}/>男</label>
                                        </div>
                                        <div className="form-check" style={{float:"left"}}>
                                            
                                            <label className="form-check-label" for="radio2"><input type="radio" className="form-check-input" id="radio2" name="employeeSex" value= "女" onChange={e=>setEmployeeSex(e.target.value)}/>女</label>  
                                    </div>
                                    </div>
                                    
                               </div>
                               <br/>
                               <br/>

                                <button className="btn btn-success" onClick={(e)=>UpdateEmployee(e)}>提交</button>
                                <button style={{marginLeft:'20px'}} className="btn btn-danger" onClick={()=>setShowUpdateEmployee(false)}>取消</button>
                           </form>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default UpdateEmployeeComponent
