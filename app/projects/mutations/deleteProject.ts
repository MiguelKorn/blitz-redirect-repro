import { Ctx } from "blitz";
import db from "db";
import { z } from "zod";

const DeleteProjectInput = z.object({
  id: z.number(),
});

export default async function DeleteProject(input, ctx: Ctx) {
  DeleteProjectInput.parse(input);
  ctx.session.$isAuthorized();

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const project = await db.project.deleteMany({ where: { id: input.id } });

  return project;
}
