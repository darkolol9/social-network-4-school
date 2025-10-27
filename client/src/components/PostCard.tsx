import React, { useState } from "react";

interface PostCardProps {
  authorName: string;
  authorUsername: string;
  timestamp: string; // use string for dates (your rule)
  content: string;
  imageUrl?: string;
  likes?: number;
  comments?: number;
  isLiked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  authorName,
  authorUsername,
  timestamp,
  content,
  imageUrl,
  likes = 0,
  comments = 0,
  isLiked = false,
  onLike,
  onComment,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 max-w-2xl w-full mx-auto hover:scale-[1.01] hover:border-gray-300">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg border-2 border-gray-200 shadow-sm">
            {authorName.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-900 text-lg">{authorName}</p>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
              Verified
            </span>
          </div>
          <p className="text-sm text-gray-500">@{authorUsername} • {formatTimestamp(timestamp)}</p>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded-full">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-900 text-base leading-relaxed whitespace-pre-line">
          {content}
        </p>
      </div>

      {/* Optional Image */}
      {imageUrl && (
        <div className="mb-4 rounded-xl overflow-hidden bg-gray-100">
          {isImageLoading && (
            <div className="w-full h-64 bg-gray-200 animate-pulse flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <img
            src={imageUrl}
            alt="Post content"
            className={`w-full max-h-[500px] object-cover transition-opacity duration-300 ${
              isImageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsImageLoading(false)}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-6">
          <button 
            onClick={onLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
              isLiked 
                ? 'bg-red-100 text-red-600' 
                : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <svg className={`w-5 h-5 transition-transform duration-200 ${isLiked ? 'scale-110' : ''}`} fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-medium">{likes}</span>
          </button>
          
          <button 
            onClick={onComment}
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 text-gray-500 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="font-medium">{comments}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

