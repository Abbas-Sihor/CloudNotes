const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { query, validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "iamagoodboy";
const getuserDetail = require("../middleware/getuserDetail");

// ROUTES 1 :router /api/auth/signup POST => Login Not Required

router.post(
	"/signup",
	// validate the input field using express validator
	[
		body("name", "Enter a valid name").isLength({ min: 3 }),
		body("email", "Enter a valid email").isEmail(),
		body("password", "Enter a valid password").isLength({ min: 5 }),
	],
	async (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({ error: error.array() });
		}
		// Checking Weather The User already Exsist Or Not
		try {
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res.status(400).json({ error: "user already exsist" });
			}
			// Hashing The Password Using Bcrypt.js
			const salt = await bcrypt.genSalt(10);
			const secpass = await bcrypt.hash(req.body.password, salt);

			//Creatin The User In Database
			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: secpass,
			});

			// Providing a jwt Token To The user

			const data = {
				user: {
					id: user.id,
				},
			};
			const token = jwt.sign(data, jwtsecret);
			console.log(token);

			res.json({success:true, token: token });

			console.log("USER SAVED SUCCESSFULLY!!!");
		} catch (error) {
			console.log(error.message);
			res.status(500).send("internal error occured");
		}
	}
);

//router:2 /api/auth/login POST => Login Not Required

router.post(
	"/login",

	// validate the input field using express validator

	[
		body("email", "Enter a valid email").isEmail(),
		body("password", "password can't be blank").exists(),
	],
	async (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({ error: error.array() });
		}

		// Checking Weather The User Exsist Or Not

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({ error: "Login with correct credentials" });
			}

			// Comparing The Password

			const passwordCompare = await bcrypt.compare(password, user.password);

			if (!passwordCompare) {
				return res
					.status(400)
					.json({ error: "Login with correct credentials" });
			}

			// Providing a jwt Token To The user
     
			const data = {
				user: {
					id: user.id,
				},
			};
			const token = jwt.sign(data, jwtsecret);

			res.json({success:true, token: token });
		} catch (error) {
			console.log(error.message);
			res.status(500).send("internal error occured");
		}
	}
);

// ROUTES 3 :router /api/auth/getuser POST => Login Required

router.post("/getuser", getuserDetail, async (req, res) => {
	// Finding The User From The Id Which We Get From The jwt Token Attached
	// At Header => All This Work Is Done In Teh MiddleWare getuserDetail.js

	try {
		Id = req.user.id;
		const user = await User.findById(Id).select("-password");
		res.json({ user });
	} catch (error) {
		console.log(error.message);
		res.status(500).send("internal error occured");
	}
});



module.exports = router;
