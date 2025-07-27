import { Employee, FormData } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useFetchEmployees = (searchTerm: string, statusFilter: "ACTIVE" | "INACTIVE") => {
  return useQuery<Employee[]>({
    queryKey: ["employees", searchTerm, statusFilter],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/employees", {
        params: {
          search: searchTerm,
          status: statusFilter,
        },
      });
      return response.data;
    },
  });
};

export const useFetchEmployeeDetail = (empId: string) => {
  return useQuery<Employee>({
    queryKey: ["employee", empId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/employees/${empId}`);
      return response.data;
    },
    enabled: !!empId,
  });
};

export const usePostEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newEmployee: Partial<FormData>) => {
      const response = await axiosInstance.post("/api/employees", newEmployee);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};


export const useUpdateEmployee = (empId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.put(`/api/employees/${empId}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};

export const useMoveToTrash = (empId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await axiosInstance.patch(`/api/employees/${empId}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};


export const useDeleteEmployee = (empId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete(`/api/trash/${empId}/delete`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
};
