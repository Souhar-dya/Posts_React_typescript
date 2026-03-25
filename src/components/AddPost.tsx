
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postStore';

type AddPostProps = {
  onCreated: () => void;
};

const AddPost = ({ onCreated }: AddPostProps) => {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [userId, setUserId] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await createPost({
        title,
        body,
        userId: Number(userId),
        createdAt: new Date().toISOString(),
      });
      setTitle('');
      setBody('');
      setUserId(1);
      onCreated();
    } catch {
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuth) {
    return null;
  }

  return (
    <div>
      <h2>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="post-title">Title:</label>
          <input
            id="post-title"
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="post-body">Body:</label>
          <textarea
            id="post-body"
            value={body}
            required
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="post-user-id">User ID:</label>
          <input
            id="post-user-id"
            type="number"
            value={userId}
            min={1}
            onChange={(e) => setUserId(Number(e.target.value))}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Create Post'}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddPost;
