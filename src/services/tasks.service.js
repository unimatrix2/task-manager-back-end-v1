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
    // criando a nova task e pegando o ID dela
    const { _id } = await this.taskRepository.create(newTask);

    // montando um object para atualizar o projeto
    const projectToUpdate = {
      projectId: newTask.project,
      taskId: _id,
    };

    // update do projeto passando o id do projeto e o id da task que sera incluida
    await this.projectsRepository.addTaskToProject(projectToUpdate);
  }

  async updateOne(updateObject, id) {
    const updatedProject = await this.taskRepository.updateOne(updateObject, id);

    return updatedProject;
  }

  async deleteOne(taskId) {
    const { project } = await this.taskRepository.deleteOne(taskId);

    await this.projectsRepository.removeTaskfromProject(project, taskId);
  }
}

export default new TasksService(tasksRepository, projectsRepository);
