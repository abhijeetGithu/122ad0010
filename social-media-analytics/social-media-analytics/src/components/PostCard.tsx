import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { Post } from "../types";

interface PostCardProps {
  post: Post;
  commentCount?: number;
}

const PostCard: React.FC<PostCardProps> = ({ post, commentCount }) => {
  const imageUrl = `https://picsum.photos/seed/post${post.id}/80/80`;
  return (
    <Card sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Avatar src={imageUrl} sx={{ width: 80, height: 80, m: 2 }} />
      <CardContent>
        <Typography variant="body1">{post.content}</Typography>
        {commentCount !== undefined && (
          <Typography color="text.secondary">Comments: {commentCount}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard; 