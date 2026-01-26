const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "script-src": ["'self'", "'unsafe-inline'"],
            "style-src": ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
            "font-src": ["'self'", "fonts.gstatic.com"],
            "img-src": ["'self'", "data:", "res.cloudinary.com"],
        },
    },
}));

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.ALLOWED_ORIGIN,
    'https://portfolio-website-vishnu-6rmv.vercel.app',
    'http://localhost:5173',
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key']
}));

// Logging Middleware for debugging
app.use((req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    }
    next();
});

// body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Database Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Routes
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

// Error Handling
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use(errorHandler);

// Start Server
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    });
} else {
    // In production (like Vercel), we connect to DB but don't call listen
    // Vercel handles the execution of the app
    connectDB();
}

module.exports = app;
