import mongoose from "mongoose";
const videoCommentSchema = new mongoose.Schema(
    {
        videoID: { type: String, required: true },
        commentContent: String,
        userName: String,
    },
    { collection: "videoComment" }
);

const videoModel = mongoose.model("videoComment", videoCommentSchema)
export default videoModel