import { fetchProducts } from "./actions";
import ClearItemCart from "./components/ClearItemCart";
import InfiniteScroll from "./infiniteScroll";

export default async function Home() {
  const { formatedProducts } = await fetchProducts({});

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
      <ClearItemCart />
      <InfiniteScroll initialProducts={formatedProducts} />
    </div>
  );
}
