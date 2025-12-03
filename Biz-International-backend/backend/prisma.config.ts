import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Prisma v7: pass only url (and optional shadowDatabaseUrl) in the config
    url: env("DATABASE_URL"),
    // If you need a shadow DB for migrations, add: shadowDatabaseUrl: env("SHADOW_DATABASE_URL")
  },
});
