import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { User } from "../types";

interface UserCardProps {
  user: User;
  commentCount?: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, commentCount }) => {
  // Use a seeded random image for consistency
  const imageUrl = `https://picsum.photos/seed/user${user.id}/80/80`;
  return (
    <Card sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Avatar src={imageUrl} sx={{ width: 80, height: 80, m: 2 }} />
      <CardContent>
        <Typography variant="h6">{user.name}</Typography>
        {commentCount !== undefined && (
          <Typography color="text.secondary">Comments: {commentCount}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCard; 