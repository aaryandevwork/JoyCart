import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productApis";

export const useProducts = () => {
  const queryClient = useQueryClient();

  //GET PRODUCT
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  //ADD PRODUCT
  const addMutation = useMutation({
    mutationFn: addProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  //UPDATE PRODUCT
  const updateMutation = useMutation({
    mutationFn: updateProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  //DELETE PRODUCT
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  return {
    productsQuery,
    addMutation,
    updateMutation,
    deleteMutation,
  };
};
