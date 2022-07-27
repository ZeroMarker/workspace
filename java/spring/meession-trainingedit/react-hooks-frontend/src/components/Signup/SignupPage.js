import React ,{useState} from "react"
import "./SignupPage.css"
import ico from './image/ico.jpg'
import icon from './image/icon.png'
import {useFormik} from "formik"
import {Link} from "react-router-dom"
import SignupService from "../../services/SignupService"


const validate = values => {
    const errors = {};


    if (!values.userName) {
        errors.userName = '邮箱不能为空';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userName)) {
        errors.userName = '请输入正确格式的邮箱地址';
      }
  
  
    if (!values.password) {
      errors.password = '密码不能为空';
    } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/i.test(values.password)) {
      errors.password = '长度至少为6且不能是纯数字或纯字母';
    }

    if (!values.vcode) {
        errors.vcode = '验证码不能为空';
      } 

      if (!values.confirmpassword) {
        errors.confirmpassword = '密码不能为空';
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/i.test(values.confirmpassword)) {
        errors.confirmpassword = '两次输入的密码不一致';
      }
  
    
  
    return errors;
  };

  const SignupPage = ({}) => {

    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")

    const saveUser =(e)=>{ 
      
            e.preventDefault();
    
            const user = {userName,password};
            
            SignupService.login(user.userName,user.password).then(response=>{
    
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
          confirmpassword: '',
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
                    <h2 style={{
                        color: "rgba(28, 27, 27, 0.9)",
                        marginbottom: "30px"
                    }}>注册</h2>
                    <p style={{
                        fontSize: "12px"
                    }}>已有账号?<a className="a" href=".\" target="_self">登录</a></p>
                    <div className="input-box">
                        <label className="label">姓名</label>
                        <input className="input" type="text" style={{ color: "black" }} />
                    </div>
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
                        name="userName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.userName}
                        style={{ color: "black" }} />
                                                  {formik.touched.userName && formik.errors.userName ? (
        <div className="error">{formik.errors.userName}</div>
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
                        style={{ color: "black" }} />
                        <button style={{
                      height: "35px",
                      width: "90px",
                      marginleft: "160px",
                      borderradius: "5px",
                      position: "absolute",
                      top: "265px",
                      left: "125px"
  
                  }} className="button">获取验证码</button>
                                                                      {formik.touched.vcode && formik.errors.vcode ? (
        <div className="error">{formik.errors.vcode}</div>
      ) : null}
                        
                    </div>
                    <div 
                    onSubmit={formik.handleSubmit}
                    className="input-box">
                        <label className="label" htmlFor="password">密码</label>
                        <input 
                        className="input" 
                        type="password" 
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        style={{ color: "black" }} />
                                                  {formik.touched.password && formik.errors.password ? (
        <div className="error">{formik.errors.password}</div>
      ) : null}
                    </div>
                    <div 
                    onSubmit={formik.handleSubmit}
                    className="input-box">
                        <label className="label" htmlFor="confirmpassword">确认密码</label>
                        <input 
                        className="input" 
                        type="password" 
                        name="confirmpassword"  
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmpassword}
                        style={{ color: "black" }} />
                                                                      {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
        <div className="error">{formik.errors.confirmpassword}</div>
      ) : null}
                    </div>
                    <div className="btn-box">

                        <div className="div2">
                            <Link to="/"><button className="buttonn"><img className="img2" src={icon} alt={icon} />注册</button></Link>
                        </div>
                    </div>
                    <p className="p">注册即同意所有用户条款</p>

                </div>

                <script type="text/javascript">

                </script>
            </div>
        )
                }

    export default  SignupPage

