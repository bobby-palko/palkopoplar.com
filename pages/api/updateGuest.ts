import { NextApiRequest, NextApiResponse } from 'next';
import { RSVPSubmitForm, ResultData } from '../../types/types';
import dbConnect from '../../lib/dbConnect';
import Guest from '../../models/Guest';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: RSVPSubmitForm;
}

async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ResultData>
) {
  try {
    const { guests } = req.body;

    await dbConnect();

    guests.forEach(async (guest) => {
      await Guest.updateOne(
        { _id: guest._id },
        {
          ...guest,
        }
      );
    });

    res.status(200).json({
      success: true,
      message: 'updated RSVPs successfully!',
    });
  } catch (e: any) {
    res.status(500).json({
      success: false,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      message: `Something went wrong: ${e.message as string}`,
    });
  }
}

export default handler;
