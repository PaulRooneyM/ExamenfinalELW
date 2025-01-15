import { registreModel } from "./registre.model.js";
import express from 'express';


export async function handleCrearRegistre(req, res) {

    const { sessionId, userId, llocEvent, tipusEvent } = req.body;

    if (!sessionId || !llocEvent || !tipusEvent) {
        return res.status(400).json({ message: 'Faltan campos obligatorios.' });
      }
    const newRegistre = new registreModel({
        sessionId,
        userId,
        llocEvent,
        tipusEvent,
        createdAt: new Date()
    });

    await newRegistre.save();

    console.log('Registro guardado:', newRegistre);

    return res.status(201).json({
        message: 'Registro creado correctamente.',
        data: newRegistre,
      });
      
}




export async function handleObtenirVisites(i, req, res) {
    try {
        const { dataInici, dataFinal, llocEvent, tipusEvent } = req.query;

        const filter = {};

        if (dataInici) {
            filter.createdAt = { $gte: new Date(dataInici) };
        }

        if (dataFinal) {
            filter.createdAt = { ...filter.createdAt, $lte: new Date(dataFinal) };
        }

        if (llocEvent) {
            filter.llocEvent = llocEvent;
        }

        if (tipusEvent) {
            filter.tipusEvent = tipusEvent;
        }

        // Realizamos la consulta en la base de datos
        const visits = await registreModel.aggregate([
            { $match: filter }, 
            {
                $group: {
                    _id: null,  
                    visitas: { $sum: { $cond: [{ $eq: ["$tipusEvent", "visita"] }, 1, 0] } },
                    clicks: { $sum: { $cond: [{ $eq: ["$tipusEvent", "click"] }, 1, 0] } }
                }
            }
        ]);

        // Si no se encuentran registros, devolvemos 0 para visitas y clicks
        if (visits.length === 0) {
            return res.status(200).json({ visitas: 0, clicks: 0 });
        }

        // En caso de que haya resultados, respondemos con los totales de visitas y clicks
        return res.status(200).json({
            visitas: visits[0].visitas,
            clicks: visits[0].clicks
        });

    } catch (error) {
        console.error("Error al obtener visitas y clicks:", error);
        return res.status(500).json({ message: 'Error al obtener los registros' });
    }
}


export async function handleObtenirUlitmsEvents(req, res) {
    try {
        const { limit = 10 } = req.query;

        const events = await registreModel.find().sort({ createdAt: -1 }).limit(parseInt(limit));

        return res.status(200).json(events);

    } catch (error) {
        console.error("Error al obtener los últimos eventos:", error);
        return res.status(500).json({ message: 'Error al obtener los registros' });
    }
}