// Load environment variables from .env
require('dotenv').config();

// Core dependencies
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

// Initialize Express app
const app = express();

// Port configuration
const port = process.env.PORT || 5000;

// Session configuration with MongoDB store
app.use(session({
    secret: process.env.SESSION_SECRET, // secure session secret
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI // MongoDB session store
    }),
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds (604800000)
    }
}));

// Initialize Passport.js for authentication
app.use(passport.initialize());
app.use(passport.session());

// Parse incoming form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set 'user' globally for all EJS views
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Override HTTP methods using _method query (for PUT/DELETE)
app.use(methodOverride('_method'));

// Connect to MongoDB
connectDB();

// Serve static assets from /public folder
app.use(express.static('public'));

// Set EJS as templating engine with layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');

// Routes (organized by purpose)
app.use('/', require('./server/routes/index'));      // public pages (home, about)
app.use('/', require('./server/routes/dashboard'));  // protected user pages
app.use('/', require('./server/routes/auth'));       // Google OAuth login/logout

// 404 handler — fallback for all unmatched routes
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404 - Not Found',
        description: 'The page you are looking for does not exist.'
    });
});

// Start server
app.listen(port, () => {
    console.log(`✅ Listening on http://localhost:${port}`);
});
