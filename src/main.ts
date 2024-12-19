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
      'https://fypwebsitebackend-drab.vercel.app',
      'https://fypwebsite.vercel.app',
      frontendUrl,
    ],
    methods: 'GET, HEAD, PUT, POST, DELETE, OPTIONS, PATCH',
    credentials: false,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma',
  });

  app.use((req, res, next) => {
    console.log('Origin:', req.headers.origin);
    console.log('Method:', req.method);
    console.log(`Request method: ${req.method}, Request URL: ${req.url}`);
    if (req.method === 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,PUT,PATCH,POST,DELETE',
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma',
      );
      res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
      return res.sendStatus(204);
    }
    next();
  });

  await app.listen(3000);
}

bootstrap();
