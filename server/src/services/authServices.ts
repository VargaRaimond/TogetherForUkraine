import axios from "axios";

// Tutorial for how to get access token:
// https://manage.auth0.com/dashboard/us/dev-gq9lbjoe/apis/management/test
export const getAccessToken = async (
  domain,
  audience,
  clientId,
  clientSecret
) => {
  return (
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
};

// Tutorial for assigning roles:
// https://auth0.com/docs/manage-users/access-control/configure-core-rbac/rbac-users/assign-roles-to-users
export const assignRoleToUser = async (domain, authId, role, accessToken) => {
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
};
