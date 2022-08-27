import clientPromise from "../../../utils/mongodb";
import { ObjectId } from 'mongodb'

export default async (req, res) => {
 
  const query = req.query;
  const email = query.email;

  const user = await getUserId(email)
  res.end(JSON.stringify(user, undefined, 2));
};

export async function getUserId(email) {
	const client = await clientPromise;
	var collection ="users";
	 
	const userid = await client
    .db("ZakIGatsbyProject")
    .collection(String(collection))
    .findOne(
    	{ "email": email },
    	{ projection: { _id: 1} }
    );

    return userid
}
