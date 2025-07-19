import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  name: string;
  description: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
}, { timestamps: true }); // Tự động thêm createdAt và updatedAt

const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;