declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_SECRET: string | undefined;
      GITHUB_ID: string | undefined;
      GITHUB_SECRET: string | undefined;
      EMAIL_SERVER_HOST: string | undefined;
      EMAIL_SERVER_PORT: string | undefined;
      EMAIL_SERVER_USER: string | undefined;
      EMAIL_SERVER_PASSWORD: string | undefined;
      EMAIL_FROM: string | undefined;
    }
  }
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("Could not find NextAuth Secret Env.");
}
if (!process.env.GITHUB_ID) {
  throw new Error("Could not find Github Id Env.");
}
if (!process.env.GITHUB_SECRET) {
  throw new Error("Could not find Github Secret Env.");
}
if (!process.env.EMAIL_SERVER_HOST) {
  throw new Error("Could not find EMAIL_SERVER_HOST Env.");
}
if (!process.env.EMAIL_SERVER_PORT) {
  throw new Error("Could not find EMAIL_SERVER_PORT Env.");
}
if (!process.env.EMAIL_SERVER_USER) {
  throw new Error("Could not find EMAIL_SERVER_USER Env.");
}
if (!process.env.EMAIL_SERVER_PASSWORD) {
  throw new Error("Could not find EMAIL_SERVER_PASSWORD Env.");
}
if (!process.env.EMAIL_FROM) {
  throw new Error("Could not find EMAIL_FROM Env.");
}

export const env = {
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  GITHUB_ID: process.env.GITHUB_ID,
  GITHUB_SECRET: process.env.GITHUB_SECRET,
  EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
  EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
  EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
  EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
  EMAIL_FROM: process.env.EMAIL_FROM,
};
