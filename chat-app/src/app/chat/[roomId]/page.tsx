import ChatUI from "@/components/chat/chat-ui";

type Param = { params: Promise<{ roomId: string }> };

const ChatPage = async ({ params }: Param) => {
  const roomId = (await params)?.roomId;


  return (
    <div className="flex flex-col h-svh bg-gray-900 text-white w-full">
      <ChatUI roomId={roomId} />
    </div>
  );
};

export default ChatPage;
