import { PartialType } from '@nestjs/mapped-types';
import { CreateTasksListDto } from './create-tasks-list.dto';
import { Task } from "../../entities/task/task.model";

export class UpdateTasksListDto extends PartialType(CreateTasksListDto) {
  tasks: Task[]
}
