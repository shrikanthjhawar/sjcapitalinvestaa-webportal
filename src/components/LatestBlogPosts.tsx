import React from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../utils/posts';
import { Calendar, ArrowRight } from 'lucide-react';

const LatestBlogPosts: React.FC = () => {
  // Get all posts, sort by date descending, and take the first 3
  const latestPosts = getPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section id="latest-blogs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with our latest articles on market trends, investment strategies, and financial planning.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <Link to={`/blogs/${post.slug}`} key={post.slug} className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-xl border border-gray-200">
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <span className="font-semibold text-blue-600 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/blogs"
            className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPosts;