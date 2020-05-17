import express, { Request, Response } from 'express';

const router = express();

router.put('/api/orders/:orderId', async (req: Request, res: Response) => {
  res.send({});
});

export { router as updateOrderRouter };
