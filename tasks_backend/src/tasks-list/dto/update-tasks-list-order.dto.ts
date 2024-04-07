import { PartialType } from "@nestjs/mapped-types";
import { CreateTasksListDto } from "./create-tasks-list.dto";

export class UpdateTasksListOrderDto {
  id: number;
  order: number;
}