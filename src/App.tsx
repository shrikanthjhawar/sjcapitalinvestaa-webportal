import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CalculatorsPage from './pages/CalculatorsPage';
import CalculatorDetailPage from './pages/CalculatorDetailPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import RiskProfilePage from './pages/RiskProfilePage';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import TermsOfServicePage from './pages/TermsOfServicePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    // By placing ScrollToTop here, it will be active on all pages
    // and reset the scroll position on every navigation.
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/calculators/:calculatorId" element={<CalculatorDetailPage />} />
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blogs/:slug" element={<BlogPostPage />} />
          <Route path="/risk-profile" element={<RiskProfilePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
