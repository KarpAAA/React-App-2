import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TasksList } from "./tasks-list.model";


@Entity()
export class TaskBoard {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title:string;

  @OneToMany(type => TasksList, list => list.board,
    {eager: true, onDelete: "CASCADE", onUpdate: "CASCADE"})
  tasksLists: TasksList[];
}