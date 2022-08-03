import { NextApiRequest, NextApiResponse } from 'next';
import { ResultData, IGuest } from '../../types/types';
import dbConnect from '../../lib/dbConnect';
import Guest from '../../models/Guest';

async function handler(req: NextApiRequest, res: NextApiResponse<ResultData>) {
  await dbConnect();

  // gimme errbody
  const guests = await Guest.find<IGuest>({});

  if (guests.length) {
    res.status(200).json({
      success: true,
      message: `Here's all the guests!`,
      party: guests,
    });
  } else {
    // no result??
    res.status(404).json({
      success: false,
      message: `Sorry! We weren't able to locate anybody`,
    });
  }
}

export default handler;
