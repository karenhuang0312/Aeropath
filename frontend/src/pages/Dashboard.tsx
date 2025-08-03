import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { usePosts } from "@/hooks/usePosts";
import { Plus, Edit, Trash2, LogOut, User } from "lucide-react";
import { Post } from "@/types";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
  } = usePosts();

  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    published: false,
  });

  const resetForm = () => {
    setFormData({ title: "", content: "", published: false });
    setEditingPost(null);
    setShowForm(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      await updatePost(editingPost.id, formData);
    } else {
      await createPost(formData);
    }
    resetForm();
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content || "",
      published: post.published,
    });
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
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
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Create/Edit Post Section */}
        <div className="mb-8">
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingPost(null);
            }}
            className="mb-6"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Button>

          {(showForm || editingPost) && (
            <Card className="mb-6">
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Input
                      id="content"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          published: e.target.checked,
                        })
                      }
                    />
                    <Label htmlFor="published">Published</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit">
                      {editingPost ? "Update" : "Create"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* User Posts */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Your Posts
          </h2>
          {loading ? (
            <p className="text-gray-500 text-center">Loading posts...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : posts.filter((p) => p.authorId === user?.id).length === 0 ? (
            <p className="text-gray-500 text-center">No posts yet.</p>
          ) : (
            <div className="space-y-4">
              {posts
                .filter((p) => p.authorId === user?.id)
                .map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <CardTitle>
                        {post.title}
                        {post.published && (
                          <span className="ml-2 text-xs text-green-600">
                            (Published)
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>{post.content}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleEdit(post)}
                          aria-label="Edit"
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(post.id)}
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </section>

        {/* All Posts */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            All Posts
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts found.</p>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle>
                      {post.title}
                      {post.published && (
                        <span className="ml-2 text-xs text-green-600">
                          (Published)
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription>
                      by{" "}
                      <span className="font-medium">
                        {post.author?.username || "Unknown"}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{post.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
