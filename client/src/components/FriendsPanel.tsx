import { useState, useMemo, useEffect } from "react";
import FriendItem from "./FriendItem";
import AddFriendsModal from "./AddFriendsModal";
import { Http } from "../utils/Http";
import { useNotification } from "../providers/NotificationProvider";

interface Friend {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: string;
}

interface FriendRequest {
  _id: string;
  creatorId: {
    name: string;
    _id: string;
  },
  avatar?: string;
  mutualFriends?: number;
  sentAt: string;
}



const FriendsPanel = () => {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests'>('friends');
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isAddFriendsModalOpen, setIsAddFriendsModalOpen] = useState(false);
  const { show } = useNotification();

  useEffect(() => {
    Http.getFromServer("/friends/requests")
      .then((res) => {
        setRequests(res.data.pendingRequests || [])
        setFriends(res.data.friends || [])
      })
  }, [])

  const filteredFriends = useMemo(() => {
    return friends
  },
    [searchQuery, friends]);

  const filteredRequests = useMemo(() => {
    return requests;
  }, [searchQuery, requests]);


  const handleChat = (friend: Friend) => {
    console.log("Starting chat with:", friend.name);
    // TODO: Implement chat functionality
  };

  const handleViewProfile = (friend: Friend) => {
    console.log("Viewing profile of:", friend.name);
    // TODO: Implement profile view functionality
  };

  const handleAcceptRequest = (requestId: string) => {
    console.log("Accepting friend request:", requestId);
    Http.postToServer("/friends/handle-request", {
      requestId: requestId,
      action: "accept"
    }).then((res) => {
      show({
        title: "Success",
        description: res.data.message || "",
        color: "green",
        duration: 5000
      })
    })
      .catch(err => {
        show({
          title: "Error",
          description: err.response.data.error,
          color: "red",
          duration: 5000
        })
      })
  };

  const handleDeclineRequest = (requestId: string) => {
    console.log("Declining friend request:", requestId);
    // TODO: Implement decline friend request functionality
  };

  const handleFriendAdded = () => {
    // Refresh friends and requests data
    Http.getFromServer("/friends/requests")
      .then((res) => {
        setRequests(res.data.pendingRequests || []);
        setFriends(res.data.friends || []);
      })
      .catch(err => {
        console.error("Error refreshing friends data:", err);
      });
  };

  return (
    <div className="w-80 bg-white rounded-2xl shadow-lg border border-gray-200 h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Friends</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Add Friends Button */}
        <div className="mb-4">
          <button 
            onClick={() => setIsAddFriendsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Friends
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === 'friends'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Friends ({friends.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 relative ${activeTab === 'requests'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Requests ({requests.length})
            {requests.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {requests.length}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder={activeTab === 'friends' ? "Search friends..." : "Search requests..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Filter Toggle - Only show for friends tab */}
        {activeTab === 'friends' && (
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => setShowOnlineOnly(!showOnlineOnly)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${showOnlineOnly
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <div className={`w-2 h-2 rounded-full ${showOnlineOnly ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              Online only
            </button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'friends' ? (
          // Friends List
          filteredFriends.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-sm">
                {searchQuery ? "No friends found" : "No friends online"}
              </p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {filteredFriends.map((friend) => (
                <FriendItem
                  key={friend._id}
                  friend={friend}
                  onChat={handleChat}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          )
        ) : (
          // Friend Requests
          filteredRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm">
                {searchQuery ? "No requests found" : "No pending requests"}
              </p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {filteredRequests.map((request) => (
                <div key={request.creatorId._id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200 group">
                  {/* Avatar */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {request.avatar ? (
                      <img
                        src={request.avatar}
                        alt={request.creatorId.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      request.creatorId.name.charAt(0).toUpperCase()
                    )}
                  </div>

                  {/* Request Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">
                      {request.creatorId.email}
                    </h4>
                    <p className="text-gray-500 text-xs truncate">
                      @{request.creatorId.name}
                    </p>
                    {request.mutualFriends && request.mutualFriends > 0 && (
                      <p className="text-gray-400 text-xs">
                        {request.mutualFriends} mutual friend{request.mutualFriends > 1 ? 's' : ''}
                      </p>
                    )}
                    <p className="text-gray-400 text-xs">
                      {request.sentAt}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => handleAcceptRequest(request._id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                      title="Accept request"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeclineRequest(request.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Decline request"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Add Friends Modal */}
      <AddFriendsModal
        isOpen={isAddFriendsModalOpen}
        onClose={() => setIsAddFriendsModalOpen(false)}
        onFriendAdded={handleFriendAdded}
      />
    </div>
  );
};

export default FriendsPanel;
