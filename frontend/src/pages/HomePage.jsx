import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { Search } from "lucide-react";

const HomePage = () => {
  const { selectedUser, users, isUsersLoading } = useChatStore(); 
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      setSearchResults(null);
      return;
    }

    // Check if users is defined and an array
    if (!users || !Array.isArray(users)) {
      setSearchResults([]);
      return;
    }

    const filtered = users.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(term) ||
        user.mobile?.includes(term)
    );
    setSearchResults(filtered);
  };

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex flex-col h-full rounded-lg overflow-hidden">
            {/* Search Box */}
            <div className="p-4 border-b border-base-300 flex gap-2">
              <input
                type="text"
                placeholder="Search by name or mobile number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full"
                disabled={isUsersLoading} // Disable input while loading
              />
              <button
                onClick={handleSearch}
                className="btn btn-primary"
                disabled={isUsersLoading} // Disable button while loading
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
          
              <Sidebar customUsers={searchResults !== null ? searchResults : users || []} />

              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>

            {/* No user found message */}
            {searchResults && searchResults.length === 0 && (
              <div className="text-center text-sm text-error p-2">
                No user found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
