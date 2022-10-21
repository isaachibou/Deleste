import { hashPassword } from '../../../utils/auth';
import clientPromise from "../../../utils/mongodb";

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  const client = await clientPromise;
  const existingUser = await client
    .db("Délesté"+process.env.NEXT_PUBLIC_DB_SUFFIX)
    .collection("users")
    .findOne({ email: email });

  console.log(existingUser)

  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await client
    .db("Délesté"+process.env.NEXT_PUBLIC_DB_SUFFIX)
    .collection("users")
    .insertOne({
      email: email,
      password: hashedPassword,
    });
    
  res.status(201).json({ message: 'Created user!' });
}

export default handler;
