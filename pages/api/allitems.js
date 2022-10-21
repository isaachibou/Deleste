/* This pages serves the purpose of showing every item in the collection */

import clientPromise from "../../utils/mongodb";

export default async (req, res) => {
  const client = await clientPromise;
 
  const equips = await client
    .db("Délesté"+process.env.NEXT_PUBLIC_DB_SUFFIX)
    .collection("Matos")
    .find({"Model":{$exists:true}})
    .project({Type: 1, Brand:1, Model: 1, "Weight (Metric)": 1, Size:1, Color: 1 })
    .sort({ Type: -1, Brand: 1, Model: 1, Size: 1 })
    .limit(20)
    .toArray();
  

    res.end(JSON.stringify(equips, undefined, 2));
};