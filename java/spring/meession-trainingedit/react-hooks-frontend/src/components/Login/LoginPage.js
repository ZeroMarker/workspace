import React, { useState } from "react"
import "./LoginPage.css"
import ico from './image/ico.jpg'
import LoginService from "../../services/LoginService"
import { Link } from "react-router-dom"
import {useFormik} from "formik"


const validate = values => {
    const errors = {};


    if (!values.userName) {
        errors.userName = '邮箱不能为空';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userName)) {
        errors.userName = '请输入正确格式的邮箱地址';
      }
  
  
    if (!values.password) {
      errors.password = '密码不能为空';
    } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/i.test(values.password)) {
      errors.password = '长度为6~10且不能是纯数字或字母';
    }

    if (!values.vcode) {
        errors.vcode = '验证码不能为空';
      } 
  
    
  
    return errors;
  };
  




const LoginPage = ({}) => {
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")

    const saveUser =(e)=>{ 
      
            e.preventDefault();
    
            const user = {userName,password};
            
            LoginService.login(user.userName,user.password).then(response=>{
    
                console.log(response.data)
                if(response.data=='true'){
                    window.location.href='http://localhost:3000/products';

                }
                    
        
            }).catch(error=>{
                console.log(error)
            })
            
    
            
        
    }

    const formik = useFormik({
        initialValues: {
          userName: '',
          password: '',
          vcode: '',
          
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });





    
    return (
        <div className="body">
            <div className="tubiao">
                <img className="img" src={ico} alt={ico} />
            </div>
            <div className="box">
                <h2 style={{ color: "rgba(28, 27, 27, 0.9)", marginbottom: "30px" }}>登录</h2>
                <p style={{ fontSize: "12px" }}>还没有账号?<a className="a" href=".\signup" target="_self">注册</a></p>
                <div 
                onSubmit={formik.handleSubmit}
                className="input-box">
                    <label 
                    className="label"
                    htmlFor="userName"
                    >Email</label>
                    <input
                        className="input"
                        type="text"
                        placeholder="请输入邮箱"
                        name="userName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userName}
                        style={{ color: "black" }}
                    />
                          {formik.touched.userName && formik.errors.userName ? (
        <div className="error">{formik.errors.userName}</div>
      ) : null}
    
                </div>
                <div 
                onSubmit={formik.handleSubmit}
                className="input-box">
                    <label className="label" htmlFor="password">密码</label>
                    <input className="input"
                        type="password"
                        placeholder="请输入密码"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}

                        style={{ color: "black" }}
                    />
                          {formik.touched.password && formik.errors.password ? (
        <div className="error">{formik.errors.password}</div>
      ) : null}
                    
    
                </div>
                <div 
                onSubmit={formik.handleSubmit}
                className="input-box">
                    <label className="label" htmlFor="vcode">验证码</label>
                    <input className="input" 
                    type="text"  
                    name="vcode"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.vcode}
                    placeholder="请输入验证码" style={{ color: "black" }}
                    /><button style={{
                      height: "35px",
                      width: "90px",
                      marginleft: "160px",
                      borderradius: "5px",
                      position: "absolute",
                      top: "343px",
                      left: "125px"
  
                  }} className="button">获取验证码</button>
                                              {formik.touched.vcode && formik.errors.vcode ? (
        <div className="error">{formik.errors.vcode}</div>
      ) : null}

                </div>
                
                <div className="btn-box">
                    <label className="lab" htmlFor="chk">
                        <input className="inp"
                            type="checkbox"
                        /> 记住账号
                        <a className="aa" href="#" target="_self">忘记密码?</a>
                    </label>
    
                    <div className="div">
                        <Link to="/HomePage">
                        <button className="buton" type="submit"
                        
                        //onClick={(e)=>saveUser(e)}
                        >登录</button></Link>
                    </div>
                </div>
            </div>
    
        </div>
    )
}
export default LoginPage