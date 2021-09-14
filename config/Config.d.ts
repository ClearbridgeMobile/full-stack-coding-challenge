/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    Database: Database
    Port: number
  }
  interface Database {
    host: string
    user: string
    password: string
    database: string
  }
  export const config: Config
  export type Config = IConfig
}
