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
    <div className="min-h-screen bg-[#F5F0DC] text-[#091930]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#091930] font-serif">Aeropath Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-[#091930]">
              <User className="h-5 w-5" />
              <span>{user?.username}</span>
            </div>
            <Button variant="outline" onClick={handleLogout} className="text-[#091930]">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <section className="mb-12">
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingPost(null);
            }}
            className="bg-[#D4B463] hover:bg-[#bda253] text-[#091930] mb-6"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Button>

          {(showForm || editingPost) && (
            <Card className="mb-8 bg-white">
              <CardContent className="py-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      className="text-black"
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
                      className="text-black"
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
                  <div className="flex space-x-3">
                    <Button type="submit" className="bg-[#D4B463] text-[#091930]">
                      {editingPost ? "Update" : "Create"}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* User Posts */}
          <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
          {loading ? (
            <p className="text-gray-600">Loading posts...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : posts.filter((p) => p.authorId === user?.id).length === 0 ? (
            <p className="text-gray-600">No posts yet.</p>
          ) : (
            <div className="space-y-6">
              {posts
                .filter((p) => p.authorId === user?.id)
                .map((post) => (
                  <Card key={post.id} className="bg-white">
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
          <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-600">No posts found.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="bg-white">
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
                      by <span className="font-medium">{post.author?.username || "Unknown"}</span>
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
