import { useEffect, useState } from "react";
import ButtonOutlined from "../../../components/ui/button-outlined/button-outlined";
import Button from "../../../components/ui/button/button";
import Input from "../../../components/ui/input/input";

import "./index.css";

const Category = () => {
    const [categories, setCategories] = useState([]);

    function fetchCategories() {
        fetch("http://localhost:8085/categories/1")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    useEffect(() => {
        fetchCategories();
    }, []);


    function submitCategory(e) {
        e.preventDefault();
        console.log(e.target);
        let data = new FormData(e.target);

        console.log("submit");
        fetch("http://localhost:8085/categories/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.get("category"),
                clientId: 1,
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

    return (
        <div className="category-hero">
            <aside className="side-bar">
                <h1>Category</h1>
                <h1>Produto</h1>
                <h1>Stock</h1>
            </aside>
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
                                            <ButtonOutlined color="error">
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
        </div>
    );
};

export default Category;
