import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb'

@Injectable()
export class UserService {

    @InjectRepository(User) 
    private userRepository: Repository<User>;

    public async find(id: string): Promise<any> {
        const objectID = new ObjectId(id);
        
        const existingUser = await this.userRepository.findOne({ where: { _id: objectID } });

        if (existingUser) {
            return existingUser;
        } else {
            return false;
        }

    }

    public async findUserByID(id: string, data?: any): Promise<any> {
        const objectID = new ObjectId(id);

        const select: any = data ?? ["_id", "username", "nickname", "email", "avatar", "bio"];
        
        const existingUser = await this.userRepository.findOne({ where: { _id: objectID }, select });

        if (existingUser) {
            return existingUser;
        } else {
            return false;
        }

    }

    public async findUserByUsername(username: string, data?: any): Promise<any> {

        const select: any = data ?? ["_id", "username", "nickname", "email", "avatar", "bio"];

        const existingUser = await this.userRepository.findOne({ where: { username }, select });

        if (existingUser) {
            return existingUser;
        } else {
            return false;
        }

    }

    public async findUsernameOrEmail(usernameOrEmail: string): Promise<any> {

        const existingUsername = await this.userRepository.findOne({ where: { username: usernameOrEmail }, select: ["_id", "username", "nickname", "email", "password", "avatar"] });

        if (existingUsername) 
            return existingUsername;

        const existingEmail = await this.userRepository.findOne({ where: { email: usernameOrEmail }, select: ["_id", "username", "nickname", "email", "password", "avatar"] });

        if (existingEmail) {
            return existingEmail;
        } else {
            return false;
        }

    }
}