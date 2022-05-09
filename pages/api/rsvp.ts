import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get data submitted in request's body.
  const { body } = req;

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('body: ', body);

  res.status(200).json({ data: body.name as string });
}

export default handler;
