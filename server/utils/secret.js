import dotenv from 'dotenv';
dotenv.config();

export default {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    FFMPEG_ENV: process.env.FFMPEG_ENV ?? "development",
    SPOTIFY_CLIEND_ID: process.env.SPOTIFY_CLIEND_ID,
    SPOTIFY_CLIEND_SECRET_ID: process.env.SPOTIFY_CLIEND_SECRET_ID,
    X_ADMIN_API_KEY: process.env.X_ADMIN_API_KEY,
    X_ADMIN_TOKEN_KEY: process.env.X_ADMIN_TOKEN_KEY,
    SOUNDCLOUD_API_KEY: process.env.SOUNDCLOUD_API_KEY
}