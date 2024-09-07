import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Product from '../pages/client/product/product'
import Category from '../pages/client/category/category'


const RouterConfig = () => {

    return (
        <BrowserRouter basename='/app'>
            <Routes >
                <Route path="/client/product" element={<Product />} />
                <Route path="/client/category" element={<Category />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterConfig