import React from "react";

interface PostCardProps {
  username: string;
  avatarUrl?: string;
  timestamp: string; // use string for dates (your rule)
  content: string;
  imageUrl?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  username,
  avatarUrl,
  timestamp,
  content,
  imageUrl,
}) => {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow max-w-xl w-full mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=" + username}
          alt={username}
          className="w-11 h-11 rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
        />
        <div>
          <p className="font-semibold text-neutral-800 dark:text-neutral-100">{username}</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{timestamp}</p>
        </div>
      </div>

      {/* Content */}
      <p className="text-neutral-800 dark:text-neutral-100 mb-3 whitespace-pre-line">
        {content}
      </p>

      {/* Optional Image */}
      {imageUrl && (
        <div className="mb-3">
          <img
            src={imageUrl}
            alt="Post content"
            className="rounded-lg max-h-[450px] w-full object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 pt-2 text-sm text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-3">
        <button className="hover:text-blue-500 transition-colors">👍 Like</button>
        <button className="hover:text-blue-500 transition-colors">💬 Comment</button>
      </div>
    </div>
  );
};

export default PostCard;

