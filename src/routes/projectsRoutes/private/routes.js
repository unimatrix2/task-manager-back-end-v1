import { Router } from 'express';

import Project from '../../../models/Project';

import projectsMapper from '../../../mappers/projects.mapper';
import projectsService from '../../../services/projects.service';

const router = Router();

router.get('/list', async (req, res, next) => {
  try {
    const { search } = req.query;

    const projects = await projectsService.get(search);

    return res.status(200).json(projects);
  } catch (error) {
    return next(error);
  }
});

router.get('/list/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await projectsService.getOne(id);

    return res.status(200).json(project);
  } catch (error) {
    return next(error);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const newProjectInfo = req.body;

    await projectsService.create(newProjectInfo);

    return res.status(201).json();
  } catch (error) {
    return next(error);
  }
});

router.put('/update/:id', Project.validateUpdateParams, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateObject = projectsMapper.updateOne(req.body);

    const updatedProject = await projectsService.updateOne(updateObject, id);

    return res.status(200).json(updatedProject);
  } catch (error) {
    return next(error);
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await projectsService.deleteOne(id);

    return res.status(200).json();
  } catch (error) {
    return next(error);
  }
});

export default router;
