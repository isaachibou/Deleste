/* This pages serves the purpose of showing every item in the collection */

import clientPromise from "../../utils/mongodb";
import { ObjectId } from 'mongodb'

export default async (req, res) => {
 
  const query = req.query;
  const use = query.usecase;
  const id = query.id;
  const type = query.type
  const brand = query.brand
  const collection = "Matos"

  if(use == "fillTable") {
    var matos = await getMatosByID(id)
    res.end(JSON.stringify(matos, undefined, 2));
  } else {
    const equips = await getData(type, brand)
    res.end(JSON.stringify(equips, undefined, 2));
  }
};

export async function getData(type, brand) {

	const client = await clientPromise;
  /*const equips = await client
    .db("Délesté"+process.env.NEXT_PUBLIC_DB_SUFFIX)
    .collection("Matos")
    .find({"Model":{$exists:true}, "Type": type == "all" ? {$exists:true} : type, "Brand": String(brand).toLowerCase() == "all" ? {$exists:true} : brand })
    .sort({ Model: 1, SKU: 1 })
    //.limit(20)
    .toArray();*/

    let pipeline = [];
    if(type && type != "all") { 
      pipeline.push({
          $match: { 
            "Type" : type
          }
      })
    }

    if(brand && brand != "All") { 
      pipeline.push({
          $match: { 
            "Brand" : brand
          }
      })
    }

    pipeline.push({
            "$group": {
              _id: "$Model",
              Models: {
                "$first": "$$ROOT"
              }
            }
        },)

    const equips = await client
    .db("Délesté"+process.env.NEXT_PUBLIC_DB_SUFFIX)
    .collection("Matos")
    .aggregate(pipeline)
    .sort({ Model: 1, SKU: 1 })
    .toArray();
    
    
    return equips.map((pipe) => pipe["Models"])
}
export async function getAllBrands() {
  const client = await clientPromise;
  const brands = await client
    .db("Délesté"+process.env.NEXT_PUBLIC_DB_SUFFIX)
    .collection("Matos")
    .distinct("Brand")
    /*.toArray();*/

  return brands;

}

export async function getAllModels(type) {
  const client = await clientPromise;
  const models = await client
    .db("Délesté"+process.env.NEXT_PUBLIC_DB_SUFFIX)
    .collection("Matos")
    .find({
      "Model":{$exists:true},
      "Type": type
    })
    .project({_id:1, Type:1, Model: 1, Image: 1, "Weight (Metric)": 1, Size:1, Color: 1 })
    .sort({ Brand: -1, Model: 1, Size: 1 })
    .toArray();

  return models;
}

export async function getMatosByID(id) {

	const client = await clientPromise;

	let equips = await client
    .db("Délesté"+process.env.NEXT_PUBLIC_DB_SUFFIX)
    .collection("Matos")
    .findOne(
    	{ "_id": ObjectId(id) },
    	{ projection: { 
    		/*_id: 1, */
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
    .db("Délesté"+process.env.NEXT_PUBLIC_DB_SUFFIX)
    .collection("Matos")
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
    .db("Délesté"+process.env.NEXT_PUBLIC_DB_SUFFIX)
    .collection("Matos")
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
    .db("Délesté"+process.env.NEXT_PUBLIC_DB_SUFFIX)
    .collection("Matos")
    .find({"_id": {$lt: ObjectId(id)}, "Model": {$exists:true}})
    .project({_id: 1, Model: 1, Size: 1, Image: 1})
    .sort({ _id: -1, Model: -1, Size: -1 })
    .limit(1)
    .toArray();

	return nextMatos
}