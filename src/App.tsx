import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";
import { getInitialCart, sendCartData } from "./components/Cart/cartSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let isInitial = 0;

const notifyOptions: {
  autoClose: number;
  closeOnClick: boolean;
  position: "bottom-left";
} = {
  autoClose: 1500,
  closeOnClick: true,
  position: "bottom-left",
};

type NotifyType = "info" | "success" | "error";
function notify(toastStatus: NotifyType, message: string) {
  toast[toastStatus](message, notifyOptions);
}
const notifyMessages = {
  info: "Sending cart data...",
  success: "Success...",
  error: "Something went wrong...",
};

function App() {
  const { isCartToggled, items, status } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch() as AppDispatch;
  useEffect(
    function () {
      isInitial++;
      // console.log(isInitial);
      if (isInitial < 3) return;

      dispatch(sendCartData(items));
    },
    [items, dispatch]
  );

  // console.log(status);

  useEffect(
    function () {
      async function getCart() {
        dispatch(getInitialCart());
      }
      getCart();
    },
    [dispatch]
  );

  useEffect(
    function () {
      if (status === "idle") return;
      notify(status, notifyMessages[status]);
    },
    [status]
  );

  return (
    <>
      <Layout>
        {isCartToggled && <Cart />}
        <Products />
      </Layout>
      <ToastContainer />
    </>
  );
}

export default App;
