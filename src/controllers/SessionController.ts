import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class SessionController {
  async createSession(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isPasswordValid = await compare(password, user.password!);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Senha incorreta." });
    }

    const MY_SECRET_KEY = process.env.MY_SECRET_KEY;

    if (!MY_SECRET_KEY) {
      throw new Error("Chave secreta não fonercida");
    }

    const token = sign(
      {
        userId: user.id,
      },
      MY_SECRET_KEY,
      {
        algorithm: "HS256",
        expiresIn: "1d",
      }
    );

    return res.status(200).json({ token });
  }
}
