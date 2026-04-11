import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const loadLocalEnv = () => {
  const envPath = resolve(process.cwd(), ".env");

  if (!existsSync(envPath)) {
    return;
  }

  const envFile = readFileSync(envPath, "utf8");

  for (const line of envFile.split("\n")) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
};

loadLocalEnv();

export const config = {
  jwtSecret: process.env.JWT_SECRET ?? "isthissecret",
  mongoUri: process.env.MONGODB_URI,
  port: Number(process.env.PORT ?? 4000),
};
