import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get FRONTEND_URL from environment variables or default to localhost
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  if (!process.env.FRONTEND_URL) {
    console.warn(
      'Warning: FRONTEND_URL is not defined. Falling back to http://localhost:3000',
    );
  }

  // Enable CORS with the frontend URL
  app.enableCors({
    origin: frontendUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}

bootstrap();
