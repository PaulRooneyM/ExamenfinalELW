import mongoose, { set } from 'mongoose';
import cors from 'cors';
import express, {Router} from 'express';
import bodyParser from 'body-parser';
import { usersRouter } from './users/users.routes.js';
import { coinsRouter } from './coins/coins.routes.js';
import { coins } from './coins/coins.model.js';
import { coinModel } from './coins/coins.model.js';
import { newsRouter } from './news/news.routes.js';
import { news } from './news/news.model.js';
import { newsModel } from './news/news.model.js';
import { mediaRouter } from './media/media.routes.js';
import { mediaModel, media } from './media/media.model.js';


await mongoose.connect('mongodb://localhost:27017/myproject');

const app = express();

app.use(cors());

const port = 3000;

app.use(bodyParser.json());

// Rutes 
app.use('/users', usersRouter);
app.use('/coins', coinsRouter);
app.use('/news', newsRouter);
app.use('/media', mediaRouter);

// Inicialitzar les notícies
async function initializeNews() {
    for (const newsItem of news) {
        const existingNews = await newsModel.findOne({ number: newsItem.number }); 
        if (!existingNews) {
            try {
                await new newsModel(newsItem).save();
                console.log(`News item ${newsItem.number} created successfully`);
            } catch (err) {
                console.error(`Error creating news item ${newsItem.number}:`, err);
            }
        } else {
            console.log(`News item ${newsItem.number} already exists in the database`);
        }
    }
}

initializeNews();

// Inicialitzar gifs
async function initializeMedia() {
    const existingMedia = await mediaModel.findOne({});

    if (!existingMedia) {
        try {
            const newMedia = new mediaModel(media[0]); 
            await newMedia.save();
            console.log('Media created successfully');
        } catch (err) {
            console.error('Error creating media:', err);
        }
    } else {
        console.log('Media already exists in the database');
    }
}

initializeMedia();

// Inicialitzar Bitcoin
async function initializeBitcoin() {
    const bitcoin = await coinModel.findOne({ id: 'BTC' });

    if (!bitcoin) {
        const newBitcoin = new coinModel(coins[0]);
        await newBitcoin.save()
            .then(() => console.log('Bitcoin created successfully'))
            .catch(err => console.error('Error creating Bitcoin:', err));
    } else {
        console.log('Bitcoin already exists in the database');
    }
}

// Inicialitzar Ethereum
async function initializeEthereum() {
    const ethereum = await coinModel.findOne({ id: 'ETH' });

    if (!ethereum) {
        const newEthereum = new coinModel(coins[1]);
        await newEthereum.save()
            .then(() => console.log('Ethereum created successfully'))
            .catch(err => console.error('Error creating Ethereum:', err));
    } else {
        console.log('Ethereum already exists in the database');
    }
}

// Inicialitzar Litecoin
async function initializeLitecoin() {
    const litecoin = await coinModel.findOne({ id: 'LTC' });

    if (!litecoin) {
        const newLitecoin = new coinModel(coins[2]);
        await newLitecoin.save()
            .then(() => console.log('Litecoin created successfully'))
            .catch(err => console.error('Error creating Litecoin:', err));
    } else {
        console.log('Litecoin already exists in the database');
    }
}

initializeBitcoin();
initializeEthereum();
initializeLitecoin();

// Actualitzar el valor de Bitcoin
async function updateBitcoinValue() {
    try {
        const randomValue = Math.random() * 10000;
        await coinModel.findOneAndUpdate(
            { id: 'BTC' },
            { $set: { value: randomValue } },
        );
    } catch (err) {
        console.error('Error updating Bitcoin value:', err);
    }
}

// Actualitzar el valor d'Ethereum
async function updateEthereumValue() {
    try {
        const randomValue = Math.random() * 1000;
        await coinModel.findOneAndUpdate(
            { id: 'ETH' }, 
            { $set: { value: randomValue } }, 
        );
    } catch (err) {
        console.error('Error updating Ethereum value:', err);
    }
}

// Actualitzar el valor de Litecoin
async function updateLitecoinValue() {
    try {
        const randomValue = Math.random() * 100; 
        await coinModel.findOneAndUpdate(
            { id: 'LTC' }, 
            { $set: { value: randomValue } }, 
        );
    } catch (err) {
        console.error('Error updating Litecoin value:', err);
    }
}

// Actualitzar els valors de les monedes cada 10 segons
setInterval(updateBitcoinValue, 10000);
setInterval(updateEthereumValue, 10000);
setInterval(updateLitecoinValue, 10000);

// Iniciar el servidor
app.listen(port, () => { 
    console.log(`Server is running on port ${port}`);
});