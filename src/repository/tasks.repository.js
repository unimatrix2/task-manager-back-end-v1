import Task from '../models/Task';

class TaskRepository {
  constructor(TaskModel) {
    this.Task = TaskModel;
  }

  async getOne(id) {
    const project = await this.Task.findById(id);

    return project;
  }

  async create(newTask) {
    const task = new this.Task(newTask);

    await task.save();

    return task;
  }

  async updateOne(updateObject, id) {
    const updatedTask = await this.Task.findByIdAndUpdate(
      id,
      updateObject,
      { new: true, useFindAndModify: false },
    );

    return updatedTask;
  }

  async deleteOne(id) {
    await this.Task.findByIdAndDelete(id);
  }
}

export default new TaskRepository(Task);
