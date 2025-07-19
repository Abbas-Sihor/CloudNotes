const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const { query, validationResult, body } = require("express-validator");
const getuserDetail = require("../middleware/getuserDetail");

// ROUTES 1 : Fetching alll notes the notes /api/auth/getuser GET => Login Required

router.get("/fetchallnote", getuserDetail, async (req, res) => {
	try {
		const notes = await Note.find({ user: req.user.id });
		res.json(notes);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("internal error occured");
	}
});

// ROUTES 2 : Adding a note  /api/auth/addnote POST => Login Required

router.post(
	"/addnote",
	getuserDetail,
	[
		body("title", "Enter a valid title").isLength({ min: 3 }),
		body("description", "Enter a valid description").isLength({ min: 5 }),
	],
	async (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({ error: error.array() });
		}
		const { title, description, tag } = req.body;

		const notes = new Note({ title, description, tag, user: req.user.id });
		const savenote = await notes.save();
		res.json(savenote);
		console.log(savenote)
	}
);

// ROUTES 3 :Updating A note  /api/auth/updatenote PUt => Login Required
router.put(
	"/updatenote/:id",
	getuserDetail,
	[
		body("title", "Enter a valid name").isLength({ min: 3 }),
		body("description", "Enter a valid description").isLength({ min: 5 }),
	],
	async (req, res) => {
		try {
			
			const error = validationResult(req);
			if (!error.isEmpty()) {
				return res.status(400).json({ error: error.array() });
			}
			const newnote = {};
			const { title, description, tag } = req.body;
			if (title) {
				newnote.title = title;
			}
			if (description) {
				newnote.description = description;
			}
			if (tag) {
				newnote.tag = tag;
			}
			let note = await Note.findById(req.params.id);
			if (!note) {
				res.status(401).send("note not found");
			}
	
			if (note.user.toString() !== req.user.id) {
				res.status(401).send({ error: "Access Denied" });
			}
	
			note = await Note.findByIdAndUpdate(
				req.params.id,
				{ $set: newnote },
				{ new: true }
			);
			res.json({ note: note });
		} catch (error) {
			console.log(error.message);
			res.status(500).send("internal error occured");
			
		}
	}
);

// ROUTES 3 :Deleting A note  /api/auth/deletenote DELETE => Login Required
router.delete("/deletenote/:id", getuserDetail, async (req, res) => {
	
		let note = await Note.findById(req.params.id);
		if (!note) {
			res.status(401).send("note not found");
		}
		console.log(note.user.toString());
		console.log(req.user.id);
		if (note.user.toString() !== req.user.id) {
			res.status(401).send({ error: "Access Denied" });
		}
	
		note = await Note.findByIdAndDelete(req.params.id);
		res.json({ note: note });
		
	 
		
});

module.exports = router;
