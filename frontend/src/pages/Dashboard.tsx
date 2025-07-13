import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
// import { usePosts } from '@/hooks/usePosts'; // Uncomment when ready
import { Plus, Edit, Trash2, LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  // const { posts, loading, createPost, updatePost, deletePost } = usePosts(); // Uncomment when ready
  const [showCreateForm, setShowCreateForm] = useState(false);
  // const [editingPost, setEditingPost] = useState<Post | null>(null); // Placeholder for post editing logic
  // const [formData, setFormData] = useState({ title: '', content: '', published: false }); // Placeholder
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      // Error handled in auth hook
    }
  };

  // Placeholder for create/edit form logic

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
        {/* Create Post Section - UNFINISHED */}
        <div className="mb-8">
          <Button onClick={() => setShowCreateForm(true)} className="mb-6">
            <Plus className="h-4 w-4 mr-2" />
            Create New Post (unimplemented)
          </Button>
          {/* Placeholder: Add create/edit post form here */}
        </div>

        {/* Posts Section - UNFINISHED */}
        <div className="grid gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Your Posts</h2>
            {/* <span className="text-sm text-gray-500">{userPosts.length} posts</span> */}
          </div>
          <div className="text-center py-8">
            <p className="text-gray-500">Posts display is unfinished. Complete this tomorrow.</p>
          </div>
        </div>

        {/* All Posts Section - UNFINISHED */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">All Posts</h2>
          <div className="space-y-4">
            <Card>
              <CardContent>
                <p className="text-gray-500">All posts display is unfinished. Complete this tomorrow.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
