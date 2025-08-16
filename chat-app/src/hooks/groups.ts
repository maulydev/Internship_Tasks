
import { ChatHeaderInfo, ChatMessage } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchGroups = () => {
  return useQuery<ChatHeaderInfo[]>({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await axiosInstance.get("/api/groups");
      return response.data || [];
    },
    refetchOnMount: "always",
    // refetchOnWindowFocus: false,
  });
};

export const useFetchGroupDetail = (roomId: string) => {
  return useQuery({
    queryKey: ["group", roomId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/groups/${roomId}`);
      return response.data as ChatHeaderInfo;
    },
    enabled: !!roomId,
    refetchOnMount: "always",
    // refetchOnWindowFocus: false,
  });
};

export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: { name: string; desc: string }) => {
      const res = await axiosInstance.post("/api/groups", formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
};


export const useFetchGroupChat = (roomId: string, enabled: boolean) => {
  return useQuery<{
    group: ChatHeaderInfo;
    messages: ChatMessage[];
  }>({
    queryKey: ["groupChat", roomId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/chats/${roomId}/group`);
      return res.data;
    },
    enabled,
    refetchOnMount: "always",
    // refetchOnWindowFocus: false,
  });
};
