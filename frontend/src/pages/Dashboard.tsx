import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';
import { Plus, Edit, Trash2, LogOut, User } from 'lucide-react';
import { Post } from '@/types';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { posts, loading, createPost, updatePost, deletePost, error } = usePosts();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({ title: '', content: '', published: false });
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {}
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost(formData);
    setFormData({ title: '', content: '', published: false });
    setShowCreateForm(false);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({ title: post.title, content: post.content || '', published: post.published });
    setShowCreateForm(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      await updatePost(editingPost.id, formData);
      setEditingPost(null);
      setFormData({ title: '', content: '', published: false });
    }
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-5 w-5" />
                <span>{user?.username}</span>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Create/Edit Post Section */}
        <div className="mb-8">
          <Button onClick={() => { setShowCreateForm(true); setEditingPost(null); }} className="mb-6">
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Button>
          {(showCreateForm || editingPost) && (
            <Card className="mb-8">
              <CardContent>
                <form onSubmit={editingPost ? handleUpdate : handleCreate} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Input
                      id="content"
                      value={formData.content}
                      onChange={e => setFormData({ ...formData, content: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={e => setFormData({ ...formData, published: e.target.checked })}
                      id="published"
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit">{editingPost ? "Update" : "Create"}</Button>
                    <Button type="button" variant="outline" onClick={() => { setShowCreateForm(false); setEditingPost(null); }}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Posts Section */}
        <div className="grid gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
          </div>
          {loading ? (
            <div className="text-center py-8"><p className="text-gray-500">Loading posts...</p></div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8"><p className="text-gray-500">No posts yet.</p></div>
          ) : (
            <div className="space-y-4">
              {posts.filter(p => p.authorId === user?.id).map(post => (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle>
                      {post.title}
                      {post.published && <span className="ml-2 text-xs text-green-600">(Published)</span>}
                    </CardTitle>
                    <CardDescription>{post.content}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => handleEdit(post)}><Edit className="h-4 w-4 mr-1" />Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}><Trash2 className="h-4 w-4 mr-1" />Delete</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* All Posts Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">All Posts</h2>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8"><p className="text-gray-500">Loading...</p></div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">{error}</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8"><p className="text-gray-500">No posts found.</p></div>
            ) : (
              posts.map(post => (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle>
                      {post.title}
                      {post.published && <span className="ml-2 text-xs text-green-600">(Published)</span>}
                    </CardTitle>
                    <CardDescription>
                      by <span className="font-medium">{post.author.username}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{post.content}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
  <Button size="sm" onClick={() => handleEdit(post)} aria-label="Edit post">
  <Edit className="h-4 w-4 mr-1" />Edit
</Button>
<Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)} aria-label="Delete post">
  <Trash2 className="h-4 w-4 mr-1" />Delete
</Button>
};

export default Dashboard;
