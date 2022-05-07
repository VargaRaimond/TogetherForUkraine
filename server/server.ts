import express from "express";
import path from "path";
import personRoutes from "./src/routes/personRoutes";

// https://auth0.com/blog/node-js-and-typescript-tutorial-secure-an-express-api/

import { expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

const PORT = process.env.PORT || 5001;
const audience = process.env.AUTH0_AUDIENCE || "http://together-for-ukraine";
const issuer = process.env.AUTH0_ISSUER || "https://dev-gq9lbjoe.us.auth0.com/";

const app = express();

app.use(express.json());
// Serve the React static files after build
app.use(express.static("../client/build"));

// TODO delete: Example + '/api/private message'
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuer}.well-known/jwks.json`,
  }),
  audience,
  issuer,
  algorithms: ["RS256"],
});

/** Routes */
app.use("/api/countries/", personRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello" });
});

app.get("/api/private-message", checkJwt, (req, res) => {
  res.send({
    msg: "The API successfully validated your access token.",
  });
});

// All other unmatched requests will return the React app
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
