const mongoose = require("mongoose")

const fashionerSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,

    },
    gender: {
        type: String,
        require:true
    },
    location: {
        type: String,
        require:true
    },
    services: {
        type: String,
        required:true,
    }

}, {
    timestamps: true,
}
);

const Fashioner = mongoose.model("Fashioner", fashionerSchema)
module.exports= Fashioner;
