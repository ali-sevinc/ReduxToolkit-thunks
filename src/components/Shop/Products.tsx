import ProductItem from "./ProductItem";
import styles from "./Products.module.css";
import { useProducts } from "./useProducts";

const Products = () => {
  const { isError, isLoading, items } = useProducts();

  if (isError.error) {
    return <p>{isError.message}</p>;
  }
  if (items.length === 0 && !isLoading) {
    return <p>No items found.</p>;
  }

  return (
    <section className={styles.products}>
      <h2>Buy your favorite products</h2>

      {items.length > 0 && (
        <ul>
          {items.map((item) => (
            <ProductItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Products;
