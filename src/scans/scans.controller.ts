import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ScansService } from './scans.service';
import { ScansDto } from './dto/scans.dto';
import { MotherDto } from './dto/mother.dto';

@Controller('scans')
export class ScansController {
  constructor(private readonly scansService: ScansService) {}

  @Post('new-mother')
  createMother(@Body() MotherDto: MotherDto) {
    return this.scansService.createMother(MotherDto);
  }

  @Post('new-scan')
  createScan(@Body() ScansDto: ScansDto) {
    return this.scansService.createScans(ScansDto);
  }

  @Get('all-scans')
  findAllScans() {
    return this.scansService.findTopN();
  }

  @Get('scan/:id')
  findOneScans(@Param('id', ParseIntPipe) id: number) {
    return this.scansService.findOne(id);
  }

  @Get('all-mothers')
  findAllMothers() {
    return this.scansService.findTopNMothers();
  }

  @Get('mother/:id')
  findOneMother(@Param('id', ParseIntPipe) id: number) {
    return this.scansService.findOneMother(id);
  }
}
