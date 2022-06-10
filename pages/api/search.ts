import { NextApiRequest, NextApiResponse } from 'next';
import { RSVPForm, ResultData, IGuest } from '../../types';
import dbConnect from '../../lib/dbConnect';
import Guest from '../../models/Guest';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: RSVPForm;
}

async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ResultData>
) {
  const { name } = req.body;

  await dbConnect();

  const party = [];

  const guests = await Guest.find<IGuest>({
    name: { $regex: name, $options: 'i' },
  });

  if (guests.length > 1) {
    res.status(400).json({
      success: false,
      message: `There are multiple names matching "${name}". Please be more specific.`,
    });
  } else {
    const guest = guests[0];

    if (!guest) {
      res.status(404).json({
        success: false,
        message: `Sorry! We weren't able to locate that name`,
      });
    } else {
      party.push(guest);
      if (guest.partnerId) {
        const partner = await Guest.findById<IGuest>(guest.partnerId);

        if (!partner) {
          res.status(404).json({
            success: false,
            message: `Sorry! There's some confusion on if you have a guest.`,
          });
        } else {
          party.push(partner);
          res.status(200).json({
            success: true,
            message: `We're excited to have you!`,
            party,
          });
        }
      }
    }
  }
}

export default handler;
