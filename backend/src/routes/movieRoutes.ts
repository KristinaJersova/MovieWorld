import { Router } from "express";
import {getMovies,getMovieById,createMovie,updateMovie,deleteMovie,} from "../controllers/movieController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { validate } from "../middleware/validate.js";
import { movieSchema } from "../validators/movieValidator.js";

const router = Router();

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags:
 *       - Movies
 *     responses:
 *       200:
 *         description: List of movies
 */
router.get("/", getMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get movie by ID
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movie found
 *       404:
 *         description: Movie not found
 */
router.get("/:id", getMovieById);

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create movie
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - year
 *               - description
 *               - runtime
 *               - country
 *               - budget
 *               - directorId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Interstellar
 *               year:
 *                 type: integer
 *                 example: 2014
 *               description:
 *                 type: string
 *                 example: Space science fiction movie
 *               runtime:
 *                 type: integer
 *                 example: 169
 *               country:
 *                 type: string
 *                 example: USA
 *               budget:
 *                 type: number
 *                 example: 165000000
 *               directorId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Movie created
 *       400:
 *         description: Validation error
 *       401:
 *         description: No token provided
 *       403:
 *         description: Forbidden
 */
router.post("/",authMiddleware,roleMiddleware(["admin"]),validate(movieSchema),createMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update movie
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - year
 *               - description
 *               - runtime
 *               - country
 *               - budget
 *               - directorId
 *             properties:
 *               title:
 *                 type: string
 *                 example: Interstellar
 *               year:
 *                 type: integer
 *                 example: 2014
 *               description:
 *                 type: string
 *                 example: Space science fiction movie
 *               runtime:
 *                 type: integer
 *                 example: 169
 *               country:
 *                 type: string
 *                 example: USA
 *               budget:
 *                 type: number
 *                 example: 165000000
 *               directorId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Movie updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: No token provided
 *       403:
 *         description: Forbidden
 */
router.put("/:id",authMiddleware,roleMiddleware(["admin"]),validate(movieSchema),updateMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete movie
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movie deleted
 *       401:
 *         description: No token provided
 *       403:
 *         description: Forbidden
 */
router.delete("/:id",authMiddleware,roleMiddleware(["admin"]),deleteMovie);

export default router;