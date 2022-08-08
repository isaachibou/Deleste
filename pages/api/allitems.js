/* This pages serves the purpose of showing every item in the collection */

import clientPromise from "../../utils/mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const query = req.query;
  const type = query.type;
  
  var collection = "coucou";
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
    .project({Model: 1, "Weight (Metric)": 1, Size:1, Color: 1 })
    .sort({ Model: 1, Size: 1 })
    .limit(20)
    .toArray();
  

    res.end(JSON.stringify(equips, undefined, 2));
};