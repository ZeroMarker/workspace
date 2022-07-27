import React,{ useState,useEffect } from 'react'

import AuthoritysService from '../../services/AuthoritysService'

const UpdateAuthorityComponent = ({id,setShowUpdateAuthority,getAllAuthoritys}) => {

    const [authorityName, setAuthorityName] = useState("")
    const [authorityInfo, setAuthorityInfo] = useState("")
    const [authorityDept, setAuthorityDept] = useState("")
    const [authorityRole, setAuthorityRole] = useState("")
    const [authorityState, setAuthorityState] = useState("")
    



    const UpdateAuthority = (e)=>{
        e.preventDefault();

        const authority = {authorityName,authorityInfo,authorityState,authorityRole,authorityDept};

        // console.log(authority)

      
        AuthoritysService.updateAuthority(id,authority).then(response => {

                setShowUpdateAuthority(false);

                getAllAuthoritys();

            }).catch(error=>{

                console.log(error);

            })

        

        
    }

    useEffect(() => {
        
        AuthoritysService.getAuthorityById(id).then(response=>{
            setAuthorityName(response.data.authorityName);
            setAuthorityInfo(response.data.authorityInfo);
            
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
                        <h2 className="text-center">更新权限信息</h2>
                       <div className="card-body">
                           <form>
                               <div className="form-group mb-2">
                                   <label className="form-label">姓名 :</label>
                                   <input 
                                    type="text" 
                                    placeholder="请输入姓名"
                                    name="authorityName"
                                    className="form-control"
                                    value = {authorityName}
                                    onChange={e=>setAuthorityName(e.target.value)} />
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">所属部门 :</label>
                                     <div style={{width:"50%"}}>
                                        <select className="form-select mb-2" id="sel1"  name="employeeDept" value = {authorityDept}  onChange={e=>setAuthorityDept(e.target.value)}>
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
                                   <label className="form-label">角色 :</label>
                                     <div style={{width:"50%"}}>
                                        <select class="form-select mb-2" id="sel1"  name="authorityRole" value = {authorityRole}  onChange={e=>setAuthorityRole(e.target.value)}>
                                            <option>请选择角色</option>
                                            <option>系统管理员</option>
                                            <option>主管</option>
                                            <option>普通员工</option>
                                        </select>  
                                    </div>
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">权限描述 :</label>
                                        <form action="/action_page.php" >
                                            <div class="form-check" value = {authorityInfo} onChange={e=>setAuthorityInfo(e.target.value)}>
                                                <input type="checkbox" class="form-check-input" id="check1" name="option1" value="用户管理"></input>
                                                <label class="form-check-label" for="check1">用户管理</label>
                                            </div>
                                            <div class="form-check" value = {authorityInfo} onChange={e=>setAuthorityInfo(e.target.value)}>
                                                <input type="checkbox" class="form-check-input" id="check2" name="option2" value="产品管理"></input>
                                                <label class="form-check-label" for="check2">产品管理</label>
                                            </div>
                                            <div class="form-check" value = {authorityInfo} onChange={e=>setAuthorityInfo(e.target.value)}>
                                                <input type="checkbox" class="form-check-input" id="check3" name="option3" value="订单管理"></input>
                                                <label class="form-check-label" for="check2">订单管理</label>
                                            </div>
                                            <div class="form-check" value = {authorityInfo} onChange={e=>setAuthorityInfo(e.target.value)}>
                                                <input type="checkbox" class="form-check-input" id="check4" name="option4" value="部门管理"></input>
                                                <label class="form-check-label" for="check2">部门管理</label>
                                            </div>
                                            <div class="form-check" value = {authorityInfo} onChange={e=>setAuthorityInfo(e.target.value)}>
                                                <input type="checkbox" class="form-check-input" id="check5" name="option5" value="权限管理"></input>
                                                <label class="form-check-label" for="check2">权限管理</label>
                                            </div>
                                        </form>
                               </div>                               
                               <div className="FlavorForm form-group mb-2">
                                    <div >
                                        <label className="form-label" style={{float:"left"}} >状态 :</label>
                                        <form action="" style={{float:"left"}} value = {authorityState}  onChange={e=>setAuthorityState(e.target.value)}>
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" id="mySwitch" name="darkmode" value="启用"></input>
                                                <label class="form-check-label" for="mySwitch">启用</label>
                                            </div>
                                        </form>  
                                    </div>
                                    <br/>
                               </div>
                              

                                <button className="btn btn-success" onClick={(e)=>UpdateAuthority(e)}>提交</button>
                                <button style={{marginLeft:'20px'}} className="btn btn-danger" onClick={()=>setShowUpdateAuthority(false)}>取消</button>
                           </form>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default UpdateAuthorityComponent
