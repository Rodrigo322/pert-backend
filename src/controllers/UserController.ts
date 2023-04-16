import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export class UserController {
  async createUser(request: Request, response: Response) {
    const { name, email } = request.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return response.status(201).json(user);
  }
  async getUsers(request: Request, response: Response) {
    const users = await prisma.user.findMany();
    return response.status(200).json(users);
  }
  async getUser(request: Request, response: Response) {
    const { id } = request.params;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return response.status(200).json(user);
  }
}
