import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task/task.model";


@Entity()
export class TasksList {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title: string;

  @Column()
  number: number;

  @OneToMany(type => Task, task => task.list, {cascade: true, onDelete: "CASCADE"})
  tasks: Task[]

}