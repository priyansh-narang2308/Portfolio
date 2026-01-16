/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "znmqq7dr";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "develop";

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    appId: "cjuszlealaj67386535bky9h",
  },
});
