import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPostBySlug, Post } from '../utils/posts';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, User } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      try {
        const fetchedPost = getPostBySlug(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          // Post with this slug not found
          setPost(null);
        }
      } catch (e) {
        console.error(`Failed to fetch post with slug "${slug}":`, e);
        setError("Failed to load the blog post.");
      }
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main className="pt-20 bg-gray-50 min-h-screen flex items-center justify-center">
          <p className="text-center text-red-500 font-semibold">{error}</p>
        </main>
        <Footer />
      </>
    );
  }

  // After the loading and error checks, if `post` is still null, it means
  // the post was not found. We can safely show a 404 page.
  if (!post) {
    return (
      <>
        <Header />
        <main className="pt-20 bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600">404 - Post Not Found</h1>
            <p className="text-gray-600 mt-4">The blog post you are looking for does not exist.</p>
            <Link to="/blogs" className="mt-6 inline-block text-blue-600 hover:underline">
              &larr; Back to All Blogs
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // At this point, TypeScript knows that `post` is not null, so we can safely access its properties.
  return (
    <>
      <Header />
      <main className="pt-20 bg-gray-50">
        <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <article className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8 border-b pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>By {post.author}</span>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >{post.content}</ReactMarkdown>
            </div>
          </article>

          <div className="text-center mt-12">
            <Link to="/blogs" className="text-blue-600 hover:underline">
              &larr; Back to All Blogs
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPostPage;
