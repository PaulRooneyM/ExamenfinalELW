import { Schema, model} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "El nom d'usuari és obligatori"], 
        unique: true, 
    },
    password: {
        type: String,
        required: [true, 'La contrasenya és obligatòria'], 
    },
    balance: {
        type: Number,
        default: 20, 
    },
    bitcoinAmount: {
        type: Number,
        default: 0, 
    },
    ethereumAmount: {
        type: Number,
        default: 0,
    },
    litecoinAmount: {
        type: Number,
        default: 0, 
    }
}, {
    timestamps: true
});

export const userModel = model('User', userSchema);
