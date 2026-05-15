import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import movieRoutes from "./routes/movieRoutes.js";
import directorRoutes from "./routes/direktorRoutes.js";
import actorRoutes from "./routes/actorRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import movieRelationRoutes from "./routes/movieRelationRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import omdbRoutes from "./routes/omdbRoutes.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

import { errorMiddleware } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "MovieWorld API working",
  });
});

app.use("/api/movies", movieRoutes);
app.use("/api/directors", directorRoutes);
app.use("/api/actors", actorRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/movies", movieRelationRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/omdb", omdbRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});