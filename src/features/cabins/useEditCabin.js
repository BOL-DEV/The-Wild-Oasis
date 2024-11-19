import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoadiing: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (error) => toast.error(error.message),
  });

  return { editCabin, isEditing };
};

export default useCreateCabin;
