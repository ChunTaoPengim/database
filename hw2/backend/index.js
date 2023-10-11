import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Routes
import router from "./routes/card.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/cards", router);

app.get("/heartbeat", (_, res) => {
  return res.send({ message: "Hello World!" });
});
const port = process.env.PORT || 8000; // eslint-disable-line
mongoose
  .connect(process.env.MONGO_URL, { // eslint-disable-line
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // We move app.listen() here to make sure that the server is started after the connection to the database is established.
    app.listen(port, () =>
      console.log(`Server running on port http://localhost:${port}`),
    );
    // If the connection is successful, we will see this message in the console.
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    // Catch any errors that occurred while starting the server
    console.log(error.message);
  });