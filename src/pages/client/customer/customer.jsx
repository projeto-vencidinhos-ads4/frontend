import { useEffect, useState } from "react";
import { client } from "../../../utils/client-mock-data";
import Button from "../../../components/ui/button/button";

const Customer = () => {

    const [customers, setCustomers] = useState([]);

    const { id } =  client

    function fetchCustomers() {
        fetch(`http://http://localhost:8085/customers/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setCustomers(data);
        })
        .catch((error) => {
            console.error("Error", error);
        });  
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <CustomerLayout>
            <section className="content">
                <div className="container-customer">
                    <h1>Clientes</h1>
                    <form
                        className="form-customer"
                        onSubmit={(e) => submitCustomer(e)}
                    >
                        <Input
                            type="text"
                            className="input-default"
                            placeholder="Digite o cliente"
                            name="name"
                            id="name" ///////////////
                        />
                        <Button type="submit">Salvar</Button>
                    </form>
                </div>

                <div className="list-customers">
                    <h1>Lista de clientes</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Loja</th>
                                <th>Documento</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </section>
        </CustomerLayout>
    );

};

export default Customer;