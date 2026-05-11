import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRoutes from "../src/routes/movieRoutes.js";
import directorRoutes from "../src/routes/direktorRoutes.js";
import actorRoutes from "./routes/actorRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import movieRelationRoutes from "./routes/movieRelationRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});