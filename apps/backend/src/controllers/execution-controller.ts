import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { executeCommand } from '../utils/execute';

const prisma = new PrismaClient();

export const run = async (req: Request, res: Response) => {
  try {
    const { projectId, filename } = req.body;

    const namespace = 'default';
    let podName = '';
    let containerName = '';

    const projectInfo = await prisma.project.findUnique({
      where: { id: projectId },
      select: { name: true },
    });

    let command = ['/bin/sh', '-c', `node ${filename}`];

    podName = projectInfo?.name as string;
    containerName = projectInfo?.name as string;

    executeCommand({
      namespace,
      podName,
      containerName,
      command,
    })
      .then((result) => {
        res.status(201).json({ message: 'executed', result });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
