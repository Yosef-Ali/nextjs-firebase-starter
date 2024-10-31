'use client'

import { createBlogPost } from '@/app/actions/blog';
import { useState } from 'react';

export default function BlogPostForm() {
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const published = formData.get('published') === 'on';

    const result = await createBlogPost({ title, content, published });
    
    if (result.success) {
      setMessage('Post created successfully!');
      (document.getElementById('blogForm') as HTMLFormElement).reset();
    } else {
      setMessage('Error creating post');
    }
  }

  return (
    <form id="blogForm" action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block mb-2">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label htmlFor="content" className="block mb-2">Content</label>
        <textarea
          id="content"
          name="content"
          required
          rows={6}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="published" />
          <span>Publish immediately</span>
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Post
      </button>

      {message && (
        <p className={message.includes('Error') ? 'text-red-500' : 'text-green-500'}>
          {message}
        </p>
      )}
    </form>
  );
} 