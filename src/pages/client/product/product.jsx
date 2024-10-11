import { useEffect, useState } from 'react'
import FormGroup from '../../../components/form-group/form-group'
import Input from '../../../components/ui/input/input'
import ClientLayout from '../../layouts/_clientLayout'
import './index.css'
import { client } from '../../../utils/client-mock-data'
import Button from '../../../components/ui/button/button'
import ButtonOutlined from '../../../components/ui/button-outlined/button-outlined'
import { useRef } from 'react';

const Product = () => {
    
    const rowRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const { id } = client

    function fetchCategories() {
        fetch(`http://localhost:8085/categories/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function fetchProducts() {
        fetch(`http://localhost:8085/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    // Function for handling the deletion of Products
    function deleteProduct(productId) {
        console.log(`Attempting to delete Prouct with ID: ${productId}`);
        
        fetch(`http://localhost:8085/products/${productId}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            console.log("Response Status:", response.status);
            if (response.ok) {
                console.log(`The Product with id: ${productId} was deleted successfully!`);
                fetchProducts();
            } else {
                console.error("Failed to delete Product!");
            }
        })
        .catch((error) => {
            console.error("Network Error:", error);
        });
    }

    function updateProduct(){
        if (rowRef.current) {
            const cells = rowRef.current.children;
            const productName = cells[0];
            productName.innerText = "alooo"

            console.log(productName)}
    }
    

    useEffect(() => {
        fetchCategories();
    }, []);


    useEffect(() => {
        fetchProducts()
    }, []);

    return (
        <ClientLayout>
            <section className='content'>
                <form className='form-product' onSubmit={(e) => {
                    e.preventDefault();

                    let data = new FormData(e.target);

                    if (!data.get("name") || !data.get("price") || !data.get("quantity") || !data.get("category")) return

                    fetch("http://localhost:8085/products/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: data.get("name"),
                            price: Number(data.get("price")),
                            quantity: Number(data.get("quantity")),
                            clientId: id,
                            categoryId: Number(data.get("category")),
                        }),
                    })
                        .then((data) => {
                            console.log(data);
                            fetchProducts();
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                        });
                }}>
                    <FormGroup>
                        <label className='label'>Nome</label>
                        <Input defaultValue="" placeholder="Nome do produto" id="name" name="name" />
                    </FormGroup>
                    <FormGroup>
                        <label className='label'>Preço</label>
                        <Input defaultValue="" placeholder="Valor do produto" id="price" name="price" />
                    </FormGroup>
                    <FormGroup>
                        <label className='label'>Quantidade</label>
                        <Input defaultValue="" placeholder="Quantidade de produtos" id="quantity" name="quantity" />
                    </FormGroup>
                    <FormGroup>
                        <select className='select-option' defaultValue="Selecione a categoria" name="category" id="category">
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup>
                    <Button type="submit" className='button'>Salvar</Button>
                </form>
                <div className="list-categories">
                    <h1>lista de propdutos</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Preço</th>
                                <th>Categoria</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? products.map((product) => (
                                <tr ref={rowRef} key={product.id}>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td>{product.categoryName}</td>
                                    <td style={{ display: "flex", gap: "8px" }}>
                                        <Button onClick={() => updateProduct()} >Editar</Button>
                                        <ButtonOutlined 
                                            type="button"
                                            color="error"
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            Deletar
                                        </ButtonOutlined>
                                    </td>
                                </tr>
                            )) : <tr><td colSpan={3}>Nenhum produto cadastrado</td></tr>}
                        </tbody>
                    </table>
                </div>
            </section>
        </ClientLayout>
    )
}

export default Product