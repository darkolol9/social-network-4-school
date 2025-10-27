interface Friend {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  lastSeen?: string;
}

interface FriendItemProps {
  friend: Friend;
  onChat?: (friend: Friend) => void;
  onViewProfile?: (friend: Friend) => void;
}

const FriendItem = ({ friend, onChat, onViewProfile }: FriendItemProps) => {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200 group">
      {/* Avatar */}
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
          {friend.avatar ? (
            <img 
              src={friend.avatar} 
              alt={friend.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            friend.name.charAt(0).toUpperCase()
          )}
        </div>
        {(
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>

      {/* Friend Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-sm truncate">
          {friend.name}
        </h4>
        <p className="text-gray-500 text-xs truncate">
          @{friend.username}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => onChat?.(friend)}
          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          title="Start chat"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        <button
          onClick={() => onViewProfile?.(friend)}
          className="p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-colors duration-200"
          title="View profile"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FriendItem;
