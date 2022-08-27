import clientPromise from "../../utils/mongodb";
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  switch(req.method) {
    case 'POST':
      return addBackpack(req, res);
    case 'GET':
      return getBackpack(req, res);
  }
};

async function getBackpack(req, res) {
  try {
    console.log('hitting API')
    const client = await clientPromise;
    const db = client.db("ZakIGatsbyProject")
    const bp = collection("Backpacks").find()
    const response =await bp.next()


    const bpsArray = response.bpsArray
    console.log(`this is ${response}`)
    console.log(response.bpsArray)

    return res.json(bpsArray);
  }catch(error) {
    return res.json({
      message: new Error(error).message,
      success: false
    })
  }
}

async function addBackpack(req, res) {
  try {
    //let bp = JSON.parse(req.body);
    let bp = req.body;
    bp.owner = ObjectId(bp.owner)
    

    //connect to database
    const client = await clientPromise;
    const db = client.db("ZakIGatsbyProject");

    //POST request
    const query = { name: bp.name };
    const replacement = bp
    const options = { upsert: true };
    const response = await db.collection('Backpacks').replaceOne(query, replacement, options);

    //const response = await db.collection('Backpacks').insertOne(bp);
    console.log(response);
  
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


