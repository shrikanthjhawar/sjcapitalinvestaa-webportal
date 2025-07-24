import fm from 'front-matter';

export interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
}

// This function uses Vite's eager import.meta.glob to get all markdown files
// from the /src/posts/ directory at build time.
function loadPosts(): Post[] {  
  try {
    // Using `eager: true` makes Vite import the files directly at build time.
    // Changed to a relative path for better reliability across environments.
    // This looks for .md files in the 'posts' directory, which is one level
    // up from this 'utils' directory.
    const postModules = import.meta.glob('../posts/*.md', { as: 'raw', eager: true });
  
    const posts: Post[] = [];
    for (const path in postModules) {
      const rawContent = postModules[path];
      const { attributes, body } = fm<Omit<Post, 'content'>>(rawContent);
  
      // Add validation to ensure required fields exist, preventing crashes.
      if (!attributes.slug || !attributes.title || !attributes.date || !attributes.excerpt) {
        console.error(
          `[Blog Post Error] Post at path "${path}" is missing required frontmatter. Please check for slug, title, date, and excerpt.`
        );
        continue; // Skip this post to avoid crashing the app.
      }
  
      posts.push({
        slug: attributes.slug,
        title: attributes.title,
        date: attributes.date,
        author: attributes.author || 'SJ Capital Investaa', // Provide a default author
        excerpt: attributes.excerpt,
        content: body,
      });
    }
    // Sort posts by date in descending order (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (e) {
    console.error("A critical error occurred while loading blog posts. Check your .md files for syntax errors in the frontmatter.", e);
    return []; // Return an empty array to prevent the entire site from crashing.
  }
}

// Cache the posts so we don't have to re-process them on every call.
const allPosts = loadPosts();

// The functions can now be fully synchronous.
export function getPosts(): Post[] {
  return allPosts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find(p => p.slug === slug);
}
