/* This pages serves the purpose of showing every item in the collection */

import clientPromise from "../../utils/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

    const equips = await client
    .db("ZakIGatsbyProject")
    .collection("SleepingPads")
    .find({Image: {$ne: null}})
    
    .sort({ SKU: -1 })
    .limit(20)
    .toArray();

 res.end(JSON.stringify(equips, undefined, 2));
};