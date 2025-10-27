import type { Post } from "../types"
import PostCard from "./PostCard"

interface PostsContainerProps {
  posts: Post[]
}

const PostsContainer: React.FC<PostsContainerProps> = ({ posts }) => {
  return (
    <div
      id="posts-container"
      className="w-full flex flex-col gap-4"
    >
      {
        posts.map(post => (
          <PostCard content={post.text} timestamp="" username="" avatarUrl="" imageUrl="" key={post._id} />))
      }
    </div>
  )
}

export default PostsContainer
