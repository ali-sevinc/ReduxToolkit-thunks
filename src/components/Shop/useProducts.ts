import { useEffect, useState } from "react";
import { ItemType, getItems } from "../../helpers/http";

export function useProducts() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<{
    message: string;
    error: boolean;
  }>({
    message: "",
    error: false,
  });
  useEffect(function () {
    async function fetchItems() {
      setIsError({
        message: "",
        error: false,
      });
      setIsLoading(true);
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        setIsError({
          error: true,
          message: "Someting went wrong while fetchin items data.",
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);
  return { items, isLoading, isError };
}
