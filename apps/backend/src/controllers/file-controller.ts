import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { executeCommand } from '../utils/execute';

const prisma = new PrismaClient();

export const createFile = async (req: Request, res: Response) => {
  try {
    const { projectId, name, content } = req.body;

    const namespace = 'default';
    let podName = '';
    let containerName = '';
    let command = [
      '/bin/sh',
      '-c',
      `touch ${name} && echo "${content}" > ${name}`,
    ];

    await prisma.file.create({
      data: {
        filename: name,
        content,
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    const projectInfo = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    podName = projectInfo?.name as string;
    containerName = projectInfo?.name as string;

    await executeCommand({
      namespace,
      podName,
      containerName,
      command,
    });

    res.status(201).json({ message: 'File created successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
