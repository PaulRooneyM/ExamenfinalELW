import { mediaModel } from './media.model.js'; 


export async function handleGetMedia(req, res) {
    const media = await mediaModel.find({});
    res.json(media);
}


export async function handleGetMediabitcoin(req, res) {
    const media = await mediaModel.find({});
    
    const bitcoinGifs = media.map(item => item.BicoinGif);
    
    res.json(bitcoinGifs);
}

export async function handleGetMediaethereum(req, res) {
    const media = await mediaModel.find({});
    
    const ethereumGifs = media.map(item => item.EthereumGif);
    
    res.json(ethereumGifs);
}

export async function handleGetMedialitecoin(req, res) {
    const media = await mediaModel.find({});
    
    const litecoinGifs = media.map(item => item.LitecoinGif);
    
    res.json(litecoinGifs);
}
