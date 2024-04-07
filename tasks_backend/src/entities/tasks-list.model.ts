import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task/task.model";
import { TaskBoard } from "./task-board.model";


@Entity()
export class TasksList {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title: string;

  @Column()
  number: number;

  @OneToMany(type => Task, task => task.list, {eager: true, cascade: true, onDelete: "CASCADE"})
  tasks: Task[]

  @ManyToOne(type => TaskBoard, board => board.tasksLists, {onDelete: "CASCADE"})
  board: TaskBoard;

  @Column({nullable: true})
  order: number;
}