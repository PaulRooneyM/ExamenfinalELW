import { newsModel } from "./news.model.js";
import { addNews } from "./news.model.js";

// Obtenir totes les notícies
export async function handleGetNews(req, res) {
  const news = await newsModel.find({});
  res.json(news);
}

// Afegir una nova notícia des del web
export async function handleNewsWeb(req, res) {
    try {
        const newNews = await addNews(req.body);
        res.json(newNews);
        console.log(newNews);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la noticia', error });
    }
}

// Afegir una nova notícia
export async function handleAddNews(req, res) {
  const newNews = await addNews(req.body);
  res.json(newNews);
}

// Eliminar una notícia per ID
export async function handleDeleteNews(req, res) {
  try {
    const { id } = req.params;
    await newsModel.findByIdAndDelete(id);
    res.json({ message: 'Noticia eliminada correctament' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la noticia', error });
  }
}

// Actualitzar una notícia per ID
export async function handleUpdateNews(req, res) {
  try {
    const { id } = req.params;
    const updatedNews = await newsModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualitzar la noticia', error });
  }
}
