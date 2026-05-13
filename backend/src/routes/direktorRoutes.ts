import { Router } from "express";
import prisma from "../prisma/prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const directors = await prisma.director.findMany({
      include: {
        movies: true,
      },
    });

    res.json(directors);
  } catch (error) {
    res.status(500).json({
      message: "Error loading directors",
      error,
    });
  }
});

router.post("/", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  try {
    const { name } = req.body;

    const director = await prisma.director.create({
      data: {
        name,
      },
    });

    res.status(201).json(director);
  } catch (error) {
    res.status(500).json({
      message: "Error creating director",
      error,
    });
  }
});

router.put("/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const director = await prisma.director.update({
      where: { id },
      data: { name },
    });

    res.json(director);
  } catch (error) {
    res.status(500).json({
      message: "Error updating director",
      error,
    });
  }
});

router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.director.delete({
      where: { id },
    });

    res.json({
      message: "Director deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting director",
      error,
    });
  }
});

export default router;