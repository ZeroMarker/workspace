import React,{useState,useEffect} from 'react'
import AuthoritysService from '../../services/AuthoritysService'
import AddAuthorityComponent from './AddAuthorityComponent'
import UpdateAuthorityComponent from './UpdateAuthorityComponent'
import HeaderComponent from '../../layouts/HeaderComponent'
import FooterComponent from '../../layouts/FooterComponent'
import { Pagination} from 'antd';
import 'antd/dist/antd.css';


const onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  };
const ListAuthorityComponent = () => {

    // define authoritys state and get a methed to update authoritys
    const [authoritys, setAuthoritys] = useState([])

    // define addAuthority's Pop-ups state
    const [showAddAuthority,setShowAddAuthority] = useState(false);

    // define updateAuthority's Pop-ups state
    const [showUpdateAuthority,setShowUpdateAuthority] = useState(false);

    // define the updateId
    let [activeId,setActiveId] = useState(null);


    // get authoritys data from backend
    const getAllAuthoritys = () =>{
        AuthoritysService.getAllAuthoritys().then((response) => {
            // console.log(response.data)
            setAuthoritys(response.data);
        }).catch(error=>{
            console.log(error)
        })
    }

    // Call the method when the component didmount
    useEffect(() => {
       
        getAllAuthoritys();
        

    }, [])

    const updateAuthority = (authorityId) => {
        setActiveId(authorityId);
        setShowUpdateAuthority(true);
    }

    const deleteAuthority = (authorityId) => {
        // console.log(authorityId);
        AuthoritysService.deleteAuthority(authorityId).then(response=>{

            getAllAuthoritys();

        }).catch(error=>{
            console.log(error)
        })
    }


    return (
        <div>
        <HeaderComponent />
        <div className="col-8 offset-2" style={{position:"relative"}}>
            <h2 className="text-center">权限列表</h2>
            <div style={{float:"left"}}><button className="btn btn-primary mb-2" onClick={()=>setShowAddAuthority(true)}>添加成员</button></div>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" onClick={()=>setShowAddAuthority(true)}>批量导入</button></div>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" onClick={()=>setShowAddAuthority(true)}>批量导出</button></div>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" onClick={()=>setShowAddAuthority(true)}>批量删除</button></div>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>姓名</th>
                        <th>所属部门</th>
                        <th>角色</th>
                        <th>权限描述</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        authoritys.map(authority=>
                            <tr key={authority.id}>
                                <td>{authority.id}</td>
                                <td>{authority.authorityName}</td>
                                <td>{authority.authorityDept}</td>
                                <td>{authority.authorityRole}</td>
                                <td>{authority.authorityInfo}</td>
                                <td>{authority.authorityState}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updateAuthority(authority.id)}>更新</button>
                                    <button className="btn btn-danger" onClick={() => deleteAuthority(authority.id)} 
                                        style={{marginLeft:"10px"}}>删除</button>
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
                showAddAuthority? <AddAuthorityComponent setShowAddAuthority={setShowAddAuthority} getAllAuthoritys={getAllAuthoritys} /> : null
            }
            {
                showUpdateAuthority? <UpdateAuthorityComponent id={activeId} setShowUpdateAuthority={setShowUpdateAuthority} getAllAuthoritys={getAllAuthoritys} /> : null
            }
        </div>
        <FooterComponent />
        </div>
    )
}

export default ListAuthorityComponent;
