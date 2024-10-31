import { getBlogPosts } from '@/app/actions/blog';
import { getSession } from '@/app/lib/firebase/auth';
import { redirect } from 'next/navigation';
import BlogPostForm from './BlogPostForm';
import BlogPostList from './BlogPostList';
import LogoutButton from '@/app/components/LogoutButton';

export default async function BlogAdmin() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const posts = await getBlogPosts();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog CMS</h1>
        <LogoutButton />
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
        <BlogPostForm />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">All Posts</h2>
        <BlogPostList posts={posts} />
      </div>
    </div>
  );
}