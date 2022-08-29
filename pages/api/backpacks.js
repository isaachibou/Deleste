import clientPromise from "../../utils/mongodb";
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const query = req.query;
  const owner = query.owner;

  switch(req.method) {
    case 'POST':
      return addBackpack(req, res);
    case 'GET':
      var bp = await getBackpacks(owner);
      res.end(JSON.stringify(bp, undefined, 2));
  }
};

export async function getBackpacks(owner) {

    const client = await clientPromise;
    const backpacks = await client
    .db("ZakIGatsbyProject")
    .collection("Backpacks")
    .find({"owner": ObjectId(owner)})
    .toArray();

    return backpacks;
}

async function addBackpack(req, res) {
  try {
    /*let bp = JSON.parse(req.body);*/
    let bp = req.body;
    bp.owner = ObjectId(bp.owner)

    for(const item in bp.items) {
       bp.items[item] = ObjectId(bp.item)
    }

  
    //connect to database
    const client = await clientPromise;
    const db = client.db("ZakIGatsbyProject");

    //POST request
    const query = { name: bp.name };
    const replacement = bp
    const options = { upsert: true };
    const response = await db.collection('Backpacks').replaceOne(query, replacement, options);
  
    return res.json({
        message: 'Details updated successfully',
        success: response
    });
  } catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        })
  }
}


