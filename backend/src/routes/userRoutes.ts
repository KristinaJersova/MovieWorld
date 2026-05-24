import { Router } from "express";
import prisma from "../prisma/prisma.js";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/profile", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        views: {
          include: {
            movie: true,
          },
          orderBy: {
            viewedAt: "desc",
          },
        },
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error loading profile", error });
  }
});

export default router;