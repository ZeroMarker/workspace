import FooterComponent from "../../layouts/FooterComponent"
import HeaderComponent from "../../layouts/HeaderComponent"

const NotFound = () => {
    return(
        <div>
            <HeaderComponent/>
        <div className="col-4 offset-4">
            
            <h1 className="w-150 h-150">404</h1>
            <p>对不起，这个页面不存在</p>
            
        </div>
            <FooterComponent/>
        </div>
    )
}

export default NotFound