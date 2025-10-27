import type { Post } from "../types"
import PostCard from "./PostCard"

interface PostsContainerProps {
  posts: Post[]
}

const PostsContainer: React.FC<PostsContainerProps> = ({ posts }) => {
  return (
    <div id="posts-container" className="bg-purple-400 w-full flex flex-col gap-4 max-h-full">
      {
        posts.map(post => (
          <PostCard content={post.text} timestamp="" username="" avatarUrl="" imageUrl="" key={post._id} />))
      }
    </div>
  )
}

export default PostsContainer
