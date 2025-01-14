import {Router} from 'express';
import { handleGetUsers, handleGetUser, createUser, getUserBalance, updateUserBalance, updateUserBitcoinAmount, getUserBitcoinAmount, updateUserEthereumAmount, getUserEthereumAmount, updateUserLitecoinAmount, getUserLitecoinAmount, getUserName } from './users.controllers.js';

export const usersRouter = Router();

usersRouter.get('/', handleGetUsers);
usersRouter.get('/:id', handleGetUser);
usersRouter.post('/', createUser); 
usersRouter.get('/:id/balance', getUserBalance);
usersRouter.put('/:id/balance', updateUserBalance);
usersRouter.put('/:id/bitcoinAmount', updateUserBitcoinAmount);
usersRouter.get('/:id/bitcoinAmount', getUserBitcoinAmount);
usersRouter.put('/:id/ethereumAmount', updateUserEthereumAmount);
usersRouter.get('/:id/ethereumAmount', getUserEthereumAmount);
usersRouter.put('/:id/litecoinAmount', updateUserLitecoinAmount);
usersRouter.get('/:id/litecoinAmount', getUserLitecoinAmount);
usersRouter.get('/:id/username', getUserName);








