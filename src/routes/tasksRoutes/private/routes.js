import { Router } from 'express';

import tasksMapper from '../../../mappers/tasks.mapper';
import tasksService from '../../../services/tasks.service';

import ApplicationError from '../../../errors/ApplicationError';

const router = Router();

router.get('/list/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const taskFromDb = await tasksService.getOne(id);

    return res.status(200).json(taskFromDb);
  } catch (error) {
    return next(new ApplicationError(error));
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const newTaskInfo = req.body;

    await tasksService.create(newTaskInfo);

    return res.status(201).json();
  } catch (error) {
    return next(new ApplicationError(error));
  }
});

router.put('/update/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateObject = tasksMapper.updateOne(req.body);

    const updatedTask = await tasksService.updateOne(updateObject, id);

    return res.status(200).json(updatedTask);
  } catch (error) {
    return next(new ApplicationError(error));
  }
});

router.delete('/delete/:taskId', async (req, res, next) => {
  try {
    const { taskId } = req.params;

    await tasksService.deleteOne(taskId);

    return res.status(200).json();
  } catch (error) {
    return next(new ApplicationError(error));
  }
});

export default router;
