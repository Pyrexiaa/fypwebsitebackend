import { Module } from '@nestjs/common';
import { ScansService } from './scans.service';
import { ScansController } from './scans.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ScansController],
  providers: [ScansService, PrismaService],
})
export class ScansModule {}
