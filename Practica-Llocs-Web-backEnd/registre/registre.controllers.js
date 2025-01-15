import { registreModel } from "./registre.model";
import express from 'express';


export async function handleCrearRegistre(sessionId, userId, llocEvent, tipusEvent) {
    const newRegistre = new registreModel({
        sessionId,
        userId,
        llocEvent,
        tipusEvent,
        createdAt: new Date()
    });

    await newRegistre.save();
    return newRegistre;
}