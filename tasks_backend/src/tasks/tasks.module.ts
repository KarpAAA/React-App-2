import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "../entities/task/task.model";
import { TasksList } from "../entities/tasks.list.model";

@Module({
  imports: [TypeOrmModule.forFeature([Task, TasksList])],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService]
})
export class TasksModule {}
