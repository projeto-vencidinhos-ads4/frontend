import { useEffect, useState } from 'react';
import FormGroup from '../../../components/form-group/form-group';
import Input from '../../../components/ui/input/input';
import ClientLayout from '../../layouts/_clientLayout';
import './index.css';
import { client } from '../../../utils/client-mock-data';
import Button from '../../../components/ui/button/button';
import ButtonOutlined from '../../../components/ui/button-outlined/button-outlined';

const Product = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null); 
    const [editedName, setEditedName] = useState("");
    const [editedPrice, setEditedPrice] = useState("");
    const [editedQuantity, setEditedQuantity] = useState("");
    const [editedCategory, setEditedCategory] = useState("");
    const { id } = client;


    function fetchCategories() {
        fetch(`http://localhost:8085/categories/${id}`)
            .then((response) => response.json())
            .then((data) => {
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
                setProducts(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    // Function for handling the deletion of Products
    function deleteProduct(productId) {
        fetch(`http://localhost:8085/products/${productId}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (response.ok) {
                fetchProducts();
            } else {
                console.error("Erro ao deletar o produto");
            }
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
    }

    
    function editProduct(productId, name,quantity,price,category) {
        setEditingProductId(productId); 
        setEditedName(name);
        setEditedQuantity(quantity); 
        setEditedPrice(price)
        setEditedCategory(category); 
    }

    function saveProduct(productId,productName,productPrice,productQuantity,productClientId,productCategoryId) {
        var categoryId = editedCategory;
        if (categoryId == null){
            categoryId = productCategoryId;
            console.log(categoryId)
            
        }; 
        console.log(categoryId)
        fetch(`http://localhost:8085/products/${productId}/change`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: editedName,
                price: (parseInt(editedPrice)).toFixed(2),
                quantity: editedQuantity,
                clientId: productClientId,
                categoryId: parseInt(categoryId),
            }),
            
        })
        .then((data) => {
            fetchProducts();
        })
        .catch((error) => {
            console.error("Error:", error);
        });      
        console.log("Salvando produto com ID:", productId, "e nome:", editedName);
        setEditingProductId(null); 
    }

    useEffect(() => {
        fetchCategories();
        fetchProducts();
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
                    .then(() => {
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
                    <h1>lista de produtos</h1>
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
                                <tr key={product.id}>
                                    <td>
                                        {editingProductId === product.id ? (
                                            <Input defaultValue="" placeholder={editedName} id="edit" name="edit" onChange={(e) => setEditedName(e.target.value)}/>
                                        ) : (
                                            product.name
                                        )}
                                    </td>
                                    <td>
                                        {editingProductId === product.id ? (
                                            <Input 
                                                type="text" 
                                                value={editedQuantity} 
                                                onChange={(e) => setEditedQuantity(e.target.value)}
                                            />
                                        ) : (
                                            product.quantity
                                        )}
                                    </td>
                                    <td>
                                        {editingProductId === product.id ? (
                                            <Input 
                                                type="text" 
                                                value={editedPrice} 
                                                onChange={(e) => setEditedPrice(e.target.value)}
                                            />
                                        ) : (
                                            product.price
                                        )}
                                    </td>
                                    <td>
                                        {editingProductId === product.id ? (
                                    <FormGroup>
                                    <select className='select-option' defaultValue={product.categoryId} name="category" id="category" value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)}>
                                        {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                    ))}
                                    </select>
                                    </FormGroup>
                                        ) : (
                                            product.categoryName
                                        )}
                                    </td>                                                                                                              
                                    <td style={{ display: "flex", gap: "8px" }}>
                                        {editingProductId === product.id ? (
                                            <Button onClick={() => saveProduct(product.id,product.name,product.price,product.quantity,product.clientId,product.categoryId)}>Salvar</Button>
                                        ) : (
                                            <Button onClick={() => editProduct(product.id, product.name,product.quantity,product.price,product.category)}>Editar</Button>
                                        )}
                                        <ButtonOutlined 
                                            type="button"
                                            color="error"
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            Deletar
                                        </ButtonOutlined>
                                    </td>
                                </tr>
                            )) : <tr><td colSpan={5}>Nenhum produto cadastrado</td></tr>}
                        </tbody>
                    </table>
                </div>
            </section>
        </ClientLayout>
    )
}

export default Product;
