import {Router} from 'express';
import { handleGetCoins, handleGetCoinBalance } from './coins.controllers.js';

export const coinsRouter = Router();

coinsRouter.get('/', handleGetCoins);
coinsRouter.get('/:id/value', handleGetCoinBalance);
