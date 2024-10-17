import Input from "../../../components/ui/input/input";
import Button from "../../../components/ui/button/button";
import ButtonOutlined from "../../../components/ui/button-outlined/button-outlined";
import "./index.css";

const EditProduct = (props) => {
    console.log(props);
    return (
        <>
            <td>
                <Input
                    placeholder="Produto"
                    defaultValue={props.product.name}
                    id="edit"
                    name="edit"
                />
            </td>
            <td>
                <Input type="text" defaultValue={props.product.quantity} />
            </td>
            <td>
                <Input type="text" defaultValue={props.product.price} />
            </td>
            <td>
                <select
                    className="select-option"
                    defaultValue={props.product.categoryId}
                    name="category"
                    id="category"
                >
                    {props.categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <Button>Salvar</Button>
                <ButtonOutlined
                    type="button"
                    color="error"
                    onClick={() => props.setEditingProductId((id) => !id)}
                >
                    Cancelar
                </ButtonOutlined>
            </td>
        </>
    );
};

export default EditProduct;
