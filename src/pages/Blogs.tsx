import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getPosts, Post } from '../utils/posts';

const Blogs: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Data is now loaded synchronously, so we can simplify this.
    // We use a try/catch just in case, but errors should be caught during load.
    try {
      const fetchedPosts = getPosts();
      setPosts(fetchedPosts);
    } catch (e) {
      console.error("Failed to fetch posts:", e);
      setError("Failed to load blog posts. Please try again later.");
    }
    setLoading(false); // Instantly finish loading
  }, []);

  // Filter posts based on the search query.
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <main className="pt-20 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600">
              Insights on wealth management, market trends, and investment strategies.
            </p>
          </div>

          <div className="mt-8 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search posts by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
            />
          </div>

          {loading ? (
            <p className="text-center mt-12">Loading posts...</p>
          ) : error ? (
            <p className="text-center mt-12 text-red-500 font-semibold">{error}</p>
          ) : posts.length === 0 ? (
            <p className="text-center mt-12 text-gray-500">No blog posts found. Check the console for errors.</p>
          ) : filteredPosts.length === 0 ? (
            <p className="text-center mt-12 text-gray-500">No posts match your search.</p>
          ) : (
            <div className="mt-12 space-y-8">
              {filteredPosts.map((post) => (
                <div key={post.slug} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <h2 className="text-2xl font-semibold text-blue-900 mb-2">
                    <Link to={`/blogs/${post.slug}`} className="hover:text-yellow-600 transition-colors">{post.title}</Link>
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Posted on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} by {post.author}
                  </p>
                  <p className="text-gray-700 mb-4">{post.excerpt}</p>
                  <Link to={`/blogs/${post.slug}`} className="font-semibold text-yellow-600 hover:text-yellow-700 transition-colors">
                    Read More &rarr;
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/" className="text-blue-600 hover:underline">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blogs;