/* This pages serves the purpose of showing every item in the collection */

import clientPromise from "../../utils/mongodb";
import { ObjectId } from 'mongodb'

export default async (req, res) => {
  const client = await clientPromise;

  const query = req.query;
  const id = query.id;
  
  /*{_id: {$gt: ObjectId(id)}
   .sort({_id:1}) */

    const equips = await client
    .db("Délesté"+process.env.NEXT_PUBLIC_DB_SUFFIX)
    .collection("Matos")
    .find({"_id": {$gt: ObjectId(id)}, "Model": {$exists:true}})
    .project({_id: 1, Model: 1, Size: 1, Image: 1})
    .sort({ _id: 1, Model: -1, Size: -1 })
    .limit(1)
    .toArray();

    console.log(equips)
	  res.end(JSON.stringify(equips, undefined, 2));
};