import { Ctx } from "@blitzjs/next"

export type Role = "admin" | "user" | "guest" | "owner"

interface IsAuthorizedArgs {
  ctx: Ctx
  args: [role?: Role]
}

export const isAuthorizedMiddleware = ({ args, ctx }: IsAuthorizedArgs): boolean => {
  if (ctx.companyProduct.uuid !== ctx.session.companyProductUuid) return false
  if (!ctx.session.roles) return false
  if (args.length === 0 || !args[0]) return true
  const [role] = args

  return true
}
