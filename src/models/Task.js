import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    title: String,
    description: String,
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
  },
  {
    timestamps: true,
  },
);

export default model('Task', taskSchema);
