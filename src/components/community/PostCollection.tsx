import { useState } from 'react';
import type { Post } from '@/data/journal';
import { PostCard } from '@/components/journal/PostCard';
import { PostReader } from '@/components/journal/PostReader';
export function PostCollection({ posts }: { posts: Post[] }) {
  const [open, setOpen] = useState<Post | null>(null);
  return <><section className="grid gap-6 md:grid-cols-2">{posts.map((post, index) => <PostCard key={post.id} post={post} index={index} onOpen={() => setOpen(post)}/>)}</section>{open && <PostReader post={open} onClose={() => setOpen(null)}/>}</>;
}
