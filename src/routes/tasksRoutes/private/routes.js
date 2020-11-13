import { Router } from 'express';

import tasksMapper from '../../../mappers/tasks.mapper';
import tasksService from '../../../services/tasks.service';

const router = Router();

router.get('/list/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const taskFromDb = await tasksService.getOne(id);

    return res.status(200).json(taskFromDb);
  } catch (error) {
    return next(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const newTaskInfo = req.body;

    await tasksService.create(newTaskInfo);

    res.status(201).json();
  } catch (error) {
    next(error);
  }
});

router.put('/update/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateObject = tasksMapper.updateOne(req.body);

    const updatedTask = await tasksService.updateOne(updateObject, id);

    return res.status(200).json(updatedTask);
  } catch (error) {
    return next(error);
  }
});

router.delete('/delete/project/:projectId/task/:taskId', async (req, res, next) => {
  try {
    const { projectId, taskId } = req.params;

    await tasksService.deleteOne(projectId, taskId);

    return res.status(200).json();
  } catch (error) {
    return next(error);
  }
});

export default router;
