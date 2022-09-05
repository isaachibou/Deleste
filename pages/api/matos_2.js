/* This pages serves the purpose of showing every item in the collection */

import clientPromise from "../../utils/mongodb";
import { ObjectId } from 'mongodb'

export default async (req, res) => {
 
  const query = req.query;
  const type = query.type;
  const use = query.usecase;
  const id = query.id;
  const collection = query.collection 

  if(use == "fillTable") {
    var matos = await getMatosByID(id, collection)
    res.end(JSON.stringify(matos, undefined, 2));
  } else {
    const equips = await getData(type)
    res.end(JSON.stringify(equips, undefined, 2));
  }
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
    .sort({ Model: 1, SKU: 1 })
    .limit(20)
    .toArray();

    return equips
}

export async function getAllModels(collection) {
  const client = await clientPromise;
  const models = await client
    .db("ZakIGatsbyProject")
    .collection(String(collection))
    .find({"Model":{$exists:true}})
    .project({Model: 1, "Weight (Metric)": 1, Size:1, Color: 1 })
    .sort({ Model: 1, Size: 1 })
    .limit(20)
    .toArray();

  return models;
}

export async function getMatosByID(id, collection) {

	const client = await clientPromise;

	let equips = await client
    .db("ZakIGatsbyProject")
    .collection(collection)
    .findOne(
    	{ "_id": ObjectId(id) },
    	{ projection: { 
    		_id: 1, 
    		"SKU": 0,
    		"Weight (Standard)": 0, 
    		"Width (Standard)": 0, 
    		"Length (Standard)": 0,
    		"Height (Standard)": 0,
    		"Thickness (Standard)": 0,
    		"Packed dimension (Standard)": 0,
    		"Country of Origin": 0
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

  return equips
}

export async function getPrevMatos(id) {

	const client = await clientPromise;

	const prevMatos = await client
    .db("ZakIGatsbyProject")
    .collection("SleepingPads")
    .find({"_id": {$gt: ObjectId(id)}, "Model": {$exists:true}})
    .project({_id: 1, Model: 1, Size: 1, Image: 1})
    .sort({ _id: 1, Model: 1, Size: 1 })
    .limit(1)
    .toArray();

	return prevMatos
}

export async function getNextMatos(id) {

	const client = await clientPromise;
 
	 const nextMatos = await client
    .db("ZakIGatsbyProject")
    .collection("SleepingPads")
    .find({"_id": {$lt: ObjectId(id)}, "Model": {$exists:true}})
    .project({_id: 1, Model: 1, Size: 1, Image: 1})
    .sort({ _id: -1, Model: -1, Size: -1 })
    .limit(1)
    .toArray();

	return nextMatos
}