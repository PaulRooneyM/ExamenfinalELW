import {Router} from 'express';
import { handleCrearRegistre, handleObtenirUltimsEvents } from './registre.controllers.js';


export const registreRouter = Router();


registreRouter.post('/', handleCrearRegistre)
registreRouter.get('/ultimsevents', handleObtenirUltimsEvents)
//registreRouter.get('/', handleGetVisitesCLicks);