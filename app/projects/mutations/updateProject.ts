import db from "db";
import { z } from "zod";

const UpdateProjectInput = z.object({
  id: z.number(),
  name: z.string(),
});

export default async function UpdateProject(input, ctx: Ctx) {
  UpdateProjectInput.parse(input);
  ctx.session.$isAuthorized();

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const project = await db.project.update({ where: { id: input.id }, input });

  return project;
}
