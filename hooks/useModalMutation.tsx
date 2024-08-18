import { deleteFolder } from "@/api/folder/deleteFolder";
import { putFolder } from "@/api/folder/putFolder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { postFolder } from "./../api/folder/postFolder";
function useModalMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createFolderMutation = useMutation({
    mutationKey: ["createFolder"],
    mutationFn: (data: postFolder) => postFolder(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
    },
    onSuccess: (data) => {
      const folderId = data[0].id;
      router.push(`/folder/${folderId}`);
    },
    onError: (err, data, context) => {
      console.log("err", err);
    },
  });
  const deleteFolderMutation = useMutation({
    mutationKey: ["deleteFolder"],
    mutationFn: (folderId: number) => deleteFolder(folderId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
    },
  });

  const editFolderMutation = useMutation({
    mutationKey: ["editFolder", 1],
    mutationFn: (data: putFolder) => putFolder(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ["authFolderList"],
      });

      const previousData = queryClient.getQueryData(["authFolderList"]);

      // const updatedFolders = data.map((item: any) => {
      //   if (item.id === newFolderData.folderId) {
      //     return {
      //       ...item,
      //       name: newFolderData.data.name,
      //     };
      //   }
      //   return item;
      // });

      return { previousData };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["authFolderList"] });
    },
    onSuccess: (data) => {
      console.log("Data", data);
    },
    onError: (err, data, context) => {
      console.log("err", err);
    },
  });

  // const deleteLinkMutation = useMutation({
  //   mutationKey: ["deleteLink"],
  //   mutationFn: (linkId: number) => deleteLink(linkId),
  //   // onSettled: () => {
  //   //   queryClient.invalidateQueries({ queryKey: ["FolderLink", Number(id)] });
  //   // },
  // });d

  return {
    createFolderMutation,
    editFolderMutation,
    deleteFolderMutation,
  };
}

export default useModalMutation;
