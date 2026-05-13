import { Router } from "express";
import prisma from "../prisma/prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const actors = await prisma.actor.findMany({
      include: {
        movies: {
          include: {
            movie: true,
          },
        },
      },
    });

    res.json(actors);
  } catch (error) {
    res.status(500).json({ message: "Error loading actors", error });
  }
});

router.post("/", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  try {
    const { name } = req.body;

    const actor = await prisma.actor.create({
      data: { name },
    });

    res.status(201).json(actor);
  } catch (error) {
    res.status(500).json({ message: "Error creating actor", error });
  }
});

router.put("/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const actor = await prisma.actor.update({
      where: { id },
      data: { name },
    });

    res.json(actor);
  } catch (error) {
    res.status(500).json({ message: "Error updating actor", error });
  }
});

router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.actor.delete({
      where: { id },
    });

    res.json({ message: "Actor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting actor", error });
  }
});

export default router;