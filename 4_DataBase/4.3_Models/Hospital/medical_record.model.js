import mongoose from "mongoose"

const medicalRecordSchema = new mongoose.Schema({},{timestamp: true});

export const medicalRecord = mongoose.Model("'medicalRecord",medicalRecordSchema);