import { Router } from "express";
import {getMovies,getMovieById,createMovie,updateMovie,deleteMovie,} from "../controllers/movieController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { validate } from "../middleware/validate.js";
import { movieSchema } from "../validators/movieValidator.js";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);

router.post("/",authMiddleware,roleMiddleware(["admin"]),validate(movieSchema),createMovie);
router.put("/:id",authMiddleware,roleMiddleware(["admin"]),validate(movieSchema),updateMovie);
router.delete("/:id",authMiddleware,roleMiddleware(["admin"]),deleteMovie);

export default router;