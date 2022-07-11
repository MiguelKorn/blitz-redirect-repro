import { Ctx, NotFoundError } from "blitz";
import db from "db";
import { z } from "zod";

const GetProjectInput = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
});

export default async function GetProject(input, ctx: Ctx) {
  GetProjectInput.parse(input);
  ctx.session.$isAuthorized();

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const project = await db.project.findFirst({ where: { id: input.id } });

  if (!project) throw new NotFoundError();

  return project;
}
