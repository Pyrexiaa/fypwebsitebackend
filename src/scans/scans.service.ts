import { Injectable } from '@nestjs/common';
import { ScansDto } from './dto/scans.dto';
import { MotherDto } from './dto/mother.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ScansService {
  constructor(private readonly prisma: PrismaService) {}
  async createMother(MotherDto: MotherDto) {
    console.log('Mother DTO: ', MotherDto);
    const mother = await this.prisma.mother.create({
      data: {
        age: Number(MotherDto.age),
        height: Number(MotherDto.height),
        weight: Number(MotherDto.weight),
        PreviouslyFailedPregnancy: MotherDto.PreviouslyFailedPregnancy,
        HighRiskPreeclampsia: MotherDto.HighRiskPreeclampsia,
        PregnancyInducedHypertension: MotherDto.PregnancyInducedHypertension,
        PregestationalLDM: MotherDto.PregestationalLDM,
        GestationalLDM: MotherDto.GestationalLDM,
        Smoking: MotherDto.Smoking,
      },
    });
    return mother;
  }

  async createScans(ScansDto: ScansDto) {
    const scan = await this.prisma.scans.create({
      data: {
        mother: {
          connect: {
            id: ScansDto.motherId,
          },
        },
        gender: ScansDto.gender,
        ga: ScansDto.ga,
        bpd: ScansDto.bpd,
        hc: ScansDto.hc,
        ac: ScansDto.ac,
        fl: ScansDto.fl,
        afi: ScansDto.afi,
        cpr: ScansDto.cpr,
        psv: ScansDto.psv,
        efw: ScansDto.efw,
        ute_ari: ScansDto.ute_ari,
        ute_api: ScansDto.ute_api,
        umb_api: ScansDto.umb_api,
        placenta_site: ScansDto.placenta_site,
        af: ScansDto.af,
      },
    });
    return scan;
  }

  // Find one scan
  async findOne(inputId: number) {
    const userId = Number(inputId);

    const scans = await this.prisma.scans.findUnique({
      where: { id: userId },
    });

    if (!scans) {
      throw new Error(`Scan with ID ${userId} not found`);
    }

    return scans;
  }

  // Find all scans
  async findTopN() {
    const allScans = await this.prisma.scans.findMany();
    return allScans;
  }

  // TODO: Find all scans that is related to a mother
  async findAllScansOfMother(inputId: number) {
    const motherId = Number(inputId);
    const allScansOfMother = await this.prisma.scans.findMany({
      where: {
        motherId: motherId,
      },
    });
    return allScansOfMother;
  }

  // Find one scan
  async findOneMother(inputId: number) {
    const userId = Number(inputId);

    const mother = await this.prisma.mother.findUnique({
      where: { id: userId },
    });

    if (!mother) {
      throw new Error(`Mother with ID ${userId} not found`);
    }

    return mother;
  }

  // TODO: Find all mother details
  async findTopNMothers() {
    const allMothers = await this.prisma.mother.findMany();
    return allMothers;
  }
}
