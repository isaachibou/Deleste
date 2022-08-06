/* This pages serves the purpose of showing every item in the collection */

import clientPromise from "../../utils/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

    const equips = await client
    .db("ZakIGatsbyProject")
    .collection("SleepingPads")
    .findOne(
    { },
    { projection: { Model: 1, "Weight (Metric)": 1, Color: 1 } }
);

 res.end(JSON.stringify(equips, undefined, 2));
};