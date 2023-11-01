import videoCommentModel from "../models/video-comment-model.js";

export const createVideoComment = (videoComment) => {
    return videoCommentModel.create(videoComment);
};

export const findByVideoID = (videoID) => {
    console.log("dao: in find by video id - ", videoID)
    return videoCommentModel.find({ videoID: videoID });
}

export const updateComment = (cid, updatedComment) => {
    console.log("dao: in update comment with cid - ", cid)
    return videoCommentModel.findByIdAndUpdate(cid, updatedComment);
}

export const deleteComment = (cid) => {
    console.log("dao: in delete comment with cid - ", cid)
    return videoCommentModel.findByIdAndDelete(cid);
}

// export const updateVideo = (video, newData) => {
//     console.log("dao: udpate video")
//     console.log("video", video)
//     return videoCommentModel.findOneAndUpdate(video._id, newData);
// }
    
