import clientPromise from "../../../utils/mongodb";
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const { id } = req.query
  const client = await clientPromise;

  const equips = await client
    .db("Délesté"+process.env.NEXT_PUBLIC_DB_SUFFIX)
    .collection("Backpacks")
    .find({
      "_id": ObjectId({id}.id),
    })
    .sort({ SKU: -1 })
    .toArray();

   
   res.end(JSON.stringify(equips,null,'\t'))
};