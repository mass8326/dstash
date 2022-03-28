import { Target } from "./config/config.build";

declare namespace NodeJS {
  export interface ProcessEnv {
    BUILD_TARGET: Target;
  }
}
