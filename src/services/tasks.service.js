import tasksRepository from '../repository/tasks.repository';
import projectsRepository from '../repository/projects.repository';

class TasksService {
  constructor(tasksRepo, projectsRepo) {
    this.taskRepository = tasksRepo;
    this.projectsRepository = projectsRepo;
  }

  async getOne(id) {
    const taskFromDb = await this.taskRepository.getOne(id);

    return taskFromDb;
  }

  async create(newTask) {
    const { _id } = await this.taskRepository.create(newTask);

    const projectToUpdate = {
      projectId: newTask.project,
      taskId: _id,
    };

    await this.projectsRepository.addTaskToProject(projectToUpdate);
  }

  async updateOne(updateObject, id) {
    const updatedProject = await this.taskRepository.updateOne(updateObject, id);

    return updatedProject;
  }

  async deleteOne(projectId, taskId) {
    await this.taskRepository.deleteOne(taskId);

    await this.projectsRepository.removeTaskfromProject(projectId, taskId);
  }
}

export default new TasksService(tasksRepository, projectsRepository);
