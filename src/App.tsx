import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Blogs from './pages/Blogs';
import BlogPostPage from './pages/BlogPostPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:slug" element={<BlogPostPage />} />
    </Routes>
  );
}

export default App;
