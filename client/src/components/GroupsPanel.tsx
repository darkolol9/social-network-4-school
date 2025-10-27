import { useState, useMemo } from "react";
import GroupItem from "./GroupItem";

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

// Mock data for groups
const mockGroups: Group[] = [
  {
    id: "1",
    name: "Tech Enthusiasts",
    description: "Discussing the latest in technology and innovation",
    memberCount: 1247,
    isJoined: true,
    category: "Technology",
    lastActivity: "2 hours ago",
  },
  {
    id: "2",
    name: "Photography Club",
    description: "Share your best shots and learn from others",
    memberCount: 892,
    isJoined: false,
    category: "Arts",
    lastActivity: "1 day ago",
    avatar: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=150&h=150&fit=crop&crop=center",
  },
  {
    id: "3",
    name: "Fitness Warriors",
    description: "Motivation and tips for staying fit and healthy",
    memberCount: 2156,
    isJoined: true,
    category: "Health",
    lastActivity: "30 minutes ago",
  },
  {
    id: "4",
    name: "Book Lovers",
    description: "Share book recommendations and discuss literature",
    memberCount: 743,
    isJoined: false,
    category: "Education",
    lastActivity: "3 hours ago",
  },
  {
    id: "5",
    name: "Cooking Masters",
    description: "Recipes, techniques, and culinary adventures",
    memberCount: 1834,
    isJoined: true,
    category: "Lifestyle",
    lastActivity: "1 hour ago",
  },
  {
    id: "6",
    name: "Travel Explorers",
    description: "Share travel experiences and discover new destinations",
    memberCount: 1456,
    isJoined: false,
    category: "Travel",
    lastActivity: "4 hours ago",
    avatar: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=150&h=150&fit=crop&crop=center",
  },
  {
    id: "7",
    name: "Music Makers",
    description: "Musicians, producers, and music enthusiasts unite",
    memberCount: 967,
    isJoined: false,
    category: "Music",
    lastActivity: "6 hours ago",
  },
  {
    id: "8",
    name: "Gaming Squad",
    description: "Gaming discussions, tips, and multiplayer sessions",
    memberCount: 3124,
    isJoined: true,
    category: "Gaming",
    lastActivity: "15 minutes ago",
  },
  {
    id: "9",
    name: "Art & Design",
    description: "Showcase your creative work and get feedback",
    memberCount: 1123,
    isJoined: false,
    category: "Arts",
    lastActivity: "2 days ago",
  },
  {
    id: "10",
    name: "Entrepreneurs",
    description: "Business ideas, networking, and startup discussions",
    memberCount: 1892,
    isJoined: true,
    category: "Business",
    lastActivity: "45 minutes ago",
  },
];

const GroupsPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showJoinedOnly, setShowJoinedOnly] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(mockGroups.map(group => group.category).filter(Boolean))];
    return ["all", ...cats];
  }, []);

  // Filter groups based on search query, category, and joined status
  const filteredGroups = useMemo(() => {
    return mockGroups.filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           group.category?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || group.category === selectedCategory;
      const matchesJoinedFilter = !showJoinedOnly || group.isJoined;
      return matchesSearch && matchesCategory && matchesJoinedFilter;
    });
  }, [searchQuery, selectedCategory, showJoinedOnly]);

  const joinedCount = mockGroups.filter(group => group.isJoined).length;

  const handleJoin = (group: Group) => {
    console.log("Joining group:", group.name);
    // TODO: Implement join group functionality
  };

  const handleLeave = (group: Group) => {
    console.log("Leaving group:", group.name);
    // TODO: Implement leave group functionality
  };

  const handleViewGroup = (group: Group) => {
    console.log("Viewing group:", group.name);
    // TODO: Implement view group functionality
  };

  return (
    <div className="w-80 bg-white rounded-2xl shadow-lg border border-gray-200 h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Groups</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{joinedCount} joined</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowJoinedOnly(!showJoinedOnly)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
              showJoinedOnly 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${showJoinedOnly ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            Joined only
          </button>
        </div>
      </div>

      {/* Groups List */}
      <div className="flex-1 overflow-y-auto">
        {filteredGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-sm">
              {searchQuery ? "No groups found" : "No groups available"}
            </p>
          </div>
        ) : (
          <div className="p-2">
            {filteredGroups.map((group) => (
              <GroupItem
                key={group.id}
                group={group}
                onJoin={handleJoin}
                onLeave={handleLeave}
                onViewGroup={handleViewGroup}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-200 font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Group
        </button>
      </div>
    </div>
  );
};

export default GroupsPanel;
