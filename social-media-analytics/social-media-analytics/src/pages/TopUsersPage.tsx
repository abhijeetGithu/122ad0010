import React, { useEffect, useState } from "react";
import { getUsers, getUserPosts, getPostComments } from "../api";
import { User } from "../types";
import UserCard from "../components/UserCard";
import { Box, Typography, CircularProgress } from "@mui/material";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ2Mjc4NTQxLCJpYXQiOjE3NDYyNzgyNDEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImMwZjgyNGQzLWYwMGYtNDYwYS1iOGNlLThlMzNjMTk4OGM5MSIsInN1YiI6IjEyMmFkMDAxMEBpaWl0ay5hYy5pbiJ9LCJlbWFpbCI6IjEyMmFkMDAxMEBpaWl0ay5hYy5pbiIsIm5hbWUiOiJhYmhpamVldCBzaW5naCIsInJvbGxObyI6IjEyMmFkMDAxMCIsImFjY2Vzc0NvZGUiOiJiemJDbnoiLCJjbGllbnRJRCI6ImMwZjgyNGQzLWYwMGYtNDYwYS1iOGNlLThlMzNjMTk4OGM5MSIsImNsaWVudFNlY3JldCI6IkNiQlpDU3ZHY1hEbmFOVUsifQ.TKgnj4XhKPQDRM25ot5gefF6No3tDgNSzWxB6__Hd5M";

const TopUsersPage: React.FC = () => {
  const [topUsers, setTopUsers] = useState<{ user: User; commentCount: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const usersObj = await getUsers(TOKEN);
      const userCommentCounts: { [key: string]: number } = {};
      const userList: User[] = Object.entries(usersObj).map(([id, name]) => ({ id, name }));

      for (const user of userList) {
        const posts = await getUserPosts(user.id, TOKEN);
        let commentCount = 0;
        for (const post of posts) {
          const comments = await getPostComments(post.id, TOKEN);
          commentCount += comments.length;
        }
        userCommentCounts[user.id] = commentCount;
      }

      const sorted = userList
        .map(user => ({ user, commentCount: userCommentCounts[user.id] }))
        .sort((a, b) => b.commentCount - a.commentCount)
        .slice(0, 5);
      setTopUsers(sorted);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Box p={2}>
      <Typography variant="h4" mb={2}>Top Users</Typography>
      {loading ? <CircularProgress /> : topUsers.map(({ user, commentCount }) => (
        <UserCard key={user.id} user={user} commentCount={commentCount} />
      ))}
    </Box>
  );
};

export default TopUsersPage; 