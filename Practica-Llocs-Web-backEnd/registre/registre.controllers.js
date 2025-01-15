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


/*
export async function handleGetVisitesCLicks(req, res) {
    const { dataInici, dataFinal, llocEvent, tipusEvent } = req.query;

    const filters = {};

    if (dataInici) {
        filters.createdAt = { $gte: new Date(dataInici) };
    }

    if (dataFinal) {
        filters.createdAt = filters.createdAt || {};
        filters.createdAt.$lte = new Date(dataFinal);
    }

    if (llocEvent) {
        filters.llocEvent = llocEvent;
    }

    if (tipusEvent) {
        filters.tipusEvent = tipusEvent;
    }

    try {
        const events = await registreModel.find(filters);
        const visites = events.filter(event => event.tipusEvent === 'visita').length;
        const clicks = events.filter(event => event.tipusEvent === 'click').length;

        return res.status(200).json({ visites, clicks });
    } catch (error) {
        console.error("Error al obtener las visitas y clicks:", error);
        return res.status(500).json({ message: 'Error al obtener las visitas y clicks' });
    }

*/