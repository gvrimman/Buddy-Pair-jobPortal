const mongoose = require("mongoose");


const url = process.env.MONGO_URL;

const dbConfig = async () => {
	try {
		await mongoose.connect(url);
		console.log("Connected with mongodb");
	} catch (error) {
		console.log("There is some problem on connecting", error);
		process.exit(0);
	}
};

module.exports = dbConfig;
