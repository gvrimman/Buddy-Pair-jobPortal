const express = require("express");
const cors = require("cors");
require("dotenv").config();
const dbConfig = require("./config/db");
const apiRoutes = require("./routes/index");
const { app, server } = require("./socket/socket");
const gloabalErrorHandler = require("./utils/gloabalErrorHandler");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport");
// port
const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: "GET,POST,PUT, PATCH,DELETE",
		credentials: true,
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);
app.use(cookieParser());

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: true,
			httpOnly: true,
			sameSite: "None",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		},
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRoutes);

app.use(gloabalErrorHandler);

// Makes the app to listen port
dbConfig().then(() => {
	server.listen(PORT, () => {
		console.log(`server running on: http://localhost:${PORT}`);
	});
});
