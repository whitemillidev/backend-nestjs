// Типизация для файла .env
declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    POSTGRES_HOST: string;
    POSTGRES_USER: string;
    POSTGRES_DB: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_PORT: string;
  }
}
