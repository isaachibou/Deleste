import clientPromise from "../../../utils/mongodb";
import { ObjectId } from 'mongodb'

export default async function CreateLink(req, res) {
	const apiKey = req.headers["api-key"]
	const { id } = req.query
 	const client = await clientPromise;

 	if(req.method !== "POST" /*|| apiKey !== process.env.API_KEY*/) {
 		return res.status(405).json({
		  type: "Error",
		  code: 405,
		  message: "Only POST method is accepted on this route",
		});
 	}

 	const { link } = request.body;

 	if (!link) {
		res.status(400).send({
		  type: "Error",
		  code: 400,
		  message: "Expected {link: string}",
		});
		return;
	}
	try {
		const equips = await client
	    .db("Délesté"+process.env.NEXT_PUBLIC_DB_SUFFIX)
	    .collection("Backpacks")
	    .find({
	      "_id": ObjectId({id}.id),
	    })
	    .sort({ SKU: -1 })
	    .toArray();

	    const urlInfoCollection = database.collection(COLLECTION_NAMES["url-info"]);
	    const hash = getHash();
	    const linkExists = await urlInfoCollection.findOne({
	      link,
	    });
    	const shortUrl = `${process.env.HOST}/${hash}`;
	    if (!linkExists) {
	      await urlInfoCollection.insertOne({
	        link,
	        uid: hash,
	        shortUrl: shortUrl,
	        createdAt: new Date(),
	      });
	    }
	    response.status(201);
	    response.send({
	      type: "success",
	      code: 201,
	      data: {
	        shortUrl: linkExists?.shortUrl || shortUrl,
	        link,
	      },
	    });
  	} catch (e: any) {
	    response.status(500);
	    response.send({
	      code: 500,
	      type: "error",
	      message: e.message,
	    });
 	 }
   res.end(JSON.stringify(equips,null,'\t'))
};
