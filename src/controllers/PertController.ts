import { Request, Response } from "express";

import { prisma } from "../utils/prisma";
import { calculate_pert } from "../utils/calculate_pert";

export class PertController {
  async create(request: Request, response: Response) {
    const { title, description, optimistic, nominal, pessimistic, unitTime } =
      request.body;

    const { userId } = request.params;

    const estimated = calculate_pert(optimistic, nominal, pessimistic);

    const pert = await prisma.pert.create({
      data: {
        title,
        description,
        optimistic,
        nominal,
        pessimistic,
        estimated: Number(estimated.toFixed(2)),
        unitTime,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return response.status(201).json(pert);
  }

  async getPerts(request: Request, response: Response) {
    const perts = await prisma.pert.findMany();

    return response.status(200).json(perts);
  }

  async getPertsByUser(request: Request, response: Response) {
    const { userId } = request.params;

    const perts = await prisma.pert.findMany({
      where: { User: { id: userId } },
    });

    return response.status(200).json(perts);
  }

  async getPert(request: Request, response: Response) {
    const { id } = request.params;
    const pert = await prisma.pert.findUnique({
      where: { id },
    });
    return response.status(200).json(pert);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, description, optimistic, nominal, pessimistic, unitTime } =
      request.body;

    const estimated = calculate_pert(optimistic, nominal, pessimistic);

    const pert = await prisma.pert.update({
      where: { id },
      data: {
        title,
        description,
        optimistic,
        nominal,
        pessimistic,
        unitTime,
        estimated: Number(estimated.toFixed(2)),
      },
    });

    return response.status(200).json(pert);
  }
}
