import React,{useState,useEffect} from 'react'
import ProductsService from '../../services/ProductsService'
import AddProductComponent from './AddProductComponent'
import UpdateProductComponent from './UpdateProductComponent'
import HeaderComponent from '../../layouts/HeaderComponent'
import FooterComponent from '../../layouts/FooterComponent'
import { Pagination} from 'antd';
import 'antd/dist/antd.css';


const onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
  };
const ListProductComponent = () => {

    // define products state and get a methed to update products
    const [products, setProducts] = useState([])

    // define addProduct's Pop-ups state
    const [showAddProduct,setShowAddProduct] = useState(false);

    // define updateProduct's Pop-ups state
    const [showUpdateProduct,setShowUpdateProduct] = useState(false);

    // define the updateId
    let [activeId,setActiveId] = useState(null);


    // get products data from backend
    const getAllProducts = () =>{
        ProductsService.getAllProducts().then((response) => {
            // console.log(response.data)
            setProducts(response.data);
        }).catch(error=>{
            console.log(error)
        })
    }

    // Call the method when the component didmount
    useEffect(() => {
       
        getAllProducts();
        

    }, [])

    const updateProduct = (productId) => {
        setActiveId(productId);
        setShowUpdateProduct(true);
    }

    const deleteProduct = (productId) => {
        // console.log(productId);
        ProductsService.deleteProduct(productId).then(response=>{

            getAllProducts();

        }).catch(error=>{
            console.log(error)
        })
    }


    return (
        <div>
            <HeaderComponent />        
        <div className="col-8 offset-2">
        <h2 className="text-center">产品列表</h2>
            <button style={{float:"left"}} className="btn btn-primary mb-2" onClick={()=>setShowAddProduct(true)}>添加产品</button>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" >批量导入</button></div>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" >批量导出</button></div>
            <div style={{marginLeft:"20px",float:"left"}}><button className="btn btn-primary mb-2" >批量删除</button></div>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>产品名称</th>
                        <th>产品信息</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product=>
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.productName}</td>
                                <td>{product.productInfo}</td>
                                <td>
                                    <button className="btn btn-info" onClick={() => updateProduct(product.id)}>更新</button>
                                    <button className="btn btn-danger" onClick={() => deleteProduct(product.id)} 
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
                showAddProduct? <AddProductComponent setShowAddProduct={setShowAddProduct} getAllProducts={getAllProducts} /> : null
            }
            {
                showUpdateProduct? <UpdateProductComponent id={activeId} setShowUpdateProduct={setShowUpdateProduct} getAllProducts={getAllProducts} /> : null
            }
            
        </div>
        <FooterComponent />
        </div>
    )
}

export default ListProductComponent;
