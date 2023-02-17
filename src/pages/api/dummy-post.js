import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    console.log("Entering...");
    const uri = 'mongodb+srv://akashpmenon0492:PApa!%4034@cluster0.q3gx4l6.mongodb.net/<database-name>?retryWrites=true&w=majority';
    const client = await MongoClient.connect(uri);

    const db = client.db('myTestDatabase');
    const dataCollection = db.collection('data')
    const result = await dataCollection.insertOne({ ...data });

    console.log(result);

    client.close();

    res.status(200).json({ message: 'data inserted' });
  }
}
