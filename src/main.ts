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
    origin: [
      'https://fypwebsitebackend-drab.vercel.app/',
      'https://fypwebsite.vercel.app/',
      frontendUrl,
    ],
    methods: 'GET, HEAD, PUT, POST, DELETE, OPTIONS, PATCH',
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-control-allow-credentials, Access-control-allow-headers, Access-control-allow-methods, Access-control-allow-origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma',
  });

  await app.listen(3000);
}

bootstrap();
