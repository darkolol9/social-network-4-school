import { useState } from "react";
import { Http } from "../utils/Http";
import { useNotification } from "../providers/NotificationProvider";

interface NewPostFormProps {
  onSubmit?: (text: string) => void;
}

const NewPostForm = ({ onSubmit }: NewPostFormProps) => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { show } = useNotification();

  const maxLength = 500;
  const remainingChars = maxLength - text.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);

    Http.postToServer("/post/create", { text })
      .then(res => {
        show({
          title: "Success",
          description: "Post created successfully",
          color: "green",
          duration: 5000
        });
        onSubmit?.(text.trim());
        setText("");
      })
      .catch(err => {
        show({
          title: "Error",
          description: (err.response?.data?.error || "Something went wrong"),
          color: "red",
          duration: 5000
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setText(value);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">What's on your mind?</h3>
        </div>

        {/* Textarea */}
        <div className="relative mb-6">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Share your thoughts, ideas, or experiences..."
            className="
              w-full min-h-[120px] max-h-[300px] resize-none
              bg-white border border-gray-300 rounded-xl p-4
              text-gray-900 placeholder-gray-500 text-base
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition-all duration-200
            "
            disabled={isSubmitting}
          />
          
          {/* Character counter */}
          <div className="absolute bottom-4 right-4 text-sm text-gray-400">
            <span className={remainingChars < 50 ? 'text-orange-500' : remainingChars < 20 ? 'text-red-500' : ''}>
              {remainingChars}
            </span>
            <span className="text-gray-300">/{maxLength}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Photo</span>
            </button>
            
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12h6m-6 4h6" />
              </svg>
              <span className="text-sm">Poll</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={!text.trim() || isSubmitting || text.length > maxLength}
            className="
              px-8 py-3 rounded-xl font-semibold text-white text-base
              bg-gradient-to-r from-blue-500 to-purple-600
              hover:from-blue-600 hover:to-purple-700
              disabled:from-gray-300 disabled:to-gray-400
              disabled:cursor-not-allowed
              transition-all duration-200 transform hover:scale-105
              disabled:hover:scale-100
              flex items-center gap-2 shadow-lg
            "
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Post
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;

