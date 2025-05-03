import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TopUsersPage from "./pages/TopUsersPage";
import TrendingPostsPage from "./pages/TrendingPostsPage";
import FeedPage from "./pages/FeedPage";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const App: React.FC = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Social Media Analytics
          </Typography>
          <Button color="inherit" component={Link} to="/">Top Users</Button>
          <Button color="inherit" component={Link} to="/trending">Trending Posts</Button>
          <Button color="inherit" component={Link} to="/feed">Feed</Button>
        </Toolbar>
      </AppBar>
      <Box mt={2}>
        <Routes>
          <Route path="/" element={<TopUsersPage />} />
          <Route path="/trending" element={<TrendingPostsPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default App;
