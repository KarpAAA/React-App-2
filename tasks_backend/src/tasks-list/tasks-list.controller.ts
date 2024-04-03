import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksListService } from './tasks-list.service';
import { CreateTasksListDto } from './dto/create-tasks-list.dto';
import { UpdateTasksListDto } from './dto/update-tasks-list.dto';

@Controller('tasks-list')
export class TasksListController {
  constructor(private readonly tasksListService: TasksListService) {}

  @Post()
  create(@Body() createTasksListDto: CreateTasksListDto) {
    return this.tasksListService.create(createTasksListDto);
  }

  @Get()
  findAll() {
    return this.tasksListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTasksListDto: UpdateTasksListDto) {
    return this.tasksListService.update(+id, updateTasksListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksListService.remove(+id);
  }
}
