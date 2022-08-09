/* This pages serves the purpose of showing every item in the collection */

import clientPromise from "../../utils/mongodb";

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