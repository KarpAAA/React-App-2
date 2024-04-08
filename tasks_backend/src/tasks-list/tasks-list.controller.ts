import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksListService } from './tasks-list.service';
import { CreateTasksListDto } from './dto/create-tasks-list.dto';
import { UpdateTasksListDto } from './dto/update-tasks-list.dto';
import { UpdateTasksListOrderDto } from "./dto/update-tasks-list-order.dto";

@Controller('tasks-list')
export class TasksListController {
  constructor(private readonly tasksListService: TasksListService) {}

  @Post()
  create(@Body() createTasksListDto: CreateTasksListDto) {
    return this.tasksListService.create(createTasksListDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTasksListDto: UpdateTasksListDto) {
    return this.tasksListService.update(+id, updateTasksListDto);
  }

  @Patch('order/:id')
  updateOrder(@Param('id') id: string, @Body() updateTasksListDto: UpdateTasksListOrderDto) {
    return this.tasksListService.updateOrder(updateTasksListDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksListService.remove(+id);
  }
}
