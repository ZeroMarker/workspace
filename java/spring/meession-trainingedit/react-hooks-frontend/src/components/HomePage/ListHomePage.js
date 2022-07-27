import React from 'react'
import FooterComponent from '../../layouts/FooterComponent';
import HeaderComponent from '../../layouts/HeaderComponent';

const ListHomePage = () => {

    return (
        <div>
        <HeaderComponent/>
        <div className='col-10 offset-2'>
            <p className="font"><img src='背景.png' alt='背景' width="200px"></img>欢迎来到本系统！</p>
        </div>
        <FooterComponent/>
        </div>



    )
}

export default ListHomePage;
