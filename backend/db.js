const { default: mongoose } = require("mongoose");
const mongoURI =
	"mongodb+srv://abbassihorwala53:i1IDgkxxm2oIDP64@cluster0.hn4xam2.mongodb.net/?retryWrites=true&w=majority";

const  connectToMongo =
	(mongoURI,
		async() => {
		await mongoose.connect(mongoURI);
		console.log("connected to mongo successfully");
	});
module.exports = connectToMongo;
