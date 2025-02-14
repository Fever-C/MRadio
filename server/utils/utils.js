import fsHelper from "./helper/fs-helper.js";
import fs from 'fs';
import { token_set_ratio } from 'fuzzball';
import { AUTH_TOKEN_LOCATION, SONG_QUEUE_LOCATION, BLOCK_LIST_LOCATION, DEFAULT_TRACKS_LOCATION } from "./constant.js";
import logger from "./logger.js";
import secret from "./secret.js";
import ffmpegStatic from 'ffmpeg-static';
import pathHelper from "./helper/path-helper.js";
/**
 * ====================
 * Common Utils
 * ====================
 */

export const getFfmpegPath = () => {
    const env = secret.FFMPEG_ENV;
    if (env === 'production') {
        return '/usr/bin/ffmpeg';
    } else if (env === 'development') {
        return ffmpegStatic;
    } else {
        throw new Error("Unknown environment");
    }
}

function calculateSimilarity(str1, str2) {
    const similarity = token_set_ratio(str1, str2);
    return similarity;
}
export const getCookiesPath = () => {
    logger.info("Fetching the cookies")
    const cookiesPath = pathHelper.join('config', 'cookies.txt');
    const isExist = fsHelper.exists(cookiesPath);
    
    if (!isExist) {
        const directoryPath = pathHelper.getDir(cookiesPath);
        if (!fsHelper.exists(directoryPath)) {
            fsHelper.createDirectory(directoryPath);
        }
        fs.writeFileSync(cookiesPath, '');
        logger.info('Created new empty cookies.txt file');
    }
    
    return cookiesPath;
}

export const getQueueListJson = () => {
    return fsHelper.readFromJson(SONG_QUEUE_LOCATION, []);
}
export const saveQueueListJson = (data) => {
    return fsHelper.writeToJson(SONG_QUEUE_LOCATION, data);
}

export const getTokenListJson = () => {
    return fsHelper.readFromJson(AUTH_TOKEN_LOCATION, []);
}

export const saveTokenListJson = (data) => {
    return fsHelper.writeToJson(AUTH_TOKEN_LOCATION, data);
}

export const getBlockListJson = () => {
    return fsHelper.readFromJson(BLOCK_LIST_LOCATION, []);
}

export const saveBlockListJson = (data) => {
    return fsHelper.writeToJson(BLOCK_LIST_LOCATION, data);
}

export const getSpotifyConfigJson = () => {
    return fsHelper.readFromJson(SPOTIFY_TOKEN_LOCATION, {});
}

export const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const durationFormatter = (duration) => {
    if (typeof duration === "string" && duration.includes(":")) {
        return duration;
    }

    const numDuration = Number(duration);

    if (isNaN(numDuration)) {
        logger.info('Invalid duration, returning 00:00');
        return "00:00";
    }

    const minutes = Math.floor(numDuration / 60);
    const seconds = Math.floor(numDuration % 60);
    const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formatted;
};

export const checkSimilarity = (original, found) => {
    const similarity = calculateSimilarity(original, found);
    return similarity;
};

export const extractYoutubePlaylistId = (url) => {
    const urlParams = new URL(url).searchParams;
    const playlistId = urlParams.get('list');
    return playlistId;
}

export const addYoutubeVideoId = (videoId) => {
    const baseUrl = 'https://www.youtube.com/watch';
    const url = new URL(baseUrl);
    url.searchParams.set('v', videoId);
    return url.toString();
}
