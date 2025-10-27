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
        posts.map(post => {
          const author = post.authorId;
          return (
            <PostCard 
              key={post._id}
              content={post.text} 
              timestamp={post.created_at.toString()}
              authorName={author!.name}
              authorUsername={author.email}
              imageUrl=""
              likes={Math.floor(Math.random() * 50)}
              comments={Math.floor(Math.random() * 20)}
              isLiked={Math.random() > 0.7}
            />
          );
        })
      }
    </div>
  )
}

export default PostsContainer
