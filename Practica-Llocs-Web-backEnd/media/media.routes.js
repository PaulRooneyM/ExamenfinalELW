import {Router} from 'express';
import { handleGetMedia, handleGetMediabitcoin, handleGetMediaethereum, handleGetMedialitecoin} from './media.controllers.js';

export const mediaRouter = Router();

mediaRouter.get('/', handleGetMedia);
mediaRouter.get('/bitcoin', handleGetMediabitcoin);
mediaRouter.get('/ethereum', handleGetMediaethereum);
mediaRouter.get('/litecoin', handleGetMedialitecoin);