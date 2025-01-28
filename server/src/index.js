const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const dbConfig = require("./config/db");
const apiRoutes = require("./routes/index");
const { app, server } = require("./socket/socket");
const gloabalErrorHandler = require("./utils/gloabalErrorHandler");
const NotFoundErrorHandler = require("./utils/NotFoundErrorHandler");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
// port
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
  // middlewares
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 50, // Limit each IP to 50 requests per window
      message: "Too many login attempts, please try again after 15 minutes.",
    })
  );
}
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		//methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
		credentials: true,
		//allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token", "Accept"],
	})
);

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      domain: process.env.COOKIE_DOMAIN,
    },
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

// Create a write stream for logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' });

// Log to console and access.log file
app.use(morgan('combined', { stream: accessLogStream }));

// Optional: Log to console for development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRoutes);

app.use(NotFoundErrorHandler);

app.use(gloabalErrorHandler);

// Server error logger
process.on("unhandledRejection", (reason, promise) => {
  console.log(`[unhandledRejection]: `, reason);
});

process.on("uncaughtException", (err, origin) => {
  console.log("[uncaughtException]: ", origin, err);
});

app.set("trust proxy", true);

// Makes the app to listen port
dbConfig().then(() => {
	server.listen(PORT, () => {
		console.log(`server running on: http://localhost:${PORT}`);
	});
});
