import React,{ useState } from 'react'
import ProductsService from '../../services/ProductsService'

const AddProductComponent = ({setShowAddProduct,getAllProducts}) => {

    const [productName, setProductName] = useState("")
    const [productInfo, setProductInfo] = useState("")
    
 


    const saveProduct = (e)=>{
        e.preventDefault();

        const product = {productName,productInfo};

        // console.log(product)

        
        ProductsService.createProduct(product).then(response=>{

            console.log(response.data)
            setShowAddProduct(false);
            getAllProducts();
                
    
        }).catch(error=>{
            console.log(error)
        })
        

        
    }

  
    return (
        <div style={{position:"absolute",width:"100%",top:"250px",left:"50%",transform:"translateX(-50%) translateY(-50%)"}}>
            
           <div className="container">
               <div className="row">
                   <div className="card col-md-6 offset-md-3 offset-md-3" style={{boxShadow:"1px 2px 2px grey,-1px -2px 2px grey"}}>
                      <div style={{textAlign:"center",fontSize:"20px",fontWeight:"bold"}}> 添加产品</div>
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
                                    name="productName"
                                    className="form-control"
                                    value = {productInfo}
                                    onChange={e=>setProductInfo(e.target.value)} />
                               </div>
                              

                                <button className="btn btn-success" onClick={(e)=>saveProduct(e)}>提交</button>
                                <button style={{marginLeft:"20px"}} className="btn btn-danger" onClick={()=>setShowAddProduct(false)}>取消</button>
                           </form>
                       </div>
                   </div>
               </div>
           </div>
        </div>
    )
}

export default AddProductComponent
