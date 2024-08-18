import { Response } from "express";

export const errorHandler = (res: Response, error: unknown): void => {
  if (error instanceof Error) {
    res.status(400).send({ error: error.message });
  } else {
    res.status(500).send({ error: "An unexpected error occurred" });
  }
};
