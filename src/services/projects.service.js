import projectsRepository from '../repository/projects.repository';

import ApplicationError from '../errors/ApplicationError';

class ProjectsService {
  constructor(projectsRepo) {
    this.projectRepository = projectsRepo;
  }

  async get(id, search) {
    try {
      const projectsFromDb = await this.projectRepository.get(id, search);

      return projectsFromDb;
    } catch (error) {
      throw new ApplicationError({ message: error.message, type: 'Projects - Get Method', status: 502 });
    }
  }

  async getOne(id) {
    const projectFromDb = await this.projectRepository.getOne(id);

    return projectFromDb;
  }

  async create(newProject, id) {
    await this.projectRepository.create(newProject, id);
  }

  async updateOne(updateObject, id) {
    try {
      const updatedProject = await this.projectRepository.updateOne(updateObject, id);

      return updatedProject;
    } catch (error) {
      throw new ApplicationError({ message: error.message, status: 504 });
    }
  }

  async deleteOne(id) {
    await this.projectRepository.deleteOne(id);
  }
}

export default new ProjectsService(projectsRepository);
