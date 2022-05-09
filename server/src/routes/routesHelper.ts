import { NextFunction, Request, Response } from "express";

function formatJsonResponse(response: unknown, httpResponse: Response) {
  if (response && (response as Response).finished) {
    return;
  }
  httpResponse.json(response);
}

export const routesHelper = (
  route: (req: Request, res: Response, next: NextFunction) => any
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(route(req, res, next))
      .then((r) => formatJsonResponse(r, res), next)
      .catch(next);
  };
};
