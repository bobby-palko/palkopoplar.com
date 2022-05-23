import type { NextApiRequest, NextApiResponse } from 'next';
import { RSVPForm } from '../rsvp';

type ReturnData = {
  success: boolean;
  message: string;
  party?: {
    partyId: number;
    name: string;
  };
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: RSVPForm;
}

function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ReturnData>
) {
  // Get data submitted in request's body.
  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('body: ', req.body);

  // TODO search for name in db and return partyId
  const { name } = req.body;

  // !temp just returns an ID between 1 and 10
  let partyId = Math.floor(Math.random() * 10) + 1;
  if (name === 'bobby') {
    partyId = 0;
  }

  // found it, return the party
  if (partyId > 0) {
    res.status(200).json({
      success: true,
      message: `We hope you can make it!`,
      party: {
        partyId,
        name,
      },
    });
  } else {
    // didn't find it, return a not found message
    res.status(200).json({
      success: false,
      message: `We couldn't find that name.`,
    });
  }
}

export default handler;
