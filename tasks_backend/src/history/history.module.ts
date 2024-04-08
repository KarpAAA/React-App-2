import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Operation } from "../entities/operation.model";
import { TaskBoard } from "../entities/task-board.model";

@Module({
  imports:[TypeOrmModule.forFeature([Operation, TaskBoard])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}
