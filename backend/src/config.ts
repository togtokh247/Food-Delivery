export const config = {
  jwtSecret: process.env.JWT_SECRET ?? "isthissecret",
  mongoUri:
    process.env.MONGODB_URI ??
    "mongodb+srv://admin:WUEottfOvhy9iomX@cluster0.pltt0uk.mongodb.net/?appName=Cluster0",
  port: Number(process.env.PORT ?? 4000),
};
