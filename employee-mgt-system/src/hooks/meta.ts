import { Meta } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchPositions = () => {
  return useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/positions/");
      return res.data.data;
    },
  });
};

export const usePostPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPosition: { name: string }) => {
      const response = await axiosInstance.post("/api/positions/", newPosition);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });
};

export const useEditPosition = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedDepartment: { name: string }) => {
      const response = await axiosInstance.put(`/api/positions/${id}`, updatedDepartment);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });
};


export const useDeletePosition = (position: Meta) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(`/api/positions/${position?.id}/delete`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });
};





export const useFetchDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/departments/");
      return res.data.data;
    },
  });
};


export const usePostDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newDepartment: { name: string }) => {
      const response = await axiosInstance.post("/api/departments/", newDepartment);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useEditDepartment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedDepartment: { name: string }) => {
      const response = await axiosInstance.put(`/api/departments/${id}`, updatedDepartment);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};


export const useDeleteDepartment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.delete(`/api/departments/${id}/delete`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};