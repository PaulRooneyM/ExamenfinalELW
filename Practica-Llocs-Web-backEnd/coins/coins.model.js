import { Schema, model} from 'mongoose';

const coinSchema = new Schema({
    id: String,
    name: String,
    value: {
        type: Number,
        set: (value) => Math.round(value * 100) / 100 
    }
}, {
    timestamps: true
});

export const coinModel = model('Coin', coinSchema);

export const coins = [
    { id: 'BTC', name: 'Bitcoin', value: 60000 },
    { id: 'ETH', name: 'Ethereum', value: 3000 },
    { id: 'LTC', name: 'Litecoin', value: 200 }
];
