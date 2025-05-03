import React, { useEffect, useState } from "react";
import { getUsers, getUserPosts, getPostComments } from "../api";
import { Post } from "../types";
import PostCard from "../components/PostCard";
import { Box, Typography, CircularProgress } from "@mui/material";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ2Mjc4NTQxLCJpYXQiOjE3NDYyNzgyNDEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImMwZjgyNGQzLWYwMGYtNDYwYS1iOGNlLThlMzNjMTk4OGM5MSIsInN1YiI6IjEyMmFkMDAxMEBpaWl0ay5hYy5pbiJ9LCJlbWFpbCI6IjEyMmFkMDAxMEBpaWl0ay5hYy5pbiIsIm5hbWUiOiJhYmhpamVldCBzaW5naCIsInJvbGxObyI6IjEyMmFkMDAxMCIsImFjY2Vzc0NvZGUiOiJiemJDbnoiLCJjbGllbnRJRCI6ImMwZjgyNGQzLWYwMGYtNDYwYS1iOGNlLThlMzNjMTk4OGM5MSIsImNsaWVudFNlY3JldCI6IkNiQlpDU3ZHY1hEbmFOVUsifQ.TKgnj4XhKPQDRM25ot5gefF6No3tDgNSzWxB6__Hd5M";

interface PostWithComments {
  post: Post;
  commentCount: number;
}

const FeedPage: React.FC = () => {
  const [feed, setFeed] = useState<PostWithComments[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    setLoading(true);
    const usersObj = await getUsers(TOKEN);
    const userIds = Object.keys(usersObj);
    let allPosts: Post[] = [];
    for (const userId of userIds) {
      const posts = await getUserPosts(userId, TOKEN);
      allPosts = allPosts.concat(posts);
    }
    allPosts.sort((a, b) => b.id - a.id); // Newest first
    const feedData: PostWithComments[] = [];
    for (const post of allPosts) {
      const comments = await getPostComments(post.id, TOKEN);
      feedData.push({ post, commentCount: comments.length });
    }
    setFeed(feedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchFeed();
    const interval = setInterval(fetchFeed, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h4" mb={2}>Feed</Typography>
      {loading ? <CircularProgress /> : feed.map(({ post, commentCount }) => (
        <PostCard key={post.id} post={post} commentCount={commentCount} />
      ))}
    </Box>
  );
};

export default FeedPage; 