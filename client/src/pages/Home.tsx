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
      <div className=" flex flex-col items-center flex-1 min-h-full">

        <div id="post-creation-form-sticky" className="w-full flex items-center justify-center mb-2">
          <NewPostForm />
        </div>


        <PostsContainer posts={feedPosts} />

      </div>
    </Layout>
  )
}

export default Home
