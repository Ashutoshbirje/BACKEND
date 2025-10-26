import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new mongoose.Schema(
    {
       videoFile: {
        type: String,
        required: true
       },
       thumbnail: {
        type: String,
        reauired: true 
       },
       title: {
        type: String,
        reauired: true 
       },
       description: {
        type: String,
        reauired: true 
       },
       duration: {
        type: Number,
        reauired: true 
       },
       view: {
        type: Number,
        default: 0
       },
       isPublished: {
        type: Boolean,
        default: true
       },
       owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
       }
    },
    {
        timestamp: true
    }
);

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video",videoSchema);