import { useState, useEffect, useCallback } from "react";
import { Http } from "../utils/Http";
import { useNotification } from "../providers/NotificationProvider";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  isAlreadyFriend?: boolean;
  hasPendingRequest?: boolean;
}

interface AddFriendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFriendAdded?: () => void;
}

const AddFriendsModal = ({ isOpen, onClose, onFriendAdded }: AddFriendsModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { show } = useNotification();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Search for users when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const searchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await Http.getFromServer(`/users/search?q=${encodeURIComponent(debouncedQuery)}`);
        setSearchResults(response.data.users || []);
      } catch (error: any) {
        console.error("Error searching users:", error);
        show({
          title: "Error",
          description: error.response?.data?.error || "Failed to search users",
          color: "red",
          duration: 5000
        });
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchUsers();
  }, [debouncedQuery, show]);

  const handleSendFriendRequest = async (userId: string) => {
    try {
      await Http.postToServer("/friends/request", { targetUserId: userId });
      show({
        title: "Success",
        description: "Friend request sent successfully",
        color: "green",
        duration: 5000
      });
      
      // Update the user's status in search results
      setSearchResults(prev => 
        prev.map(user => 
          user._id === userId 
            ? { ...user, hasPendingRequest: true }
            : user
        )
      );
      
      onFriendAdded?.();
    } catch (error: any) {
      show({
        title: "Error",
        description: error.response?.data?.error || "Failed to send friend request",
        color: "red",
        duration: 5000
      });
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setSearchResults([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Add Friends</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              autoFocus
            />
            {isLoading && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          {searchQuery.trim().length < 2 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500 p-6">
              <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-sm text-center">
                Type at least 2 characters to search for friends
              </p>
            </div>
          ) : searchResults.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500 p-6">
              <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <p className="text-sm text-center">
                No users found matching "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {searchResults.map((user) => (
                <div key={user._id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">
                      {user.name}
                    </h4>
                    <p className="text-gray-500 text-xs truncate">
                      @{user.username}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    {user.isAlreadyFriend ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Friends
                      </span>
                    ) : user.hasPendingRequest ? (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        Pending
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSendFriendRequest(user._id)}
                        className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors duration-200"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFriendsModal;
