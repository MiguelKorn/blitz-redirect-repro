import { SimpleRolesIsAuthorized } from "@blitzjs/auth"
import { User } from "db"

export type Role = "ADMIN" | "USER"

type Company = {
  uuid: string
}

declare module "@blitzjs/auth" {
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      companyProductUuid: Company["uuid"]
      roles: Role[]
    }
  }
}

declare module "blitz" {
  export interface Ctx {
    companyProduct: Company
  }
}
