import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Operation } from "../entities/operation.model";

@Module({
  imports:[TypeOrmModule.forFeature([Operation])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
