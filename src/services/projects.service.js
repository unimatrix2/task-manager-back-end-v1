import projectsRepository from '../repository/projects.repository';

import ApplicationError from '../errors/ApplicationError';

class ProjectsService {
  constructor(projectsRepo) {
    this.projectRepository = projectsRepo;
  }

  async get(search) {
    const projectsFromDb = await this.projectRepository.get(search);

    return projectsFromDb;
  }

  async getOne(id) {
    const projectFromDb = await this.projectRepository.getOne(id);

    return projectFromDb;
  }

  async create(newProject) {
    await this.projectRepository.create(newProject);
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
