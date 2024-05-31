"use client";
import Product from "./components/Product";

import { ProductType } from "@/types/productType";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchProducts } from "./actions";

export default function InfiniteScroll({
  initialProducts,
}: {
  initialProducts: ProductType[];
}) {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [hasMore, setHasMore] = useState<boolean>(true); // para controlar se tem mais itens vindo do nosso stripe
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [ref, inView] = useInView({
    threshold: 0, // % da tela para o scroll ser ativo
    triggerOnce: false, // ser carregada apenas uma vez
  });

  const lastProductId = products[products.length - 1]?.id; //pegando o ultimo item da minha lista de objetos

  const loadMoreProducts = useCallback(async () => {
    // memorizar nossa função para não ser requisitada sem ter tido alteração no estato
    setIsLoading(true); // carregar produto
    const { formatedProducts, has_more } = await fetchProducts({
      lastProductId,
    });

    console.log(formatedProducts);

    if (formatedProducts) {
      setProducts((prevProducts) => [...prevProducts, ...formatedProducts]);
      setHasMore(hasMore);
    }
  }, [hasMore, lastProductId]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreProducts();
    }
  }, [hasMore, inView, isLoading, loadMoreProducts]);

  if (!products) return <div>carregando...</div>;

  return (
    <>
      {products.map((item) => (
        <Product key={item.id} product={item} />
      ))}

      {hasMore && <div ref={ref}>carregando mais registros</div>}
    </>
  );
}
