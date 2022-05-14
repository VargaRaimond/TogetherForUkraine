import express from "express";
import path from "path";
import morgan from "morgan";

// https://auth0.com/blog/node-js-and-typescript-tutorial-secure-an-express-api/

import offersRoutes from "./src/routes/offersRoutes";
import personRoutes from "./src/routes/personRoutes";
import usagesRoutes from "./src/routes/usagesRoutes";
import statsRoutes from "./src/routes/statsRoutes";
import authRoutes from "./src/routes/authRoutes";
import mailQRoutes from "./src/routes/mailQRoutes";

const PORT = process.env.API_PORT || 5001;

const app = express();

app.disable("etag");

/** Logging */
app.use(morgan("dev"));

app.use(express.json());
// Serve the React static files after build
app.use(express.static("../client/build"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

/** Routes */
app.use("/api/auth/", authRoutes);
app.use("/api/person/", personRoutes);
app.use("/api/offers/", offersRoutes);
app.use("/api/usages/", usagesRoutes);
app.use("/api/stats/", statsRoutes);
app.use("/api/mail-queue/", mailQRoutes);

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello" });
});

// All other unmatched requests will return the React app
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
