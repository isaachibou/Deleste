/* This pages serves the purpose of showing every item in the collection */

import clientPromise from "../../utils/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  const uniques = await client
  .db("ZakIGatsbyProject")
  .collection("SleepingPads")
  .aggregate([
    {
      $group: {
          _id: '$Model',
          detail: { $first: '$$ROOT' }
        },
    },
    { "$out": "newcollection" }
  ]);

  const equips = await client
  .db("ZakIGatsbyProject")
  .collection("newcollection")
  .find({
     //Image: {$exists: true} 
    // {"detail.Image":{"$exists":true}}
     _id: {$ne: null}
  })
  .sort({ _id: -1 })
  .toArray();

  res.end(JSON.stringify(equips, undefined, 2));
};