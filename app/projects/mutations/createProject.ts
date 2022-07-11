import { Ctx } from "blitz";
import db from "db";
import { z } from "zod";

const CreateProjectInput = z.object({
  name: z.string(),
});

export default async function CreateProject(input, ctx: Ctx) {
  CreateProjectInput.parse(input);
  ctx.session.$isAuthorized();

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const project = await db.project.create({ data: input });

  return project;
}
