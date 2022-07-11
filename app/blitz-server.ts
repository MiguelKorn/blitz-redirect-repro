import { setupBlitzServer } from "@blitzjs/next"
import { AuthServerPlugin, PrismaStorage } from "@blitzjs/auth"
import {isAuthorizedMiddleware} from "middleware/is-authorized"
import db from "db"
import { authConfig } from "./blitz-client"

export const { gSSP, gSP, api } = setupBlitzServer({
  plugins: [
    AuthServerPlugin({
      ...authConfig,
      storage: PrismaStorage(db),
      isAuthorized: isAuthorizedMiddleware,
    }),
  ],
})
