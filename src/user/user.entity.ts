import { Entity, ObjectIdColumn, ObjectId, Column, Unique } from 'typeorm';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

@Entity('users')
@Unique(["username", "email"])
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @Transform(({ value }) => sanitizeHtml(value))
  username: string;

  @Column()
  @Transform(({ value }) => sanitizeHtml(value))
  nickname: string;

  @Column()
  @Transform(({ value }) => sanitizeHtml(value))
  email: string;

  @Column({ select: false })
  @Transform(({ value }) => sanitizeHtml(value))
  password: string;
  
  @Column()
  @Transform(({ value }) => sanitizeHtml(value))
  avatar: string;

  @Column()
  @Transform(({ value }) => sanitizeHtml(value))
  bio: string;

  @Column()
  isActive: boolean;
}