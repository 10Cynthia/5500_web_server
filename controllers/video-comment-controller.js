import * as dao from "./video-comment-dao.js"

let currentVideo = null;

const VideoCommentsController = (app) => {
    const getCommentsByVideoID = async (req, res, next) => {
        try {
            console.log("in get comments by video id")
            const videoID = req.params.videoID;
            const video = await dao.findByVideoID(videoID)
            console.log(videoID);
            console.log(video);
            return res.json(video);
        } catch (ex) {
            next(ex);
        }
    }

    const addVideoComment = async(req, res, next) => {
        try {
            console.log("in add comment")
            const newVideoComment = req.body;
            console.log("new video comment as: ", newVideoComment)

            const ret = await dao.createVideoComment(newVideoComment)
            console.log(ret);
            return res.json(ret);
        } catch (ex) {
            next(ex);
        }
    }

    const updateVideoComment = async(req, res, next) => {
        try {
            console.log("in controller - update comment")
            const cid = req.params.cid;
            const updatedVideoComment = req.body;
            console.log("cid: ", cid, " updated video comment as: ", updatedVideoComment)

            const ret = await dao.updateComment(cid, updatedVideoComment)
            console.log(ret);
            return res.json(ret);

        } catch (ex) {
            next(ex);
        }
    }

    const deleteVideoComment = async(req, res, next) => {
        try {
            console.log("in controller - delete comment")
            const cid = req.params.cid;

            const ret = await dao.deleteComment(cid)
            console.log(ret);
            return res.json(ret);

        } catch (ex) {
            next(ex);
        }
    }

    app.get("/api/videos/:videoID/getcomments", getCommentsByVideoID);
    app.post("/api/videos/:videoID/addcomment", addVideoComment);
    app.put("/api/videos/updatecomment/:cid", updateVideoComment);
    app.delete("/api/videos/deletecomment/:cid", deleteVideoComment);
    

};

export default VideoCommentsController;