const ChatLanding = () => {
  return (
    <main className="flex flex-1 items-center justify-center bg-gray-800 text-white">
      <div className="text-center px-6 md:px-0 max-w-xl">
        <div className="text-6xl mb-6">💬</div>

        <h1 className="text-3xl md:text-4xl font-semibold text-blue-500 mb-4">
          Welcome to Chat Buddy
        </h1>

        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          Start a conversation by selecting a user or channel from the sidebar.
          Your messages stay synced across all your devices.
        </p>
      </div>
    </main>
  );
};

export default ChatLanding;
