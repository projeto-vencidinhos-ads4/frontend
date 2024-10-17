import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "../pages/client/product/product";
import Category from "../pages/client/category/category";
import Input from "../components/ui/input/input";
import Button from "../components/ui/button/button";
import ButtonOutlined from "../components/ui/button-outlined/button-outlined";
import Loader from "../components/ui/loader/loader";
import Header from "../components/ui/header/header";

const RouterConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/client/product" element={<Product />} />
                <Route path="/client/category" element={<Category />} />
                <Route
                    path="/test"
                    element={
                        <div>
                            <Input />
                            <Button />
                            <ButtonOutlined />
                        </div>
                    }
                />
                <Route
                    path="/teste/isaque"
                    element={
                        <div>
                            <Loader classname="loader-default"></Loader>
                            <Loader classname="loader-small"></Loader>
                            <Loader classname="loader-big"></Loader>
                        </div>
                    }
                />
                <Route path="/test/bngno" element={<Header />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterConfig;
