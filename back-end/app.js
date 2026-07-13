import express from "express";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";

// error
import errorMiddleware from "./middlewares/errorMiddleware.js";
import AppError from "./utils/appError.js";

// routes
import gamesRouter from "./routers/gamesRouter.js";
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
import reviewsRouter from "./routers/reviewsRouuter.js";

const app = express();

// to allow cors requests from other domains
app.use(cors());

app.use(express.json({ limit: "20kb" }));

// security for http headers
app.use(helmet());

// prevent parameter pollution
app.use(hpp());

// limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: "fail",
    message: "لقد تجاوزت الحد المسموح من الطلبات، حاول مرة أخرى بعد 15 دقيقة.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", apiLimiter);

// routes
app.use("/api/v1/games", gamesRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/reviews", reviewsRouter);

// if the route is not found
app.use((req, res, next) => {
  const err = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(err);
});

// error handler
app.use(errorMiddleware);

export default app;
