import { Schema, model } from 'mongoose';

const newsSchema = new Schema({
    number: String,
    title: String,
    body: String,
    category: [String], 
}, 
{ timestamps: true }
);

export const newsModel = model('News', newsSchema);

export const news = [
    { 
        number: '1',
        title: 'Ethereum 2.0: La propera gran actualització', 
        body: 'Ethereum està preparant una actualització important amb Ethereum 2.0. Aquesta millora busca augmentar la velocitat de les transaccions i reduir les comissions.',
        category: ['Ethereum'] 
    },
    {  
        number: '2',
        title: 'Com que les regulacions canviaran, les criptomonedes podrien tenir més futur a nivell global', 
        body: 'Diversos governs estan començant a regular les criptomonedes, la qual cosa podria fer que fossin més estables i accessibles per als inversors.',
        category: ['Economia'] 
    },
    {  
        number: '3',
        title: 'Més empreses accepten Bitcoin com a forma de pagament', 
        body: 'Empreses de tot el món com Tesla, PayPal i altres estan acceptant Bitcoin com a mitjà de pagament, fet que impulsa la seva adopció i reconeixement.',
        category: ['Bitcoin', 'Economia'] 
    },
    {  
        number: '4',
        title: 'Actualització MimbleWimble a Litecoin', 
        body: 'Una de les principals innovacions en el món de Litecoin és la implementació de la tecnologia MimbleWimble, que millora la privacitat de les transaccions i la eficiència de la xarxa. Aquesta actualització, que permet als usuaris realitzar transaccions més privades i amb un millor rendiment, ha augmentat el atractiu de Litecoin en un moment en què la seguretat i la privacitat són més importants que mai.',
        category: ['Litecoin', 'Tecnologia'] 
    }
];

export const addNews = async (newsData) => {
  const newNews = new newsModel(newsData);
  await newNews.save();
  return newNews;
};
