import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/productApis";

export const useProduct = (productId) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
  });
};