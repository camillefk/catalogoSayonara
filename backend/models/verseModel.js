const mongoose = require('mongoose');

const verseSchema = new mongoose.Schema(
    {
        text: { type: String, required: true},
    },
    { timestamps: true } //garante ter a data de criação
);

module.exports = mongoose.model("Verse", verseSchema);