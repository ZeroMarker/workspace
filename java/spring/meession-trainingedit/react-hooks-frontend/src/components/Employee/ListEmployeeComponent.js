import React,{useState,useEffect} from 'react'
import EmployeesService from '../../services/EmployeesService'
import AddEmployeeComponent from './AddEmployeeComponent'
import UpdateEmployeeComponent from './UpdateEmployeeComponent'
import { Pagination } from 'antd';
import HeaderComponent from '../../layouts/HeaderComponent';
import FooterComponent from '../../layouts/FooterComponent';
import 'antd/dist/antd.css';


const onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  };
const ListEmployeeComponent = () => {

    // define employees state and get a methed to update employees
    const [employees, setEmployees] = useState([])
    //const [pageNUme, setPageNum] = useState([])
    const size = 2
    const [showAddEmployee,setShowAddEmployee] = useState(false);
    const [showUpdateEmployee,setShowUpdateEmployee] = useState(false);
    
    let [activeId,setActiveId] = useState(null);
    
    var pageNum = 1
    // const searchButton = () => {
    //     isLoading(true);
    //     searchOrder(searchInput, pageNumber, 'name').then((res) => {
    //       setOrders(res.data.content);
    //       setTotalElements(res.data.totalElements);
    //       setCurrentPage(res.data.number);
    //       setItemsCountPerPage(res.data.size);
    //       isLoading(false);
    //     });
    //   };
      
    //   useEffect(() => {
    //     isLoading(true);
    //     getOrders(pageNumber, 'name').then((res) => {
    //       setOrders(res.data.content);
    //       setTotalElements(res.data.totalElements);
    //       setCurrentPage(res.data.number);
    //       setItemsCountPerPage(res.data.size);
    //       isLoading(false);
    //     });
    //   }, [pageNumber, refreshPage]);


    // get employees data from backend
    const getAllEmployees = () =>{
        EmployeesService.getAllEmployees().then((response) => {
            // console.log(response.data)
            setEmployees(response.data);
        }).catch(error=>{
            console.log(error)
        })
    }
    const queryEmployeeByDept = (employeeDept) =>{
        EmployeesService.queryEmployeeByDept(employeeDept).then((response) => {
            setEmployees(response.data);
        }).catch(error=>{
            console.log(error)
        })
    }
    const setPageNum = (pageNum) => {
        EmployeesService.list(pageNum, size).then((response) => {
            setEmployees(response.data.content);
        })
    }

    useEffect(() => {
       
        getAllEmployees();
        queryEmployeeByDept();
        

    }, [])

    const updateEmployee = (employeeId) => {
        setActiveId(employeeId);
        setShowUpdateEmployee(true);
    }

    const deleteEmployee = (employeeId) => {
        // console.log(employeeId);
        EmployeesService.deleteEmployee(employeeId).then(response=>{

            getAllEmployees();

        }).catch(error=>{
            console.log(error)
        })
    }
    const Page = () => {
        const [current, setCurrent] = useState(3);
      
        const onChange = (page) => {
          console.log(page);
          setCurrent(page);
        };
      
        return <Pagination current={current} onChange={onChange} total={50} />;
      };


    return (
        <div>
            <HeaderComponent />
        <div className="col-8 offset-2">
            <h2 className="text-center">????????????</h2>
            <div style={{float:"left"}}><button className="btn btn-primary mb-2" onClick={()=>setShowAddEmployee(true)}>????????????</button></div>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" >????????????</button></div>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" >????????????</button></div>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" >????????????</button></div>
            <div style={{width:"20%"}} >
                 <select class="form-select mb-2" id="sel1" name="sellist1" onChange={e=>queryEmployeeByDept(e.target.value)}>
                    <option value="">???????????????</option>
                    <option value="?????????">?????????</option>
                    <option value="?????????">?????????</option>
                    <option value="?????????">?????????</option>
                    <option value="?????????">?????????</option>
                    <option value="?????????">?????????</option>
                    <option value="?????????">?????????</option>
                </select>
           </div>
           
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>????????????</th>
                        <th>??????</th>
                        <th>??????</th>
                        <th>????????????</th>
                        <th>??????</th>
                        <th>??????</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee=>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.employeeDept}</td>
                                <td>{employee.employeeName}</td>
                                <td>{employee.employeeOffice}</td>
                                <td>{employee.employeePhone}</td>
                                <td>{employee.employeeSex}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>??????</button>
                                    <button className="btn btn-danger" onClick={()=>deleteEmployee(employee.id)} 
                                        style={{marginLeft:"10px"}}
                                    >??????</button>
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
                showAddEmployee? <AddEmployeeComponent setShowAddEmployee={setShowAddEmployee} getAllEmployees={getAllEmployees} /> : null
            }
            {
                showUpdateEmployee? <UpdateEmployeeComponent id={activeId} setShowUpdateEmployee={setShowUpdateEmployee} getAllEmployees={getAllEmployees} /> : null
            }
            
            
            
        </div>
        <FooterComponent />
        </div>
        
        
    )
}

export default ListEmployeeComponent;
