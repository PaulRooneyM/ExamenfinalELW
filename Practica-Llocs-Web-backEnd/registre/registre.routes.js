import {Router} from 'express';

export const registreRouter = Router();


registreRouter.post('/', handleCrearRegistre)