'use client'

import { BlogPost } from '@/app/types/blog';
import { deleteBlogPost, updateBlogPost } from '@/app/actions/blog';

export default function BlogPostList({ posts }: { posts: BlogPost[] }) {
  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      await deleteBlogPost(id);
    }
  }

  async function handleTogglePublish(post: BlogPost) {
    await updateBlogPost(post.id!, {
      published: !post.published
    });
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-500">
            Created: {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => handleTogglePublish(post)}
              className={`px-3 py-1 rounded text-sm ${post.published
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
                }`}
            >
              {post.published ? 'Published' : 'Draft'}
            </button>
            <button
              onClick={() => handleDelete(post.id!)}
              className="px-3 py-1 rounded text-sm bg-red-100 text-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 