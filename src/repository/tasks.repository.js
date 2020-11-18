import Task from '../models/Task';

class TaskRepository {
  constructor(TaskModel) {
    this.Task = TaskModel;
  }

  async getOne(id) {
    const project = await this.Task.findById(id).populate('project');

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
    const deletedProject = await this.Task.findByIdAndDelete(id);

    return deletedProject;
  }
}

export default new TaskRepository(Task);
