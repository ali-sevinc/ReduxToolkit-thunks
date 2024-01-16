import { ReactNode } from "react";
import styles from "./Card.module.css";

const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section className={`${styles.card} ${className ? className : ""}`}>
      {children}
    </section>
  );
};

export default Card;
