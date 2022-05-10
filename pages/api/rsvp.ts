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

  // TODO search for name in db and return PIN

  // !temp just returns an ID between 1 and 10
  const partyId = Math.floor(Math.random() * 10) + 1;

  res.status(200).json({ partyId });
}

export default handler;
