import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoadiing: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (error) => toast.error(error.message),
  });

  return { createCabin, isCreating };
};

export default useCreateCabin;
