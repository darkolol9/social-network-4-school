import { useEffect, useState } from "react";
import Layout from "../layouts/MainLayout"
import type { Post } from "../types";
import PostCard from "../components/PostCard";
import { Http } from "../utils/Http";
import PostsContainer from "../components/PostsContainer";
import NewPostForm from "../components/NewPostForm";
import Modal from "../components/Modal";
import FriendsPanel from "../components/FriendsPanel";

const Home = () => {

  const [feedPosts, setFeedPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPosts = () => {
    Http.getFromServer("/posts")
      .then(res => {
        setFeedPosts(res?.data?.posts);
        console.log({ posts: res?.data?.posts })
      })
      .catch(err => console.error(err));
  };

  const handlePostCreated = () => {
    setIsModalOpen(false);
    fetchPosts(); // Refresh the feed
  };

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <Layout hideNav={false}>
      <div className="w-full flex gap-6">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-2xl px-3 overflow-y-auto h-[calc(100vh-8rem)]">
            <PostsContainer posts={feedPosts} />
          </div>
        </div>

        {/* Friends Panel */}
        <div className="hidden lg:block">
          <FriendsPanel />
        </div>
      </div>
      
      {/* Sticky Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center group"
        aria-label="Create new post"
      >
        <svg 
          className="w-6 h-6 transition-transform duration-200 group-hover:rotate-90" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {/* Modal for creating new post */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Create New Post"
      >
        <NewPostForm onSubmit={handlePostCreated} />
      </Modal>
    </Layout>
  )
}

export default Home
