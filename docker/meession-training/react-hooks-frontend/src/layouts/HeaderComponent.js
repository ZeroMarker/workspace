import React from 'react'
import {Link} from 'react-router-dom'

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div>
                        <a href="www.baidu.com" className="navbar-brand">
                            Management Application
                        </a>
                        
                    </div>
                    <div style={{marginLeft:"20px"}}>
                        <Link to="/products" className="btn btn-primary mb-2">产品管理</Link>
                    </div>
                    <div style={{marginLeft:"20px"}}>
                        <Link to="/customers" className="btn btn-primary mb-2">客户管理</Link>
                    </div>
                    <div style={{marginLeft:"20px"}}>
                        <Link to="/employees" className="btn btn-primary mb-2">员工管理</Link>
                    </div>
                   
                    
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent
