import { useDispatch } from "react-redux";
import styles from "./CartItem.module.css";
import { addItem, removeItem } from "./cartSlice";
type PropsType = {
  item: {
    id: string;
    title: string;
    quantity: number;
    total: number;
    price: number;
  };
};
const CartItem = ({ item }: PropsType) => {
  const { title, quantity, total, price, id } = item;
  const dispatch = useDispatch();

  function handleIncrement() {
    const item = { title, price, id, quantity: 1 };
    dispatch(addItem(item));
  }
  function handleDecrement() {
    dispatch(removeItem({ id }));
  }

  return (
    <li className={styles.item}>
      <header>
        <h3>{title}</h3>
        <div className={styles.price}>
          ${total.toFixed(2)}{" "}
          <span className={styles.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={styles.details}>
        <div className={styles.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={styles.actions}>
          <button onClick={handleDecrement}>-</button>
          <button onClick={handleIncrement}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
