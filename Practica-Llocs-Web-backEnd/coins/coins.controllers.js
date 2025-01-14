import { coinModel } from './coins.model.js';

// Obtenir totes les monedes
export async function handleGetCoins(req, res) {
    const coins = await coinModel.find({});
    res.json(coins);
}

// Obtenir el saldo d'una moneda per ID
export async function handleGetCoinBalance(req, res) {
    const { id } = req.params;

    const coin = await coinModel.findOne({ id: id }); 

    if (!coin) {
        return res.status(404).json({ message: 'Coin not found' });
    }

    res.json(coin.value);
}