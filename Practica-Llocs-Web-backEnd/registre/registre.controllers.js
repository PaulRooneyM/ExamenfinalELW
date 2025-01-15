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