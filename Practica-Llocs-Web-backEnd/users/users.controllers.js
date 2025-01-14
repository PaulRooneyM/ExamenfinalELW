import { get } from 'mongoose';
import { userModel } from './users.model.js';

// Obtenir tots els usuaris
export async function handleGetUsers(req, res) {
    const users = await userModel.find({});
    res.json(users);
}

// Obtenir un usuari per ID
export async function handleGetUser(req, res) {
    const id = req.params.id;
    const foundUser = await userModel.findById(id)
    res.json(foundUser);
}

// Crear un nou usuari
export async function createUser(req,res){
    const existingUser = await userModel.findOne({username: req.body.username});
    if(existingUser){
        res.status(409).send('El usuari ja existeix');
        return;
    }
    const newUser = new userModel(req.body);
    await newUser.save()
    res.json(newUser);
    console.log(newUser);
}

// Obtenir el saldo d'un usuari
export async function getUserBalance(req,res){
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.json(user.balance);
}

// Actualitzar el saldo d'un usuari
export async function updateUserBalance(req,res){
    const id = req.params.id;
    const { balance } = req.body; 
    const newBalance = balance
    await userModel.findByIdAndUpdate(id, {balance: newBalance});
    res.json(newBalance);
}

// Actualitzar la quantitat de Bitcoin d'un usuari
export async function updateUserBitcoinAmount(req, res) {
    const id = req.params.id;
    const { bitcoinAmount } = req.body;  
    const newBitcoinAmount = bitcoinAmount;
    await userModel.findByIdAndUpdate(id, { bitcoinAmount: newBitcoinAmount });
    res.json(newBitcoinAmount);
}

// Obtenir la quantitat de Bitcoin d'un usuari
export async function getUserBitcoinAmount(req, res) {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.json(user.bitcoinAmount);
}

// Actualitzar la quantitat d'Ethereum d'un usuari
export async function updateUserEthereumAmount(req, res) {
    const id = req.params.id;
    const { ethereumAmount } = req.body;  
    const newEthereumAmount = ethereumAmount;
    await userModel.findByIdAndUpdate(id, { ethereumAmount: newEthereumAmount });
    res.json(newEthereumAmount);
}

// Obtenir la quantitat d'Ethereum d'un usuari
export async function getUserEthereumAmount(req, res) {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.json(user.ethereumAmount);
}

// Actualitzar la quantitat de Litecoin d'un usuari
export async function updateUserLitecoinAmount(req, res) {
    const id = req.params.id;
    const { litecoinAmount } = req.body;  
    const newLitecoinAmount = litecoinAmount;
    await userModel.findByIdAndUpdate(id, { litecoinAmount: newLitecoinAmount });
    res.json(newLitecoinAmount);
}

// Obtenir la quantitat de Litecoin d'un usuari
export async function getUserLitecoinAmount(req, res) {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.json(user.litecoinAmount);
}

// Obtenir el nom d'usuari
export async function getUserName(req, res) {
    const id = req.params.id;
    const user = await userModel.findById(id);
    res.json(user.username);
}
