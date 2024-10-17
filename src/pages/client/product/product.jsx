import { useCallback, useEffect, useState } from "react";
import FormGroup from "../../../components/form-group/form-group";
import Input from "../../../components/ui/input/input";
import ClientLayout from "../../layouts/_clientLayout";
import "./index.css";
import { client } from "../../../utils/client-mock-data";
import Button from "../../../components/ui/button/button";
import ButtonOutlined from "../../../components/ui/button-outlined/button-outlined";
import EditForm from "./editProduct";

const Product = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState();
    const [editedName, setEditedName] = useState("");
    const [editedPrice, setEditedPrice] = useState("");
    const [editedQuantity, setEditedQuantity] = useState("");
    const [editedCategory, setEditedCategory] = useState("");
    const { id } = client;

    const fetchCategories = useCallback(() => {
        fetch(`http://localhost:8085/categories/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [id]);

    const fetchProducts = useCallback(() => {
        fetch(`http://localhost:8085/products/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [id]);

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

    function editProduct(productId, name, quantity, price, category) {
        setEditingProductId(productId);
        setEditedName(name);
        setEditedQuantity(quantity);
        setEditedPrice(price);
        setEditedCategory(category);
    }

    function saveProduct(
        productId,
        productName,
        productPrice,
        productQuantity,
        productClientId,
        productCategoryId
    ) {
        var categoryId = editedCategory;
        if (categoryId == null) {
            categoryId = productCategoryId;
        }
        fetch(`http://localhost:8085/products/${productId}/change`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: editedName,
                price: parseInt(editedPrice).toFixed(2),
                quantity: editedQuantity,
                clientId: productClientId,
                categoryId: parseInt(categoryId),
            }),
        })
            .then(() => {
                fetchProducts();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        setEditingProductId(null);
    }

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, [fetchCategories, fetchProducts]);

    console.log(products);

    return (
        <ClientLayout>
            <section className="content">
                <form
                    className="form-product"
                    onSubmit={(e) => {
                        e.preventDefault();

                        let data = new FormData(e.target);

                        if (
                            !data.get("name") ||
                            !data.get("price") ||
                            !data.get("quantity") ||
                            !data.get("category")
                        )
                            return;

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
                    }}
                >
                    <FormGroup>
                        <label className="label">Nome</label>
                        <Input
                            defaultValue=""
                            placeholder="Nome do produto"
                            id="name"
                            name="name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label className="label">Preço</label>
                        <Input
                            defaultValue=""
                            placeholder="Valor do produto"
                            id="price"
                            name="price"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label className="label">Quantidade</label>
                        <Input
                            defaultValue=""
                            placeholder="Quantidade de produtos"
                            id="quantity"
                            name="quantity"
                        />
                    </FormGroup>
                    <FormGroup>
                        <select
                            className="select-option"
                            defaultValue="Selecione a categoria"
                            name="category"
                            id="category"
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup>
                    <Button type="submit" className="button">
                        Salvar
                    </Button>
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
                            {console.log(products[1])}
                            {products.length > 0 ? (
                                products.map((product) => {
                                    return editingProductId == product.id ? (
                                        <tr key={product.id}>
                                            <EditForm
                                                product={product}
                                                categories={categories}
                                                setEditingProductId={
                                                    setEditingProductId
                                                }
                                            />
                                        </tr>
                                    ) : (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.price}</td>
                                            <td>{product.categoryName}</td>
                                            <td
                                                style={{
                                                    display: "flex",
                                                    gap: "8px",
                                                }}
                                            >
                                                {
                                                    <Button
                                                        onClick={() =>
                                                            setEditingProductId(
                                                                product.id
                                                            )
                                                        }
                                                    >
                                                        Editar
                                                    </Button>
                                                }
                                                <ButtonOutlined
                                                    type="button"
                                                    color="error"
                                                    onClick={() =>
                                                        deleteProduct(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    Deletar
                                                </ButtonOutlined>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5}>
                                        Nenhum produto cadastrado
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </ClientLayout>
    );
};

export default Product;
