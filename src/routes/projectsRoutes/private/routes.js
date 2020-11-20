import { Router } from 'express';

import Project from '../../../models/Project';

import projectsMapper from '../../../mappers/projects.mapper';
import projectsService from '../../../services/projects.service';

import ApplicationError from '../../../errors/ApplicationError';

const router = Router();

router.get('/list', async (req, res, next) => {
  try {
    const { id } = req.user;
    const { search } = req.query;

    const projects = await projectsService.get(id, search);

    return res.status(200).json(projects);
  } catch (error) {
    return next(new ApplicationError(error));
  }
});

router.get('/list/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await projectsService.getOne(id);

    return res.status(200).json(project);
  } catch (error) {
    return next(new ApplicationError(error));
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const { id } = req.user;
    const newProjectInfo = req.body;

    await projectsService.create(newProjectInfo, id);

    return res.status(201).json();
  } catch (error) {
    return next(new ApplicationError(error));
  }
});

router.put('/update/:id', Project.validateUpdateParams, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateObject = projectsMapper.updateOne(req.body);

    const updatedProject = await projectsService.updateOne(updateObject, id);

    return res.status(200).json(updatedProject);
  } catch (error) {
    return next(new ApplicationError(error));
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await projectsService.deleteOne(id);

    return res.status(200).json();
  } catch (error) {
    return next(new ApplicationError(error));
  }
});

export default router;
