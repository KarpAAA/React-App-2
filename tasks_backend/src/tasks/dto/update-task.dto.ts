import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { Operation } from "../../entities/operation.model";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
}
