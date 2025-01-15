import { Schema, model} from 'mongoose';

const registreSchema = new Schema({
    sessionId: { type: String, required: true },
    userId: { type: String, default: null },
    llocEvent: { type: String, required: true },
    tipusEvent: { 
      type: String, 
      enum: ['visita', 'click'], 
      required: true 
    },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

export const registreModel = model('Registre', registreSchema);