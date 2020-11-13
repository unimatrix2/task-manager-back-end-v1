import { Schema, model } from 'mongoose';

import ApplicationError from '../errors/ApplicationError';

const projectSchema = new Schema(
  {
    title: String,
    description: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

projectSchema.statics.validateUpdateParams = (req, res, next) => {
  if (req.body.title) {
    return next();
  }

  throw new ApplicationError({ message: 'asdassda', status: 401 });
};

export default model('Project', projectSchema);
