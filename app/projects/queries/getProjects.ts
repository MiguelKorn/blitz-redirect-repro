import { paginate, Ctx } from "blitz";
import db from "db";
import { Prisma } from "@prisma/client";

interface GetProjectsInput
  extends Pick<
    Prisma.ProjectFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default async function Get__ModelNames(
  input: GetProjectsInput,
  ctx: Ctx
) {
  ctx.session.$isAuthorized();

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: projects,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip: input.skip,
    take: input.take,
    count: () => db.project.count({ where: input.where }),
    query: (paginateArgs) =>
      db.project.findMany({
        ...paginateArgs,
        where: input.where,
        orderBy: input.orderBy,
      }),
  });

  return {
    projects,
    nextPage,
    hasMore,
    count,
  };
}
