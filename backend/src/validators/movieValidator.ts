import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z.number().int().min(1888, "Year must be valid"),
  description: z.string().min(1, "Description is required"),
  runtime: z.number().int().positive("Runtime must be positive"),
  country: z.string().min(1, "Country is required"),
  budget: z.number().nonnegative("Budget must be 0 or more"),
  directorId: z.number().int().positive("Director ID is required"),
});