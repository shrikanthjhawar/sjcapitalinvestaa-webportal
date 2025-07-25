import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CalculatorsPage from './pages/CalculatorsPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import RiskProfilePage from './pages/RiskProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/calculators" element={<CalculatorsPage />} />
      <Route path="/blogs" element={<BlogListPage />} />
      <Route path="/blogs/:slug" element={<BlogPostPage />} />
      <Route path="/risk-profile" element={<RiskProfilePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
    </Routes>
  );
}

export default App;
