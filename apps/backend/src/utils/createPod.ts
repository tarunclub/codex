import amqp from 'amqplib';
import { KubeConfig, CoreV1Api } from '@kubernetes/client-node';

interface ProjectInfo {
  name: string;
  description: string;
  image: string;
  userId: string;
  containerPort: number;
}

const kc = new KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(CoreV1Api);

export let projectInfo: ProjectInfo;

async function handleMessage(msg: any) {
  projectInfo = JSON.parse(msg.content.toString());

  // create pod
  const pod = {
    metadata: {
      name: projectInfo.name,
      labels: {
        app: projectInfo.name,
      },
    },
    spec: {
      containers: [
        {
          name: projectInfo.name,
          image: projectInfo.image,
          ports: [
            {
              containerPort: projectInfo.containerPort,
            },
          ],
        },
      ],
    },
  };

  try {
    await k8sApi.createNamespacedPod('default', pod);
  } catch (err: any) {
    console.log('Error:', err.message);
  }
}

export async function createPod() {
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();

  const q = 'pod-creation-queue';

  await ch.assertQueue(q, { durable: false });

  ch.consume(q, handleMessage, { noAck: true });
}
