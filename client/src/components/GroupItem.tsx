interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isJoined?: boolean;
  category?: string;
  lastActivity?: string;
  avatar?: string;
}

interface GroupItemProps {
  group: Group;
  onJoin?: (group: Group) => void;
  onLeave?: (group: Group) => void;
  onViewGroup?: (group: Group) => void;
}

const GroupItem = ({ group, onJoin, onLeave, onViewGroup }: GroupItemProps) => {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200 group">
      {/* Group Avatar */}
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
          {group.avatar ? (
            <img 
              src={group.avatar} 
              alt={group.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            group.name.charAt(0).toUpperCase()
          )}
        </div>
        {group.isJoined && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>

      {/* Group Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-sm truncate">
          {group.name}
        </h4>
        <p className="text-gray-500 text-xs truncate mb-1">
          {group.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{group.memberCount} members</span>
          {group.category && (
            <>
              <span>•</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                {group.category}
              </span>
            </>
          )}
        </div>
        {group.lastActivity && (
          <p className="text-gray-400 text-xs mt-1">
            Last activity {group.lastActivity}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {group.isJoined ? (
          <button
            onClick={() => onLeave?.(group)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Leave group"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => onJoin?.(group)}
            className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors duration-200"
            title="Join group"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        )}
        
        <button
          onClick={() => onViewGroup?.(group)}
          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          title="View group"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GroupItem;