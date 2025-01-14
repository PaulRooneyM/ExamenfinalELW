import {Router} from 'express';
import { handleGetNews, handleNewsWeb, handleDeleteNews, handleUpdateNews } from './news.controllers.js';

export const newsRouter = Router();

newsRouter.get('/', handleGetNews);
newsRouter.post('/', handleNewsWeb);
newsRouter.delete('/:id', handleDeleteNews);
newsRouter.put('/:id', handleUpdateNews);


