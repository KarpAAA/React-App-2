import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskBoard } from "../entities/task-board.model";
import { TasksList } from "../entities/tasks-list.model";

@Module({
  imports: [TypeOrmModule.forFeature([TaskBoard, TasksList])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
