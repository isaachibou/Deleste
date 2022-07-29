/* This pages serves the purpose of showing every item in the collection */

import clientPromise from "../../../utils/mongodb";
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const { id } = req.query
  const client = await clientPromise;

  const equips = await client
    .db("ZakIGatsbyProject")
    .collection("SleepingPads")
    .find({
      "_id": ObjectId({id}.id),
    })
    .sort({ SKU: -1 })
    .toArray();

   
   res.end(JSON.stringify(equips,null,'\t'))
    
};

