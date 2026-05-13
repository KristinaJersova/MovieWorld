import { Router } from "express";
import prisma from "../prisma/prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const genres = await prisma.genre.findMany({
      include: {
        movies: {
          include: {
            movie: true,
          },
        },
      },
    });

    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: "Error loading genres", error });
  }
});

router.post("/", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  try {
    const { name } = req.body;

    const genre = await prisma.genre.create({
      data: { name },
    });

    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ message: "Error creating genre", error });
  }
});

router.put("/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const genre = await prisma.genre.update({
      where: { id },
      data: { name },
    });

    res.json(genre);
  } catch (error) {
    res.status(500).json({ message: "Error updating genre", error });
  }
});

router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.genre.delete({
      where: { id },
    });

    res.json({ message: "Genre deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting genre", error });
  }
});

export default router;