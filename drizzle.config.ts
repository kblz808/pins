import {defineConfig} from 'drizzle-kit'

export default defineConfig({
  out: "./drizzle",
  schema: "./src/storage/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: Deno.env.get("DATABASE_URL")!,
  }
})
