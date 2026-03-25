export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt?: string;
};

type DataFile = {
  posts: Array<{
    id: string | number;
    title: string;
    body: string;
    userId: number;
    createdAt?: string;
  }>;
};

const STORAGE_KEY = 'jsonholder_posts';

const savePosts = (posts: Post[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

const loadSeedPosts = async (): Promise<Post[]> => {
  const dataUrl = new URL('./data.json', import.meta.url).href;
  const response = await fetch(dataUrl);

  if (!response.ok) {
    throw new Error('Failed to read data.json');
  }

  const data = (await response.json()) as DataFile;
  return (data.posts || []).map((post) => ({
    id: Number(post.id),
    title: post.title,
    body: post.body,
    userId: Number(post.userId),
    createdAt: post.createdAt,
  }));
};

export const getPosts = async (): Promise<Post[]> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored) as Post[];
  }

  const seedPosts = await loadSeedPosts();
  savePosts(seedPosts);
  return seedPosts;
};

export const createPost = async (payload: Omit<Post, 'id'>): Promise<Post> => {
  const posts = await getPosts();
  const maxId = posts.reduce((max, post) => Math.max(max, post.id), 0);

  const newPost: Post = {
    id: maxId + 1,
    title: payload.title,
    body: payload.body,
    userId: Number(payload.userId),
    createdAt: payload.createdAt ?? new Date().toISOString(),
  };

  const nextPosts = [...posts, newPost];
  savePosts(nextPosts);
  return newPost;
};

export const updatePost = async (
  id: number,
  payload: Omit<Post, 'id'>,
): Promise<Post> => {
  const posts = await getPosts();
  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    throw new Error('Post not found');
  }

  const updatedPost: Post = {
    ...posts[index],
    title: payload.title,
    body: payload.body,
    userId: Number(payload.userId),
    createdAt: payload.createdAt ?? posts[index].createdAt,
  };

  const nextPosts = [...posts];
  nextPosts[index] = updatedPost;
  savePosts(nextPosts);
  return updatedPost;
};

export const deletePost = async (id: number): Promise<void> => {
  const posts = await getPosts();
  const nextPosts = posts.filter((post) => post.id !== id);
  savePosts(nextPosts);
};
