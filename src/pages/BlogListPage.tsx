import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getPosts } from '../utils/posts';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const POSTS_PER_PAGE = 6;

const BlogPostCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col animate-pulse border border-gray-200">
    <div className="w-full h-48 bg-gray-300"></div>
    <div className="p-6 flex-grow flex flex-col">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="space-y-2 flex-grow">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);

const BlogListPage: React.FC = () => {
  const allPosts = getPosts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const activeTag = searchParams.get('tag');

  useEffect(() => {
    // Reset to the first page whenever the tag filter changes
    setCurrentPage(1);
  }, [activeTag,searchQuery]);

  // Simulate loading to show skeleton
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Short delay
    return () => clearTimeout(timer);
  }, [currentPage, activeTag, searchQuery]);

  // Get all unique tags from all posts
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    allPosts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allPosts]);

  const filteredPosts = React.useMemo(() => {
      let posts = allPosts;

    // Filter by tag first
    if (activeTag) {
      posts = posts.filter(post => post.tags?.includes(activeTag));
    }
    // Then filter by search query
    if (searchQuery.trim() !== '') {
      const lowercasedQuery = searchQuery.toLowerCase();
      posts = posts.filter(
        post =>
          post.title.toLowerCase().includes(lowercasedQuery) ||
          post.excerpt.toLowerCase().includes(lowercasedQuery)
      );
    }

    return posts;
  }, [allPosts, activeTag, searchQuery]);
    

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleTagClick = (tag: string | null) => {
    if (tag) {
      setSearchParams({ tag });
    } else {
      // Clear the tag from the URL
      setSearchParams({});
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <Header />
      <main className="pt-20 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Our Blog</h1>
            <p className="mt-4 text-xl text-gray-600">
              Insights on wealth management, market trends, and investment strategies.
            </p>
          </div>
          {/* Search Bar Section */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search posts by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Tag Filter Section */}
          <div className="mb-12 flex flex-wrap justify-center items-center gap-2">
            <button
              onClick={() => handleTagClick(null)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors shadow-sm ${
                !activeTag
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Posts
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors shadow-sm ${
                  activeTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Blog Post Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
                <BlogPostCardSkeleton key={index} />
              ))
            ) : paginatedPosts.length > 0 ? (
              paginatedPosts.map((post) => (
                <Link to={`/blogs/${post.slug}`} key={post.slug} className="block group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-xl">
                    {post.imageUrl && (
                      <img
                        className="w-full h-48 object-cover"
                        src={post.imageUrl}
                        alt={`Featured image for ${post.title}`}
                        loading="lazy"
                      />
                    )}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        {post.tags && post.tags.length > 0 && (
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                            {post.tags[0]}
                          </span>
                        )}
                        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h2>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-3 text-center py-12">
                <h3 className="text-2xl font-semibold text-gray-700">No posts found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogListPage;