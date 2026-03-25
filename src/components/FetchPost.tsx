import { useEffect, useState } from 'react';
import { deletePost, getPosts, updatePost, type Post } from '../api/postStore';

type EditablePostFields = {
  title: string;
  body: string;
  userId: number;
  createdAt: string;
};

type FetchPostProps = {
  refreshKey: number;
};

const FetchPost = ({ refreshKey }: FetchPostProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<EditablePostFields>({
    title: '',
    body: '',
    userId: 1,
    createdAt: '',
  });

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getPosts();
      setPosts(data);
    } catch {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts();
  }, [refreshKey]);

  const startEdit = (post: Post) => {
    setEditingId(post.id);
    setEditForm({
      title: post.title,
      body: post.body,
      userId: post.userId,
      createdAt: post.createdAt ?? new Date().toISOString(),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleUpdate = async (id: number) => {
    try {
      await updatePost(id, {
        title: editForm.title,
        body: editForm.body,
        userId: Number(editForm.userId),
        createdAt: editForm.createdAt,
      });
      setEditingId(null);
      await loadPosts();
    } catch {
      setError('Failed to update post');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      await loadPosts();
    } catch {
      setError('Failed to delete post');
    }
  };

  return (
    <div>
      <h2>Posts</h2>

      {loading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}

      {!loading && posts.length === 0 && <p>No posts found.</p>}

      {posts.map((post) => (
        <div key={post.id} style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '10px' }}>
          {editingId === post.id ? (
            <>
              <div>
                <label htmlFor={`title-${post.id}`}>Title:</label>
                <input
                  id={`title-${post.id}`}
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor={`body-${post.id}`}>Body:</label>
                <textarea
                  id={`body-${post.id}`}
                  value={editForm.body}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, body: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor={`userId-${post.id}`}>User ID:</label>
                <input
                  id={`userId-${post.id}`}
                  type="number"
                  value={editForm.userId}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, userId: Number(e.target.value) }))}
                />
              </div>
              <button onClick={() => void handleUpdate(post.id)}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <small>User: {post.userId}</small>
              <div>
                <button onClick={() => startEdit(post)}>Edit</button>
                <button onClick={() => void handleDelete(post.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FetchPost;
