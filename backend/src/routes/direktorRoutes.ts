import { Router } from "express";
import prisma from "../prisma/prisma.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const directors = await prisma.director.findMany();

    res.json(directors);
  } catch (error) {
    res.status(500).json({
      message: "Error loading directors",
      error,
    });
  }
});

router.post("/", async (req, res) => {
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

export default router;