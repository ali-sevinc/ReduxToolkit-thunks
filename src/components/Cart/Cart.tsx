import { useSelector } from "react-redux";
import Card from "../UI/Card";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { RootState } from "../../store/store";

const Cart = () => {
  const { items } = useSelector((state: RootState) => state.cart);

  return (
    <Card className={styles.cart}>
      <h2>Your Shopping Cart</h2>
      {items.length === 0 && <p>There are no items in the cart.</p>}
      {items.length > 0 && (
        <ul>
          {items.map((item) => {
            const data = {
              id: item.id,
              title: item.title,
              quantity: item.quantity,
              total: item.quantity * item.price,
              price: item.price,
            };

            return <CartItem key={item.id} item={data} />;
          })}
        </ul>
      )}
    </Card>
  );
};

export default Cart;
