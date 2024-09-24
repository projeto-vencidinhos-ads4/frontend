import { NavLink } from 'react-router-dom'
import Header from '../../components/ui/header/header'

const ClientLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="category-hero">
                <aside className="side-bar">
                    <NavLink to={"/client/category"}>
                        <h1>Category</h1>
                    </NavLink>
                    <NavLink to={"/client/product"}>
                        <h1>Product</h1>
                    </NavLink>
                    <NavLink to={"/client/customer"}>
                        <h1>Customer</h1>
                    </NavLink>
                    <h1>Stock</h1>
                </aside>
                {children}
            </div>
        </>
    );
}


export default ClientLayout