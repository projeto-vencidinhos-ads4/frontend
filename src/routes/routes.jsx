import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Product from '../pages/client/product/product'
import Category from '../pages/client/category/category'
import Input from '../components/ui/input/input'
import Button from '../components/ui/button/button'
import ButtonOutlined from '../components/ui/button-outlined/button-outlined'

const RouterConfig = () => {

    return (
        <BrowserRouter basename='/app'>
            <Routes >
                <Route path="/client/product" element={<Product />} />
                <Route path="/client/category" element={<Category />} />
                <Route path="/test" element={<div><Input/><Button/><ButtonOutlined/></div>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterConfig