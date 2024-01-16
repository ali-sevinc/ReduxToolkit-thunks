const firebase_url = import.meta.env.firebase_url;
export type ItemType = {
  description: string;
  id: string;
  price: number;
  title: string;
};
export async function getItems() {
  const res = await fetch(firebase_url + "items.json");
  if (!res.ok) throw new Error("Something went wrong");
  const resData = await res.json();

  const data = Object.values(resData);

  return data as ItemType[];
}
