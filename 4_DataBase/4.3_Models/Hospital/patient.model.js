import mongoose from "mongoose"

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        diagnoseWith: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        address: {
            type: Number,
            required: true
        },
        bloodGroup: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ["M","F","Other"],
            required: true
        },
        admintedIn: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hospital"
        }
    },
    {
        timestamp: true
    });

export const patient = mongoose.Model("'patient",patientSchema);