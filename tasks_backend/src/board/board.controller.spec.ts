import { Test, TestingModule } from '@nestjs/testing';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { TaskBoard } from '../entities/task-board.model';
import { getRepositoryToken } from "@nestjs/typeorm";
import { TasksList } from "../entities/tasks-list.model";
import * as request from "supertest";

describe('BoardController', () => {
  let controller: BoardController;
  let service: BoardService;

  let app;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [BoardService,
        {
          provide: getRepositoryToken(TaskBoard),
          useValue: {} // Mock your Task repository
        },
        {
          provide: getRepositoryToken(TasksList),
          useValue: {} // Mock your TasksList repository
        }],
    }).compile();

    controller = module.get<BoardController>(BoardController);
    service = module.get<BoardService>(BoardService);

    app = module.createNestApplication();
    await app.init();

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new board', async () => {
      const createBoardDto: CreateBoardDto = {
        title: 'New Board Title',
      };
      const createdBoard: TaskBoard = {
        id: 1,
        title: 'New Board Title',
        tasksLists: [], // You may need to provide tasksLists if required
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdBoard);

      const result = await controller.create(createBoardDto);

      expect(result).toEqual(createdBoard);
      expect(service.create).toHaveBeenCalledWith(createBoardDto);

      return request(app.getHttpServer())
        .post(`/board`)
        .expect(201)
        .expect(createdBoard);
    });
  });

  describe('findAll', () => {
    it('should return all boards', async () => {
      const boards: TaskBoard[] = [
        {
          id: 1,
          title: 'Board 1',
          tasksLists: [], // You may need to provide tasksLists if required
        },
        {
          id: 2,
          title: 'Board 2',
          tasksLists: [], // You may need to provide tasksLists if required
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(boards);

      const result = await controller.findAll();

      expect(result).toEqual(boards);
      expect(service.findAll).toHaveBeenCalled();

      return request(app.getHttpServer())
        .get(`/board`)
        .expect(200)
        .expect(boards);
    });
  });

  describe('findOne', () => {
    it('should return a board by id', async () => {
      const boardId = 1;
      const board: TaskBoard = {
        id: boardId,
        title: 'Board 1',
        tasksLists: [], // You may need to provide tasksLists if required
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(board);

      const result = await controller.findOne(boardId.toString());

      expect(result).toEqual(board);
      expect(service.findOne).toHaveBeenCalledWith(boardId);

      return request(app.getHttpServer())
        .get(`/board/${board.id}`)
        .expect(200)
        .expect(board);
    });
  });

  describe('update', () => {
    it('should update a board by id', async () => {
      const boardId = 1;
      const updateBoardDto: UpdateBoardDto = {
        title: 'Updated Board Title',
        // other fields to update if any
      };
      const updatedBoard: TaskBoard = {
        id: boardId,
        title: 'Updated Board Title',
        tasksLists: [], // You may need to provide tasksLists if required
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedBoard);

      const result = await controller.update(boardId.toString(), updateBoardDto);

      expect(result).toEqual(updatedBoard);
      expect(service.update).toHaveBeenCalledWith(boardId, updateBoardDto);

      return request(app.getHttpServer())
        .patch(`/board/${boardId}`)
        .expect(200)
        .expect(updatedBoard);
    });
  });

  describe('remove', () => {
    it('should remove a board by id', async () => {
      const boardId = 1;

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      const result = await controller.remove(boardId.toString());

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(boardId);

      return request(app.getHttpServer())
        .delete(`/board/${boardId}`)
        .expect(200);
    });
  });
});
