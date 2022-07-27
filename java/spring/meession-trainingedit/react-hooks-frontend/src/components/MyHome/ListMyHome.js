import React from 'react'
import FooterComponent from '../../layouts/FooterComponent';
import HeaderComponent from '../../layouts/HeaderComponent';

const ListMyHome = () => {

    return (
        <div>
        <HeaderComponent/>
        <div className="container my-5 offset-2 p-5 bg-light">
            <div className="row">
        <div className="col-5 bg-white p-2">
        <img src="头像.png" alt='home' className="mx-auto d-block" width="110px" />
            <h2 className="text-center md-2 mt-4">张三</h2>
            <h5 className="text-center md-2 mt-4">攻城莫畏坚，登山莫畏难</h5>
            <br/>
            <h5 className="text-left md-2 mt-4 mx-5"><img src="部门.png" alt='部门：' width="30px" height="25px"/> 所属部门：技术部</h5>
            <br/>
            <h5 className="text-left md-2 mt-4 mx-5"><img src="职位.png" alt='职位：' width="30px" height="25px" /> 职务：主管</h5>
            <br/>
            <h5 className="text-left md-2 mt-4 mx-5"><img src="角色.png" alt='角色：' width="18px" height="27px" /> 角色：系统管理员</h5>
</div>
        <div className="col-6 bg-white p-2 mx-5">
            <h4 className='text-left mt-2 mx-2 mb-2'>基本信息</h4>
            <br/>
            <h5 className="text-left md-2 mt-4 mx-5"><img src="邮箱.png" alt='邮箱：' width="27px" height="23px"/> 邮箱：123@qq.com</h5>
            <br/>
            <h5 className="text-left md-2 mt-4 mx-5"><img src="电话.png" alt='联系方式：' width="28px" height="25px" /> 联系方式：18888888888</h5>
            <br/>
            <h5 className="text-left md-2 mt-4 mx-5"><img src="地址.png" alt='地址：' width="24px" height="29px"/> 地址：湖南省湘潭市</h5>
            <br/>
            <h5 className="text-left md-2 mt-4 mx-5"><img src="个人简介.png" alt='个人简介：' width="28px" height="25px"/> 个人简介：<br/>有多年以上企业IT管理工作经验，综合网络统筹规划/实施/主流设备厂产品技术枝持维护经验；
           <br/>具有ERP项目选型/实施/开发维护能力和经历；<br/>对工作认真负责，能承受压力和挑战，能较快上手相关工作，在计算机方面有很强的综合能力。
</h5>
</div>
        </div>
        
      </div>
      <FooterComponent/>
      </div>
            



    )
}

export default ListMyHome;
