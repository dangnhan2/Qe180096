import Link from 'next/link';

export interface Post {
  _id: string; // MongoDB ID
  name: string;
  description: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
      <h3>{post.name}</h3>
      <p>{post.description}</p>
      {post.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.imageUrl} alt={post.name} style={{ maxWidth: '100%', height: 'auto', marginTop: '10px', borderRadius: '4px' }} />
      )}
      <div style={{ marginTop: '15px' }}>
        <Link href={`/edit-post/${post._id}`} style={{ marginRight: '10px', textDecoration: 'none', color: 'blue' }}>
          Edit
        </Link>
        <button onClick={() => onDelete(post._id)} style={{ background: 'red', color: 'white', border: 'none', padding: '8px 12px', cursor: 'pointer', borderRadius: '4px' }}>
          Delete
        </button>
      </div>
    </div>
  );
}