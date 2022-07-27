import React,{ useState,useEffect } from 'react'

import ProductsService from '../../services/ProductsService'

const UpdateProductComponent = ({id,setShowUpdateProduct,getAllProducts}) => {

    const [productName, setProductName] = useState("")
    const [productInfo, setProductInfo] = useState("")
    



    const UpdateProduct = (e)=>{
        e.preventDefault();

        const product = {productName,productInfo};

        // console.log(product)

      
        ProductsService.updateProduct(id,product).then(response => {

                setShowUpdateProduct(false);

                getAllProducts();

            }).catch(error=>{

                console.log(error);

            })

        

        
    }

    useEffect(() => {
        
        ProductsService.getProductById(id).then(response=>{
            setProductName(response.data.productName);
            setProductInfo(response.data.productInfo);
            
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
                        <h2 className="text-center">更新产品信息</h2>
                       <div className="card-body">
                           <form>
                               <div className="form-group mb-2">
                                   <label className="form-label">产品名称 :</label>
                                   <input 
                                    type="text" 
                                    placeholder="请输入产品名称"
                                    name="productName"
                                    className="form-control"
                                    value = {productName}
                                    onChange={e=>setProductName(e.target.value)} />
                               </div>
                               <div className="form-group mb-2">
                                   <label className="form-label">产品信息 :</label>
                                   <input 
                                    type="text" 
                                    placeholder="请输入产品信息"
                                    name="productInfo"
                                    className="form-control"
                                    value = {productInfo}
                                    onChange={e=>setProductInfo(e.target.value)} />
                               </div>
                              

                                <button className="btn btn-success" onClick={(e)=>UpdateProduct(e)}>提交</button>
                                <button style={{marginLeft:'20px'}} className="btn btn-danger" onClick={()=>setShowUpdateProduct(false)}>取消</button>
                           </form>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default UpdateProductComponent
