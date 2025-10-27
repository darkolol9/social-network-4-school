import { useState } from "react";

interface NewPostFormProps {
  onSubmit?: (text: string) => void;
}

const NewPostForm = ({ onSubmit }: NewPostFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    onSubmit?.(text.trim()); // call callback if exists
    setText(""); // clear input
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white dark:bg-neutral-900 rounded-xl shadow-md p-4 border border-neutral-200 dark:border-neutral-700"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        className="
          w-full min-h-[80px] resize-none
          bg-transparent outline-none text-neutral-900 dark:text-white
          placeholder-neutral-400 dark:placeholder-neutral-600
        "
      />

      <div className="flex justify-end mt-3">
        <button
          type="submit"
          className="
            px-4 py-2 rounded-lg font-medium
            bg-green-600 hover:bg-green-700
            text-white transition-all
          "
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default NewPostForm;

