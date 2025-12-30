import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { localStrategy } from './strategies/localStrategy.js';
import { router as apiRouter } from './routes/api.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type'],
  })
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use(localStrategy);

app.use('/api', apiRouter);

app.use((req, res, next) => {
  const error = new Error('Oops... It seems like you are lost!');
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  // Log the full error for server-side debugging
  console.error('[Error] ', {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  // In production, don't leak internal server errors to the client
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong on our end. Please try again later.',
    });
  }

  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log('Server running on port: ', PORT);
});
