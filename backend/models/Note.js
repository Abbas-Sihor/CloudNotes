const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},

	title: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		require: true,
		unique: false 
	},
	tag: {
		type: String,
		default: "general",
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
module.exports = mongoose.model("note", NoteSchema);
