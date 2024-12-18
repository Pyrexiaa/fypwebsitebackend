import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ScansModule } from './scans/scans.module';

@Module({
  imports: [ScansModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'; // Fallback URL
        res.setHeader('Access-Control-Allow-Origin', frontendUrl); // Frontend URL
        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET,HEAD,PUT,PATCH,POST,DELETE',
        );
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization',
        );
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
      })
      .forRoutes('*'); // Apply to all routes
  }
}
