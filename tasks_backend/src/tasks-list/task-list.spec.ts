import { Test, TestingModule } from '@nestjs/testing';
import { TasksListController } from './tasks-list.controller';
import { TasksListService } from './tasks-list.service';
import * as request from "supertest";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TaskBoard } from "../entities/task-board.model";
import { TasksList } from "../entities/tasks-list.model";

describe('TasksListController', () => {
  let controller: TasksListController;
  let tasksListService: TasksListService;

  let app;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksListController],
      providers: [TasksListService,
        {
          provide: getRepositoryToken(TaskBoard),
          useValue: {} // Mock your Task repository
        },
        {
          provide: getRepositoryToken(TasksList),
          useValue: {} // Mock your TasksList repository
        }],
    }).compile();

    controller = module.get<TasksListController>(TasksListController);
    tasksListService = module.get<TasksListService>(TasksListService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('update', () => {
    it('should update a tasks list', async () => {
      const id = 1;
      const updateTasksListDto = { title: 'Updated List', tasks: [] };
      const expectedResponse =
        { id, ...updateTasksListDto, order: 1, number: 0, tasks: [], board: null };

      jest.spyOn(tasksListService, 'update').mockResolvedValue(expectedResponse);


      return request(app.getHttpServer())
        .patch(`/tasks-list/${id}`)
        .expect(expectedResponse)
        .expect(200);
    });
  });

  describe('remove', () => {
    it('should remove a tasks list', async () => {
      const id = 1;

      jest.spyOn(tasksListService, 'remove').mockResolvedValue(undefined);

      return request(app.getHttpServer())
        .delete(`/tasks-list/${id}`)
        .expect(200);
    });
  });
});
