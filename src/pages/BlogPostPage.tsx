import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Helmet } from 'react-helmet-async';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPostBySlug, Post } from '../utils/posts';

import { Calendar, User, Tag, Clock } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC<{ headings: Heading[]; activeId: string }> = ({ headings, activeId }) => {
  if (headings.length === 0) return null;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-primary/10">
      <h3 className="text-base font-bold text-primary mb-4">On this page</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={`${heading.level === 3 ? 'ml-4' : ''}`}>
            <a
              href={`#${heading.id}`}
              className={`block text-sm transition-colors duration-200 ${
                activeId === heading.id
                  ? 'text-accent font-semibold'
                  : 'text-primary/70 hover:text-primary'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const BlogPostSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-pulse">
    <div className="lg:grid lg:grid-cols-12 lg:gap-12 ">
      <article className="lg:col-span-9 bg-white p-8 lg:p-12 rounded-xl shadow-xl border border-primary/10">
        {/* Title */}
        <div className="h-10 bg-primary/10 rounded w-3/4 mb-6"></div>
        {/* Meta */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-5 bg-primary/10 rounded w-1/4"></div>
          <div className="h-5 bg-primary/10 rounded w-1/4"></div>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b pb-4">
          <div className="h-6 w-20 bg-primary/10 rounded-full"></div>
          <div className="h-6 w-24 bg-primary/10 rounded-full"></div>
          <div className="h-6 w-16 bg-primary/10 rounded-full"></div>
        </div>
        {/* Image placeholder */}
        <div className="w-full h-96 bg-primary/10 rounded-lg mb-8"></div>
        {/* Content */}
        <div className="space-y-4">
          <div className="h-4 bg-primary/5 rounded w-full"></div>
          <div className="h-4 bg-primary/5 rounded w-full"></div>
          <div className="h-4 bg-primary/5 rounded w-5/6"></div>
          <div className="h-4 bg-primary/5 rounded w-full mt-6"></div>
          <div className="h-4 bg-primary/5 rounded w-full"></div>
          <div className="h-4 bg-primary/5 rounded w-4/5"></div>
          <div className="h-4 bg-primary/5 rounded w-full mt-6"></div>
          <div className="h-4 bg-primary/5 rounded w-2/3"></div>
        </div>
      </article>
      <aside className="hidden lg:block lg:col-span-3">
        <div className="p-6 bg-white rounded-xl shadow-lg border border-primary/10">
          <div className="h-5 bg-primary/10 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-primary/5 rounded w-3/4"></div>
            <div className="h-4 bg-primary/5 rounded w-full"></div>
            <div className="h-4 bg-primary/5 rounded w-5/6 ml-4"></div>
            <div className="h-4 bg-primary/5 rounded w-1/2"></div>
          </div>
        </div>
      </aside>
    </div>
  </div>
);

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const slugify = (text: string) =>
    text.toString().toLowerCase().trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (slug) {
        try {
          const fetchedPost = getPostBySlug(slug);
          setPost(fetchedPost || null);
        } catch (e) {
          console.error(`Failed to fetch post with slug "${slug}":`, e);
          setError("Failed to load the blog post.");
        }
      }
      setLoading(false);
    }, 500); // Simulate loading to show skeleton

    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    const headingRegex = /^(##|###)\s(.+)/gm;
    const matches = Array.from(post.content.matchAll(headingRegex));
    const extractedHeadings: Heading[] = matches.map(match => {
      const level = match[1].length;
      const text = match[2].trim();
      const id = slugify(text);
      return { id, text, level };
    });
    setHeadings(extractedHeadings);
  }, [post]);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      let current = '';
      headings.forEach(h => {
        const element = document.getElementById(h.id);
        // 120px offset to account for sticky header and some buffer
        if (element && element.getBoundingClientRect().top < 120) {
          current = h.id;
        }
      });
      setActiveHeading(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial active heading

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (loading) {
    return (
      <main className="pt-20 bg-white min-h-screen"><BlogPostSkeleton /></main>
    );
  }

  if (error) {
    return (
      <>
        <main className="pt-20 bg-white min-h-screen flex items-center justify-center">
          <p className="text-center text-red-500 font-semibold">{error}</p>
        </main>
       
      </>
    );
  }

  // After the loading and error checks, if `post` is still null, it means
  // the post was not found. We can safely show a 404 page.
  if (!post) {
    return (
      <>
        <Helmet>
          <title>404 - Post Not Found | SJ Capital Investaa</title>
          <meta name="description" content="The blog post you are looking for could not be found." />
        </Helmet>

        <main className="pt-20 bg-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600">404 - Post Not Found</h1>
            <p className="text-primary/80 mt-4">The blog post you are looking for does not exist.</p>
            <Link to="/blogs" className="mt-6 inline-block text-accent hover:underline">
              &larr; Back to All Blogs
            </Link>
          </div>
        </main>
        
      </>
    );
  }

  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 225;
    const noOfWords = text.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    return Math.ceil(minutes);
  };

  // At this point, TypeScript knows that `post` is not null, so we can safely access its properties.
  return (
    <>
      <Helmet>
        <title>{`${post.title} | SJ Capital Investaa`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://www.sjcapital.in/blogs/${post.slug}`} />
        <meta property="og:title" content={`${post.title} | SJ Capital Investaa`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://www.sjcapital.in/blogs/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        {post.tags.map(tag => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
        {/* Add JSON-LD Structured Data for better SEO */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": "${post.title}",
              "description": "${post.excerpt}",
              "datePublished": "${post.date}",
              "author": {
                "@type": "Person",
                "name": "${post.author}"
              }
            }
          `}
        </script>
      </Helmet>
      <main className="pt-20 bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <article className="lg:col-span-9 bg-white p-8 lg:p-12 rounded-xl shadow-xl border border-primary/10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 font-sans">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-primary/60 mb-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>By {post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{calculateReadingTime(post.content)} min read</span>
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-primary/10 pb-4">
                  <Tag className="h-4 w-4 text-primary/60" />
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/blogs?tag=${encodeURIComponent(tag)}`}
                      className="bg-accent/20 text-accent-dark text-xs font-medium px-2.5 py-0.5 rounded-full hover:bg-accent/30 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              {post.imageUrl && (
                <div className="my-8">
                  <img
                    className="w-full rounded-lg shadow-lg object-cover"
                    style={{ maxHeight: '500px' }}
                    src={post.imageUrl}
                    alt={post.title}
                  />
                </div>
              )}

              <div
                className="
                  prose prose-lg max-w-none
                  prose-p:font-serif prose-p:leading-relaxed prose-p:text-primary/90 prose-p:mb-6
                  prose-headings:font-sans prose-headings:font-bold prose-headings:text-primary prose-headings:scroll-mt-24
                  prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                  prose-li:font-serif prose-li:my-3
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:font-semibold
                  prose-blockquote:border-l-4 prose-blockquote:border-accent/50 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-primary/70
                  prose-hr:my-8 prose-hr:border-primary/10
                  prose-code:bg-primary/5 prose-code:rounded-md prose-code:px-1.5 prose-code:py-1 prose-code:font-mono
                "
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h2: ({ node, ...props }) => <h2 id={slugify(String(props.children))} {...props} />,
                    h3: ({ node, ...props }) => <h3 id={slugify(String(props.children))} {...props} />,
                    code(props) {
                      const {children, className, ...rest} = props;
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >{post.content}</ReactMarkdown>
              </div>
            </article>

            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <TableOfContents headings={headings} activeId={activeHeading} />
              </div>
            </aside>
          </div>

          <div className="text-center mt-12">
            <Link to="/blogs" className="text-accent hover:underline">
              &larr; Back to All Blogs
            </Link>
          </div>
        </div>
      </main>
      
    </>
  );
};

export default BlogPostPage;
