// imports
import express from "express";
import morgan from "morgan";
import multer from "multer";
import session from "express-session";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/routes.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
(async () => {
  try {
    if (!process.env.DB_URI) {
      throw new Error("DB_URI is not defined in the environment variables.");
    }
    await mongoose.connect(process.env.DB_URI, {}); // Add any options if needed for mongoose connection
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed", err.message);
  }
})();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "my secret key", // Move the secret to an environment variable for security
    saveUninitialized: true,
    resave: false,
    cookie: { secure: process.env.NODE_ENV === "production" }, // Secure cookies in production
  })
);

// Middleware to make session messages available in templates
app.use((req, res, next) => {
  res.locals.message = req.session.message; // Assuming 'message' is being set in sessions somewhere
  next();
});

// Set the view engine (EJS)
app.set("view engine", "ejs");

// Serve static files (CSS, JS, images from "public" folder)
app.use(express.static("uploads"));
app.use(express.static("public"));
app.use(express.static("node_modules"));

// Routes prefix

app.use("/", router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
