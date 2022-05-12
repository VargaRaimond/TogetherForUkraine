import express from "express";
import axios from "axios";
import { routesHelper } from "./routesHelper";

const router = express.Router();
// const controller = new OffersController();

router.post(
  "/:authId",
  routesHelper((req, res) => setUserRole(req.params.authId, req.body, res))
);

// TODO: AUTH controller
const setUserRole = async (authId, { role }: { role: string }, res) => {
  try {
    // TODO: maybe add this in the env file?
    const domain = "dev-gq9lbjoe.us.auth0.com";
    const clientId = "ebAJS5IfJh9EuMXqWdXXkshAzcFtUS46";
    const clientSecret =
      "VIgqwr-THYluRtcb_yt7jjPIF3C9QRJDHO4gtRDdjp_SwxPW-edU17UIzDR4e0jV";
    const audience = "https://dev-gq9lbjoe.us.auth0.com/api/v2/";

    // Tutorial for how to get access token: https://manage.auth0.com/dashboard/us/dev-gq9lbjoe/apis/management/test
    const accessToken = (
      await axios.post(
        `https://${domain}/oauth/token`,
        {
          audience,
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: "client_credentials",
        },
        { headers: { "content-type": "application/json" } }
      )
    )?.data?.access_token;

    // Tutorial for assigning roles: https://auth0.com/docs/manage-users/access-control/configure-core-rbac/rbac-users/assign-roles-to-users
    await axios.post(
      `https://${domain}/api/v2/users/${authId}/roles`,
      { roles: [role] },
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
          "cache-control": "no-cache",
        },
      }
    );

    res.status(201);
  } catch (error) {
    res.status(400);
    throw error;
  }
};

export default router;
