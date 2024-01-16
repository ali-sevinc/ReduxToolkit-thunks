import { useDispatch, useSelector } from "react-redux";
import styles from "./CartButton.module.css";
import { RootState } from "../../store/store";
import { toggleCart } from "./cartSlice";

const CartButton = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const itemsNumber = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <button onClick={() => dispatch(toggleCart())} className={styles.button}>
      <span>My Cart</span>
      <span className={styles.badge}>{itemsNumber}</span>
    </button>
  );
};

export default CartButton;
