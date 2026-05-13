import { Router } from "express";
import {getMovies, getMovieById, createMovie, updateMovie, deleteMovie,} from "../controllers/movieController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);

router.post("/", authMiddleware, roleMiddleware(["admin"]), createMovie);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateMovie);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteMovie);

export default router;