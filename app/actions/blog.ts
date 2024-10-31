'use server'

import { db } from '../lib/firebase/config';
import { Timestamp } from 'firebase-admin/firestore';
import { BlogPost } from '../types/blog';
import { revalidatePath } from 'next/cache';

export async function createBlogPost(data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await db.collection('posts').add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    revalidatePath('/blog');
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating blog post:', error);
    return { success: false, error: 'Failed to create blog post' };
  }
}


export async function getBlogPosts() {
  try {
    const snapshot = await db.collection('posts').orderBy('createdAt', 'desc').get();
    const posts = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Safely convert Firestore Timestamps
        createdAt: data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString(),
        updatedAt: data.updatedAt instanceof Timestamp
          ? data.updatedAt.toDate().toISOString()
          : new Date().toISOString(),
      };
    }) as BlogPost[];

    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>) {
  try {
    await db.collection('posts').doc(id).update({
      ...data,
      updatedAt: new Date(),
    });

    revalidatePath('/blog');
    return { success: true };
  } catch (error) {
    console.error('Error updating blog post:', error);
    return { success: false, error: 'Failed to update blog post' };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await db.collection('posts').doc(id).delete();
    revalidatePath('/blog');
    return { success: true };
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return { success: false, error: 'Failed to delete blog post' };
  }
} 