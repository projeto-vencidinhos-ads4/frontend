import { useEffect, useState } from "react";
import ButtonOutlined from "../../../components/ui/button-outlined/button-outlined";
import Button from "../../../components/ui/button/button";
import Input from "../../../components/ui/input/input";

import "./index.css";
import { listCategories } from "../../../utils/categories-mock-data";
import { client } from "../../../utils/client-mock-data";
import ClientLayout from "../../layouts/_clientLayout";

const Category = () => {
    const [categories, setCategories] = useState([]);

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
                setCategories(listCategories)
            });
    }

    useEffect(() => {
        fetchCategories();
    }, []);


    function submitCategory(e) {
        e.preventDefault();
        console.log(e.target);
        let data = new FormData(e.target);

        if (!data.get("category")) return

        fetch("http://localhost:8085/categories/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.get("category"),
                clientId: id,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                fetchCategories();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    // Function for handling the deletion of Categories
    function deleteCategory(categoryId) {
        console.log(`Attempting to delete Category with ID: ${categoryId}`);
        
        fetch(`http://localhost:8085/categories/delete/${categoryId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            console.log("Response Status:", response.status);
            if (response.ok) {
                console.log(`The Category with id: ${categoryId} deleted successfully!`);
                fetchCategories();
            } else {
                console.error("Failed to delete Category!");
                alert(`Failed to delete Category!\n\n` +
                    `It seems a Product is dependent on this Category.\n` +
                    `To delete the Category with id: ${categoryId}, the dependent Product(s) needs to be deleted first.`)
            }
        })
        .catch((error) => {
            console.error("Network Error:", error);
        });
    }

    return (
        <ClientLayout>
            <section className="content">
                <div className="container-category">
                    <h1>Categorias</h1>
                    <form
                        className="form-category"
                        onSubmit={(e) => submitCategory(e)}
                    >
                        <Input
                            type="text"
                            className="input-default"
                            placeholder="Digite uma categoria"
                            name="category"
                            id="category"
                        />
                        <Button type="submit">Salvar</Button>
                    </form>
                </div>
                <div className="list-categories">
                    <h1>lista de categorias</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Categoria</th>
                                <th>Quantidade de Produtos</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>{category.quantidade}</td>
                                    <td>
                                        <div className="td-group">
                                            <Button>Editar</Button>
                                            <ButtonOutlined
                                                type="button"
                                                color="error"
                                                onClick={() => deleteCategory(category.id)}
                                            >
                                                Deletar
                                            </ButtonOutlined>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </ClientLayout>
    );
};

export default Category;
