import {Router} from 'express';
import { handleCrearRegistre } from './registre.controllers.js';

export const registreRouter = Router();


registreRouter.post('/', handleCrearRegistre)