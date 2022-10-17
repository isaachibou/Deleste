/* This pages serves the purpose of holding place for every item single queried item by id in the collection */

import clientPromise from "../../utils/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  const equips = await client
    .db("Délesté")
    .collection("SleepingBags")
    .find({})
    /*.project({"_id": 1})*/
    .sort({ SKU: -1 })
    .limit(20)
    .toArray();

  res.end(JSON.stringify(equips, undefined, 2));
};