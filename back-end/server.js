import dotenv from "dotenv";
dotenv.config();
// import from my files
import app from "./app.js";
import { dbConnection } from "./config/database.js";

// set dns
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

dbConnection();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
