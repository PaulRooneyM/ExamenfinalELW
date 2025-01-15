import {Router} from 'express';
import { handleCrearRegistre, handleObtenirVisites, handleObtenirUlitmsEvents } from './registre.controllers.js';


export const registreRouter = Router();


registreRouter.post('/', handleCrearRegistre)
registreRouter.get('/visitesclicks', handleObtenirVisites)
registreRouter.get('/ultimsevents', handleObtenirUlitmsEvents)