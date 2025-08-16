import { ChatHeaderInfo, ChatMessage, Conversations } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchConversations = () => {
  return useQuery<Conversations[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/conversations");
      return response.data || [];
    },
    refetchOnMount: "always",
  });
};

export const useStartNewConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: { email: string }) => {
      const res = await axiosInstance.post("/api/conversations/startnew", formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
};


export const useFetchPrivateChat = (roomId: string, enabled: boolean) => {
  return useQuery<{
    receiver: ChatHeaderInfo;
    messages: ChatMessage[];
  }>({
    queryKey: ["privateChat", roomId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/chats/${roomId}/private`);
      return res.data;
    },
    enabled,
    refetchOnMount: "always",
  });
};
