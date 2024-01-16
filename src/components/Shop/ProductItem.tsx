import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import styles from "./ProductItem.module.css";
import { addItem, removeItem } from "../Cart/cartSlice";
import { RootState } from "../../store/store";

type PropsType = {
  title: string;
  price: number;
  description: string;
  id: string;
};
const ProductItem = ({ title, price, description, id }: PropsType) => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state: RootState) => state.cart);

  const isItemInCart = items.find((item) => item.id === id);

  function addItemToCart() {
    const item = {
      id,
      title,
      price,
      quantity: 1,
    };
    dispatch(addItem(item));
  }

  return (
    <li className={styles.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={styles.actions}>
          {isItemInCart && (
            <p>
              <button
                disabled={status === "info"}
                onClick={() => dispatch(removeItem({ id }))}
              >
                -
              </button>
              <span>-{isItemInCart.quantity}-</span>
              <button disabled={status === "info"} onClick={addItemToCart}>
                +
              </button>
            </p>
          )}
          {!isItemInCart && (
            <button disabled={status === "info"} onClick={addItemToCart}>
              Add to Cart
            </button>
          )}
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
