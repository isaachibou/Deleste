import clientPromise from "../../utils/mongodb";

export default async function handler(req, res) => {
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

    return res.json(bpsArray)
  }.catch(error) {
    return json({
      message: new Error(error).message,
      succes: false
    })
  }
}

async function addBackpack(req, res) {
  try {
    let bp = JSON.pares(req.body);
    console.Log(bp);

    let{ name, age, description} =backpack

    if(!name || !age || !description){
      throw new Error("Invalid Request");
    }
    
    //connect to database
    const client = await clientPromise;
    const db = client.db("ZakIGatsbyProject")

    //POST request
    const response = await db.collection('Backpacks').updateOne({}, { $push: backpack })
     console.log(response)
    }

    return res.json({
        message: 'Details updated successfully',
        success: response
    })
  }.catch (error) {
        // return an error
        return res.json({
            message: new Error(error).message,
            success: false,
        })
    }
}

