import { Module } from '@nestjs/common';
import { TasksListService } from './tasks-list.service';
import { TasksListController } from './tasks-list.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksList } from "../entities/tasks-list.model";
import { TasksModule } from "../tasks/tasks.module";
import { TaskBoard } from "../entities/task-board.model";

@Module({
  imports: [TasksModule, TypeOrmModule.forFeature([TasksList, TaskBoard])],
  controllers: [TasksListController],
  providers: [TasksListService],
})
export class TasksListModule {}
