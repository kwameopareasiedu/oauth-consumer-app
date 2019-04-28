const path = require("path");
const http = require("http");
const logger = require("morgan");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const debug = require("debug")("agile-model-project");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const helmet = require("helmet");
// const csurf = require("csurf");

const app = express();

//=====================SETUP MONGO DB==============================
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", console.log.bind(console, "connected to mongo!"));
//=================================================================

//=====================VIEW ENGINE SETUP===========================
app.set("views", path.join(__dirname, "../../dist"));
app.set("view engine", "ejs");
//=================================================================

//=====================SETUP SERVICES==============================
const services = require("./services");
global._services = services;
//=================================================================

//=====================SETUP MIDDLEWARES===========================
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../dist")));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		name: "agile-model-project-session",
		saveUninitialized: true,
		rolling: true,
		resave: true,
		cookie: { maxAge: 3600000, httpOnly: true },
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
);
app.use(helmet());
// app.use(csurf());

// // Attach CSRF Token
// app.use((req, res, next) => {
// 	if (process.env.NODE_ENV !== "testing") res.cookie("XSRF-TOKEN", req.csrfToken());
// 	return next();
// });
//=================================================================

//=====================SETUP ROUTES================================
require("./routes")(app);
//=================================================================

//=====================ERROR HANDLERS==============================
// CSRF error handler
app.use((err, req, res, next) => {
	if (err.code !== "EBADCSRFTOKEN") return next(err);
	res.status(403).json({ error: 403, message: "Session has expired or form has been tampered with" });
});

// General error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	res.json({ error: err.status || 500, message: err.message });
});
//=================================================================

//=====================SETUP SERVER================================
const normalizePort = val => {
	const port = parseInt(val, 10);

	// named pipe
	if (isNaN(port)) return val;

	// port number
	if (port >= 0) return port;

	return false;
};

/* Event listener for HTTP server "error" event */
const onError = error => {
	if (error.syscall !== "listen") throw error;

	const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
};

/* Event listener for HTTP server "listening" event */
const onListening = () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
//=================================================================
