import React,{useState,useEffect} from 'react'
import CustomersService from '../../services/CustomersService'
import AddCustomerComponent from './AddCustomerComponent'
import UpdateCustomerComponent from './UpdateCustomerComponent'
import HeaderComponent from '../../layouts/HeaderComponent'
import FooterComponent from '../../layouts/FooterComponent'
import { Pagination} from 'antd';
import 'antd/dist/antd.css';


const onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  };
const ListCustomerComponent = () => {

    // define customers state and get a methed to update customers
    const [customers, setCustomers] = useState([])

    const [showAddCustomer,setShowAddCustomer] = useState(false);
    const [showUpdateCustomer,setShowUpdateCustomer] = useState(false);
    let [activeId,setActiveId] = useState(null);


    // get customer data from backend
    const getAllCustomers = () =>{
        CustomersService.getAllCustomers().then((response) => {
            // console.log(response.data)
            setCustomers(response.data);
        }).catch(error=>{
            console.log(error)
        })
    }

    useEffect(() => {
       
        getAllCustomers();
        

    }, [])

    const updateCustomer = (customerId) => {
        setActiveId(customerId);
        setShowUpdateCustomer(true);
    }

    const deleteCustomer = (customerId) => {
        // console.log(customerId);
        CustomersService.deleteCustomer(customerId).then(response=>{

            getAllCustomers();

        }).catch(error=>{
            console.log(error)
        })
    }


    return (
        <div>
            <HeaderComponent />
            <div className="col-8 offset-2">
            <h2 className="text-center">用户列表</h2>
            <button style={{float:"left"}} className="btn btn-primary mb-2" onClick={()=>setShowAddCustomer(true)}>添加用户</button>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" >批量导入</button></div>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" >批量导出</button></div>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" >批量删除</button></div>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>用户名</th>
                        <th>性别</th>
                        <th>联系方式</th>
                        <th>所在地</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map(customer=>
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.customerName}</td>
                                <td>{customer.customerSex}</td>
                                <td>{customer.customerPhone}</td>
                                <td>{customer.customerAddress}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updateCustomer(customer.id)}>更新</button>
                                    <button className="btn btn-danger" onClick={() => deleteCustomer(customer.id)} 
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
                showAddCustomer? <AddCustomerComponent setShowAddCustomer={setShowAddCustomer} getAllCustomers={getAllCustomers} /> : null
            }
            {
                showUpdateCustomer? <UpdateCustomerComponent id={activeId} setShowUpdateCustomer={setShowUpdateCustomer} getAllCustomers={getAllCustomers} /> : null
            }
            
        </div>
        <FooterComponent />
        </div>
    )
}

export default ListCustomerComponent;
