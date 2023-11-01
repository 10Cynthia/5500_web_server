import mongoose from "mongoose";
const userProfileSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        country: { type: String, required: true },
        age: { type: String, default: "30" },
        interest: { type: String, default: "Music" },
        hometown: { type: String, default: "Irvine" },
        avatar: { type: String, default: "/images/avatar/profile.png" },
        banner: { type: String, default: "/images/profile-banner.jpeg" },
        likes: [

                {
                         videoId: String,
                         videoTitle: String,
                        channelTitle: String }],
        follows: [
            {
                username: String,
                country: String
            }],
    },
    { collection: "userProfile" }
);

const userModel = mongoose.model("userProfile", userProfileSchema)
export default userModel