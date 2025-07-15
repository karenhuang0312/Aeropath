import { useState, useEffect, useRef } from 'react';
import { Post, CreatePostData, UpdatePostData } from '@/types';
import api from '@/lib/api';
import { toast } from 'sonner';

/**
 * Custom React hook for managing posts CRUD operations.
 * @returns {object} Posts state, CRUD methods, and loading states.
 */
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Post[]>('/posts');
      if (mounted.current) setPosts(response.data);
    } catch (error: any) {
      toast.error('Failed to fetch posts');
      setError('Failed to fetch posts');
      console.error('Error fetching posts:', error);
    } finally {
      if (mounted.current) setLoading(false);
    }
  };

  const createPost = async (data: CreatePostData) => {
    setCreating(true);
    setError(null);
    try {
      const response = await api.post<Post>('/posts', data);
      if (mounted.current) setPosts(prev => [response.data, ...prev]);
      toast.success('Post created successfully!');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to create post';
      toast.error(message);
      setError(message);
      throw error;
    } finally {
      if (mounted.current) setCreating(false);
    }
  };

  const updatePost = async (id: number, data: UpdatePostData) => {
    setUpdating(true);
    setError(null);
    try {
      const response = await api.put<Post>(`/posts/${id}`, data);
      if (mounted.current) setPosts(prev => prev.map(post => post.id === id ? response.data : post));
      toast.success('Post updated successfully!');
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to update post';
      toast.error(message);
      setError(message);
      throw error;
    } finally {
      if (mounted.current) setUpdating(false);
    }
  };

  const deletePost = async (id: number) => {
    setDeleting(true);
    setError(null);
    try {
      await api.delete(`/posts/${id}`);
      if (mounted.current) setPosts(prev => prev.filter(post => post.id !== id));
      toast.success('Post deleted successfully!');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to delete post';
      toast.error(message);
      setError(message);
      throw error;
    } finally {
      if (mounted.current) setDeleting(false);
    }
  };

  useEffect(() => {
    mounted.current = true;
    fetchPosts();
    return () => { mounted.current = false; };
  }, []);

  return {
    posts,
    loading,
    creating,
    updating,
    deleting,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
};
