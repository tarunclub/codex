import { Request, Response } from 'express';
import amqp from 'amqplib/callback_api';
import { createPod, projectInfo } from '../utils/createPod';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, userId, containerPort, language } = req.body;

    const newName = `${name}-${crypto.randomBytes(4).toString('hex')}`;

    let image = '';
    if (language === 'nodejs') {
      image = 'tarunclub/nodejs-env:1.0.0';
    }

    amqp.connect('amqp://localhost', (err, conn) => {
      conn.createChannel((err, ch) => {
        const q = 'pod-creation-queue';

        ch.assertQueue(q, { durable: false });

        ch.sendToQueue(
          q,
          Buffer.from(
            JSON.stringify({
              name: newName,
              description,
              image,
              userId,
              containerPort,
            })
          )
        );
      });
    });

    await createPod();

    const result = await prisma.project.create({
      data: {
        name: newName,
        description,
        language,
      },
    });

    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
