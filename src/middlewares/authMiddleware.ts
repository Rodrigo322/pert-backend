import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface DecodedToken {
  userId: string;
}

export async function handleAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const token = authHeader.substring(7);

  const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

  if (!MY_SECRET_KEY) {
    throw new Error("Chave secreta não fonercida");
  }

  const decodedToken = verify(token, MY_SECRET_KEY) as DecodedToken;

  req.user = { id: decodedToken.userId };
  next();
}
