const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tailoringInfo = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        style: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        season: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        neckSize: {
            type: String,
            required: true,
        },
        chest: {
            type: String,
            required: true,
        },
        west: {
            type: String,
            required: true,
        },

        shoulder: {
            type: String,
            required: true,
        },

        length: {
            type: String,
            required: true,
        },

        stomach: {
            type: String,
            required: true,
        },

        shoulderLength: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);
const tailoringInfo_Schema = mongoose.model(
    "tailoringInfo",
    tailoringInfo
);
module.exports = tailoringInfo_Schema;
