import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sql from "./db.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors())

// const allowedOrigins = [
//   "http://localhost:5173",
//   //"https://chat-frontend-flame-six.vercel.app" // ✅ add this
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true); // allow Postman/curl
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = `CORS policy: No access from origin ${origin}`;
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.options("*", cors());
app.use(bodyParser.json());

app.post("/app", async (req,res)=>{
  const {name, message} = req.body; 
  try{
    await sql`INSERT INTO contact_message (name, message) VALUES(${name}, ${message})`;
    res.json({ success: true, message: "Message saved!" });
  }catch(err){
    console.error("DB error:", err.message); 
    res.status(400).json({error:err.message});  
  }
});



app.listen(PORT, () => {
  console.log(`🚀 Server listening on port: ${PORT}`);
});