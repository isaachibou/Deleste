/* This pages serves the purpose of showing every item in the collection */

import clientPromise from "../../utils/mongodb";
import { ObjectId } from 'mongodb'

export default async (req, res) => {
 
  const query = req.query;
  const type = query.type;

  const equips = await getData(type)
  res.end(JSON.stringify(equips, undefined, 2));
};

export async function getData(type) {
	const client = await clientPromise;
	var collection
	switch(type) {
	    case "pad":
	      collection = "SleepingPads";
	      break;
	    case "bag":
	      collection = "SleepingBags";
	      break;
	    default: 
	      collection = "SleepingBags";
	      break;
  	}

	const equips = await client
    .db("ZakIGatsbyProject")
    .collection(String(collection))
    .find({"Model":{$exists:true}})
    .sort({ Model: 1, Size: 1 })
    .limit(20)
    .toArray();

    return equips
}

export async function getMatosByID(id,) {

	const client = await clientPromise;
	console.log("id queried " + id)

	let equips = await client
    .db("ZakIGatsbyProject")
    .collection("SleepingPads")
    .findOne(
    	{ "_id": ObjectId(id) },
    	{ projection: { 
    		_id: 0, 
    		"Weight (Standard)": 0, 
    		"Width (Standard)": 0, 
    		"Length (Standard)": 0,
    		"Height (Standard)": 0,
    		"Thickness (Standard)": 0,
    		"Packed dimension (Standard) ": 0,
    	} 
    });
 
  if (equips == null) {
  	equips = await client
    .db("ZakIGatsbyProject")
    .collection("SleepingBags")
    .findOne(
    	{ "_id": ObjectId(id) },
    	{ projection: { _id: 0, "Weight (Standard)": 0, "Width (Standard)": 0, SKU: 0 } }
    );
  }

	console.log(equips)
	 
    return equips

}