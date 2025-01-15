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


export async function handleObtenirUltimsEvents(req, res) {
    try {
        // Obtener siempre los últimos 10 eventos
        const events = await registreModel.find().sort({ createdAt: -1 }).limit(10);

        // Responder con los eventos obtenidos
        return res.status(200).json(events);

    } catch (error) {
        console.error("Error al obtener los últimos eventos:", error);
        return res.status(500).json({ message: 'Error al obtener los registros' });
    }
}
