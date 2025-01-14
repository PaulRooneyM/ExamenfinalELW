import { Schema, model} from 'mongoose';

const mediaSchema = new Schema({
    BicoinGif: String,
    EthereumGif: String,
    LitecoinGif: String,
    id: Number
}, {
    timestamps: false
});

export const mediaModel = model('Media', mediaSchema);


export const media = [
    { BicoinGif: 'https://openseauserdata.com/files/1a3bd7320bf2bbc7147569f46ea75b61.gif', EthereumGif: 'https://media.tenor.com/lk_GIGbJSbIAAAAj/lodge-eth.gif', LitecoinGif: 'https://openseauserdata.com/files/1c0fccf8b0dc659989fc72bd93193403.gif', id: 1 }
];