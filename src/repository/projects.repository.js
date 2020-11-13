import Project from '../models/Project';

import ApplicationError from '../errors/ApplicationError';

class ProjectRepository {
  constructor(ProjectModel) {
    this.Project = ProjectModel;
  }

  async get(search) {
    const regex = new RegExp(search, 'i');

    const projects = await this.Project.find({ title: regex }).populate('tasks');

    return projects;
  }

  async getOne(id) {
    const project = await this.Project.findById(id);

    return project;
  }

  async create(newProject) {
    try {
      const project = new this.Project(newProject);

      await project.save();
    } catch (error) {
      throw new ApplicationError(
        {
          message: 'Error while performing an database operation',
          type: 'ProjectRepository - create method',
          status: 409,
        },
      );
    }
  }

  async updateOne(updateObject, id) {
    const updatedProject = await this.Project.findByIdAndUpdate(
      id,
      updateObject,
      { new: true, useFindAndModify: false },
    );

    return updatedProject;
  }

  async deleteOne(id) {
    await this.Project.findByIdAndDelete(id);
  }

  async addTaskToProject({ projectId, taskId }) {
    await this.Project.findByIdAndUpdate(
      projectId,
      { $push: { tasks: taskId } },
      { useFindAndModify: false },
    );
  }

  async removeTaskfromProject(projectId, taskId) {
    await this.Project.findByIdAndUpdate(
      projectId,
      { $pull: { tasks: taskId } },
      { useFindAndModify: false },
    );
  }
}

export default new ProjectRepository(Project);
