import { Body, Controller, Path, Route, Tags } from "tsoa";
import { Response } from "express";
import { assignRoleToUser, getAccessToken } from "../services/authServices";

@Route("auth")
@Tags("Auth")
export default class AuthController extends Controller {
  public async setUserRole(
    @Path() authId: string,
    @Body() { role }: { role: string },
    res: Response
  ) {
    try {
      // TODO: maybe add this in the env file?
      const domain = "dev-gq9lbjoe.us.auth0.com";
      const clientId = "ebAJS5IfJh9EuMXqWdXXkshAzcFtUS46";
      const clientSecret =
        "VIgqwr-THYluRtcb_yt7jjPIF3C9QRJDHO4gtRDdjp_SwxPW-edU17UIzDR4e0jV";
      const audience = "https://dev-gq9lbjoe.us.auth0.com/api/v2/";

      const accessToken = await getAccessToken(
        domain,
        audience,
        clientId,
        clientSecret
      );

      await assignRoleToUser(domain, authId, role, accessToken);

      res.status(201);
    } catch (error) {
      res.status(400);
      throw error;
    }
  }
}
