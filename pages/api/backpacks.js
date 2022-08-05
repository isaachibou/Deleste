import clientPromise from "../../utils/mongodb";

export default async (req, res) => {
  const client = await clientPromise;

  const equips = await client
    .db("ZakIGatsbyProject")
    .collection("Backpacks")
    .find({})
    /*.project({"_id": 1})*/
    .sort({ "_id": -1 })
    .limit(20)
    .toArray();

  res.end(JSON.stringify(equips, undefined, 2));
};