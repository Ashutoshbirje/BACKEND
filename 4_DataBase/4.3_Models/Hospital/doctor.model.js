import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            reauired: true
        },
        salary: {
            type: String,
            required: true
        },
        qualification: {
            type: String,
            required: true          
        },
        experienceInYear: {
            type: Number,
            required: true,
            default: 0
        },
        workInHospitals: [
            {
                type: mongoose.Schema.Types.objectID,
                ref: "Hospital"
            },
        ]
    },
    {
        timestamp: true
    });

export const doctor = mongoose.Model("doctor",doctorSchema);