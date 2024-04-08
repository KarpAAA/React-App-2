import { Test, TestingModule } from "@nestjs/testing";
import { TasksController } from "./tasks.controller";
import * as request from "supertest";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TasksService } from "./tasks.service";
import { Task } from "../entities/task/task.model";
import { TasksList } from "../entities/tasks-list.model";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskPriority } from "../entities/task/task.priority";
import { TaskStatus } from "../entities/task/task.status";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskDTO } from "./dto/task.dto";

describe("TasksController", () => {
  let controller: TasksController;
  let tasksService: TasksService;

  let app;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,// Add TaskRepository as a provider
        {
          provide: getRepositoryToken(Task),
          useValue: {} // Mock your Task repository
        },
        {
          provide: getRepositoryToken(TasksList),
          useValue: {} // Mock your TasksList repository
        }
      ]
    }).compile();

    controller = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });


    it("should return the task with id", async () => {
      const tasks = [
        {
          id: 1,
          title: "Task 1",
          content: "Content 1",
          date: "2024-04-08",
          priority: "HIGH",
          status: "TODO",
          history: []
        },
        {
          id: 2,
          title: "Task 2",
          content: "Content 2",
          date: "2024-04-09",
          priority: "MEDIUM",
          status: "IN_PROGRESS",
          history: []
        }
      ];
      jest.spyOn(tasksService, "findOne").mockResolvedValue(tasks[0]);

      return request(app.getHttpServer())
        .get(`/tasks/${tasks[0].id}`)
        .expect(200)
        .expect(tasks[0]);
    });



    it('should create a task', async () => {

      const createTaskDto: CreateTaskDto = {
        title: 'New Task',
        content: 'Task content',
        date: '2024-04-08',
        priority: TaskPriority.HIGH,
        status: TaskStatus.TODO,
        tasksListId: 1,
        history: []
      };
      const createdTask: Task = {
        id: 1,
        title: 'New Task',
        content: 'Task content',
        date: '2024-04-08',
        priority: TaskPriority.HIGH,
        status: TaskStatus.TODO,
        list: { id: 1, title: "", board: null, tasks: [],number: 1, order: 1 },
        history: [],
      };

      jest.spyOn(tasksService, 'create').mockResolvedValue({ ...createdTask, tasksListId: 1 });

      const result = await controller.create(createTaskDto);

      return request(app.getHttpServer())
        .post('/tasks')
        .expect(201)
        .expect({ ...createdTask, tasksListId: 1 });
    });


  it('should update a task by id', async () => {
    const taskId = 1;
    const updateTaskDto: UpdateTaskDto = {
      title: 'Updated Task Title',
    };

    const task: Task = {
      id: taskId,
      title: 'Original Task Title',
      content: 'Original Task Content',
      date: '2024-04-08',
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.IN_PROGRESS,
      history: [],
      list: { id: 1, title: "", board: null, tasks: [],number: 1, order: 1 },
      ...updateTaskDto
    };

    const taskDTO: TaskDTO = {
      id: taskId,
      title: 'Updated Task Title',
      content: 'Updated Task Content',
      date: '2024-04-08',
      priority: 'HIGH',
      status: 'TODO',
      history: [],
    };
    jest.spyOn(tasksService, 'findOne').mockResolvedValue(taskDTO);
    jest.spyOn(tasksService, 'update').mockResolvedValue(task);

    return request(app.getHttpServer())
      .patch(`/tasks/${taskId}`)
      .expect(200)
      .expect(task);
  });

});
