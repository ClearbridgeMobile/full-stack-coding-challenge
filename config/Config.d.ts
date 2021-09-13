/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    port: Port
  }
  interface Port {
    client: number
    server: number
  }
  export const config: Config
  export type Config = IConfig
}
