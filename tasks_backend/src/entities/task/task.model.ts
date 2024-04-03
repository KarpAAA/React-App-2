import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskPriority } from "./task.priority";
import { TaskStatus } from "./task.status";
import { Operation } from "../operation.model";
import { TasksList } from "../tasks.list.model";

@Entity()
export class Task {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string

  @Column({length: 500})
  content: string

  @Column()
  date: string

  @Column()
  priority: TaskPriority

  @Column()
  status: TaskStatus

  @OneToMany(type => Operation, operation => operation.task, {cascade: true, eager: true, onDelete: "CASCADE"})
  history: Operation[]

  @ManyToOne(type => TasksList, tasksList => tasksList.tasks, { onDelete: "CASCADE"})
  list: TasksList

}