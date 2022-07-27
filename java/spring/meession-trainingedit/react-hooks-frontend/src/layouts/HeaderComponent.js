import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css'
import logo192 from './logo192.png'
import ico from './favicon.ico'

const HeaderComponent = () => {
    return (
    <div>
      
            
    <div className= "lefter">                     
      <div>
      <a href="HomePage">
        <img src={logo192} alt={ico} width="200px"/>
      </a>
      </div>
    <div className="nav">
      <ul className="nav flex-column">
          <li className="nav-item">
              <Link className="nav-link" to="/customers">用户管理</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/employees">部门管理</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/authoritys">权限管理</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/products">产品管理</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link" to="/orders">订单管理</Link>
          </li>
      </ul>
  </div>
  </div>
  
  <div className="ceiling">
    <div className="ceiling1">
      <div><p>管理端</p></div>
    </div>
    <div className="ceiling2">
        <form className="example" action="/" style={{maxWidth:"300px"}}>
          <input type="text" placeholder="搜索.." name="search2"/>
          <button type="submit"><i className="fa fa-search"></i>搜索</button>
        </form>
     </div>
    <div className="ceiling3">
       <div style={{marginRight:"20px"}}>         
        <div style={{paddingTop: "15px"}}><a href="/MyHome" ><button type="button" className="btn btn-primary">管理员</button></a></div>
       </div>
      <div style={{paddingTop: "15px"}}><img src="1-1.png" alt="logo" width="30px"></img></div>
    </div>
      <div className="ceiling4">
        <div style={{paddingTop:"15px"}}><a href="http://localhost:3000" ><button type="button" className="btn btn-primary">退出登录</button></a></div>
        <div style={{paddingTop: "15px"}}><img src="1-2.png" alt="logo" width="40px"></img></div>
      </div>   
    </div> 
            
    </div>
    )
}

export default HeaderComponent
