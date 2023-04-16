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
}
