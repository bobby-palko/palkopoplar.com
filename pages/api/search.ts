import { NextApiRequest, NextApiResponse } from 'next';
import { RSVPSearchForm, ResultData, IGuest } from '../../types';
import dbConnect from '../../lib/dbConnect';
import Guest from '../../models/Guest';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: RSVPSearchForm;
}

async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<ResultData>
) {
  const { name } = req.body;

  await dbConnect();

  const party = [];

  // search for a guest with that name
  const guests = await Guest.find<IGuest>({
    name: { $regex: name, $options: 'i' },
  });

  // multiple results
  if (guests.length > 1) {
    res.status(400).json({
      success: false,
      message: `There are multiple names matching "${name}". Please be more specific.`,
    });
  } else {
    const guest = guests[0];

    // no result
    if (!guest) {
      res.status(404).json({
        success: false,
        message: `Sorry! We weren't able to locate that name`,
      });
    } else {
      party.push(guest);
      // partner?
      if (guest.partnerId) {
        const partner = await Guest.findById<IGuest>(guest.partnerId);

        // jk on partner
        if (!partner) {
          res.status(404).json({
            success: false,
            message: `Sorry! There's some confusion on if you have a guest.`,
          });
          // all good!
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
