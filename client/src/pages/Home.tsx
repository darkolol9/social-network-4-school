import { useEffect, useState } from "react";
import Layout from "../layouts/MainLayout"
import type { Post } from "../types";
import PostCard from "../components/PostCard";
import { Http } from "../utils/Http";
import PostsContainer from "../components/PostsContainer";
import NewPostForm from "../components/NewPostForm";

const Home = () => {

  const [feedPosts, setFeedPosts] = useState<Post[]>([]);


  useEffect(() => {
    Http.getFromServer("/posts")
      .then(res => {
        setFeedPosts(res?.data?.posts);
        console.log({ posts: res?.data?.posts })
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <Layout hideNav={false}>
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-2xl px-3 overflow-y-auto h-[calc(100vh-8rem)]">
          <PostsContainer posts={feedPosts} />
        </div>
      </div>
    </Layout>
  )
}

export default Home
