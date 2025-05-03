import axios from "axios";
import { User, Post, Comment } from "./types";

const BASE_URL = "http://20.244.56.144/evaluation-service";

export const getUsers = async (token: string): Promise<Record<string, string>> => {
  const res = await axios.get(`${BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.users;
};

export const getUserPosts = async (userId: string, token: string): Promise<Post[]> => {
  const res = await axios.get(`${BASE_URL}/users/${userId}/posts`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.posts;
};

export const getPostComments = async (postId: number, token: string): Promise<Comment[]> => {
  const res = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.comments;
}; 