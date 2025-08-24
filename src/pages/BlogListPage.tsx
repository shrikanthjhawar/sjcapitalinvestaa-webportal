import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPosts } from '../utils/posts';
import { Calendar, ChevronLeft, ChevronRight, BookOpen, User, ArrowRight } from 'lucide-react';

const POSTS_PER_PAGE = 6;

const BlogPostCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden h-full flex flex-col animate-pulse border border-neutral-200">
    <div className="w-full h-56 bg-gradient-to-br from-neutral-100 to-neutral-200"></div>
    <div className="p-8 flex-grow flex flex-col">
      <div className="h-4 bg-neutral-200 rounded-full w-1/3 mb-4"></div>
      <div className="h-6 bg-neutral-300 rounded w-3/4 mb-4"></div>
      <div className="space-y-3 flex-grow">
        <div className="h-4 bg-neutral-200 rounded w-full"></div>
        <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
      </div>
      <div className="h-4 bg-neutral-200 rounded w-1/2 mt-6"></div>
    </div>
  </div>
);

const BlogListPage: React.FC = () => {
  const allPosts = getPosts();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const filteredPosts = allPosts;

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="pt-20 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        {/* Premium Blog Post Grid - Mobile Optimized */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {loading ? (
            Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <BlogPostCardSkeleton />
              </motion.div>
            ))
          ) : paginatedPosts.length > 0 ? (
            paginatedPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                variants={itemVariants}
              >
                <Link to={`/blogs/${post.slug}`} className="block group">
                  <article className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden h-full flex flex-col border border-neutral-200 hover:border-accent/30 hover:shadow-premium transition-all duration-500 transform hover:scale-105 active:scale-95 touch-manipulation">
                    {/* Featured Image */}
                    <div className="relative w-full h-40 sm:h-56 overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 lg:p-8 flex-grow flex flex-col">
                      {/* Meta Info */}
                      <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-500 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{post.author}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="font-heading text-lg sm:text-xl lg:text-2xl font-bold text-primary mb-3 sm:mb-4 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Read More */}
                      <div className="flex items-center text-accent font-semibold text-sm sm:text-base group-hover:text-accent-600 transition-colors mt-auto">
                        <span>Read More</span>
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <BookOpen className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-600 mb-2">No articles found</h3>
              <p className="text-neutral-500">We couldn't find any blog posts matching your criteria.</p>
            </div>
          )}
        </motion.div>

        {/* Enhanced Pagination Controls */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 flex items-center justify-center gap-4"
          >
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-primary border border-neutral-200 hover:border-accent/30 hover:shadow-lg disabled:hover:border-neutral-200 disabled:hover:shadow-none"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-accent text-primary shadow-glow'
                      : 'bg-white text-neutral-600 border border-neutral-200 hover:border-accent/30 hover:shadow-lg'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-primary border border-neutral-200 hover:border-accent/30 hover:shadow-lg disabled:hover:border-neutral-200 disabled:hover:shadow-none"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}

        {/* Enhanced Bottom CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center bg-premium-gradient rounded-3xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h3>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Get personalized investment advice and start building your wealth with our expert guidance.
            Book your free consultation today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('booking-contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-accent hover:bg-accent-600 text-primary px-10 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-glow"
            >
              Book Free Consultation
            </button>
            <Link
              to="/calculators"
              className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all duration-300"
            >
              Explore Investment Calculators
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogListPage;