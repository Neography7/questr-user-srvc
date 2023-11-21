import { UserService } from './user.service';
import { Controller, HttpStatus } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { USER_SERVICE_NAME, Response } from '../../proto/user.pb';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {
  CreateUserDto,
  LoginUserDto,
  GetUserByIDDto,
  ChangePasswordDto,
  UploadAvatarDto,
  ChangeInformationDto,
  GetInformationDto,
  GetUserDto,
} from './user.dto';
import * as bcrypt from 'bcrypt';
import { S3Service } from 'src/s3/s3.service';
import * as i18next from 'i18next';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly s3Service: S3Service,
  ) {}

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @GrpcMethod(USER_SERVICE_NAME, 'GetUserByID')
  async getUserByID(data: GetUserByIDDto): Promise<Response> {
    const user = await this.userService.findUserByID(data.id);

    if (!user)
      return {
        status: HttpStatus.NOT_FOUND,
        message: i18next.t('callback.USER_NOT_FOUND'),
        error: true,
      };

    return {
      status: HttpStatus.ACCEPTED,
      message: '',
      error: false,
      data: {
        user: {
          id: user._id.toString(),
          username: user.username,
          nickname: user.nickname,
          email: user.email,
          avatar: user.avatar,
        },
      },
    };
  }

  @GrpcMethod(USER_SERVICE_NAME, 'GetUser')
  async getUser(data: GetUserDto): Promise<Response> {
    const user = await this.userService.findUserByUsername(data.username);

    if (!user)
      return {
        status: HttpStatus.NOT_FOUND,
        message: i18next.t('callback.USER_NOT_FOUND'),
        error: true,
      };

    return {
      status: HttpStatus.ACCEPTED,
      message: '',
      error: false,
      data: {
        user: {
          id: user._id.toString(),
          username: user.username,
          nickname: user.nickname,
          avatar: user.avatar,
          bio: user.bio,
        },
      },
    };
  }

  @GrpcMethod(USER_SERVICE_NAME, 'ValidateUser')
  async login(data: LoginUserDto): Promise<Response> {
    const user = await this.userService.findUsernameOrEmail(data.email);

    if (!user)
      return {
        status: HttpStatus.NOT_ACCEPTABLE,
        message: i18next.t('callback.USER_NOT_FOUND'),
        error: true,
      };

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch)
      return {
        status: HttpStatus.NOT_ACCEPTABLE,
        message: i18next.t('callback.PASSWORD_INCORRECT'),
        error: true,
      };

    return {
      status: HttpStatus.ACCEPTED,
      message: '',
      error: false,
      data: {
        user: {
          id: user._id.toString(),
          username: user.username,
          nickname: user.nickname,
          email: user.email,
          avatar: user.avatar,
        },
      },
    };
  }

  @GrpcMethod(USER_SERVICE_NAME, 'CreateUser')
  async register(data: CreateUserDto): Promise<Response | null> {

    try {
      const existingUsername = await this.userRepository.findOne({
        where: { username: data.username },
      });

      if (existingUsername) {
        return {
          status: HttpStatus.NOT_ACCEPTABLE,
          message: i18next.t('callback.USERNAME_IN_USE'), 
          error: true,
        };
      }

      const existingEmail = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (existingEmail) {
        return {
          status: HttpStatus.NOT_ACCEPTABLE,
          message: i18next.t('callback.EMAIL_IN_USE'), 
          error: true,
        };
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: i18next.t('callback.ERROR_OCCURED'), 
        error: true,
      };
    }

    const user = new User();

    user.username = data.username;
    user.nickname = data.nickname;
    user.email = data.email;
    user.password = await bcrypt.hash(data.password, 10);

    try {
      await this.userRepository.save(user);

      const userID = user._id.toString();

      return {
        status: HttpStatus.CREATED,
        message: i18next.t('callback.REGISTRATION_SUCCESSFUL'), 
        error: false,
        data: {
          user: {
            id: userID,
            username: data.username,
            nickname: data.nickname,
            email: data.email,
            avatar: user.avatar,
          },
        },
      };
    } catch (err) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: i18next.t('callback.ERROR_OCCURED'),
        error: true,
      };
    }
  }

  @GrpcMethod(USER_SERVICE_NAME, 'ChangePassword')
  async changePassword(data: ChangePasswordDto): Promise<Response | null> {
    const user = await this.userService.find(data.userID);

    if (!user)
      return {
        status: HttpStatus.NOT_FOUND,
        message: i18next.t('callback.USER_NOT_FOUND'),
        error: true,
      };

    const newPasswordHash = await bcrypt.hash(data.newPassword, 10);

    try {
      await this.userRepository.update(user, {
        password: newPasswordHash,
      });

      return {
        status: HttpStatus.CREATED,
        message: i18next.t('callback.PASSWORD_CHANGED'),
        error: false,
      };
    } catch (err) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: i18next.t('callback.ERROR_OCCURED'),
        error: true,
      };
    }
  }

  @GrpcMethod(USER_SERVICE_NAME, 'UploadAvatar')
  async uploadAvatar(data: UploadAvatarDto): Promise<Response | null> {
    const user = await this.userService.find(data.userID);

    if (!user)
      return {
        status: HttpStatus.NOT_FOUND,
        message: i18next.t('callback.USER_NOT_FOUND'),
        error: true,
      };

    const s3ObjectUrl = await this.s3Service.uploadBase64ToS3(
      data.avatarBase64,
      `${data.userID}_avatar`,
      'user/avatar',
    );

    try {
      await this.userRepository.update(user, {
        avatar: s3ObjectUrl,
      });

      return {
        status: HttpStatus.CREATED,
        message: i18next.t('callback.AVATAR_UPLOADED'),
        error: false,
        data: { avatar: s3ObjectUrl },
      };
    } catch (err) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: i18next.t('callback.ERROR_OCCURED'),
        error: true,
      };
    }
  }

  @GrpcMethod(USER_SERVICE_NAME, 'ChangeInformation')
  async changeInformation(
    data: ChangeInformationDto,
  ): Promise<Response | null> {
    const user = await this.userService.find(data.userID);

    if (!user)
      return {
        status: HttpStatus.NOT_FOUND,
        message: i18next.t('callback.USER_NOT_FOUND'),
        error: true,
      };

    try {
      if (user.username !== data.username) {
        const existingUsername = await this.userRepository.findOne({
          where: { username: data.username },
        });

        if (existingUsername) {
          return {
            status: HttpStatus.NOT_ACCEPTABLE,
            message: i18next.t('callback.USERNAME_IN_USE'),
            error: true,
          };
        }
      }

      if (user.email !== data.email) {
        const existingEmail = await this.userRepository.findOne({
          where: { email: data.email },
        });

        if (existingEmail) {
          return {
            status: HttpStatus.NOT_ACCEPTABLE,
            message: i18next.t('callback.EMAIL_IN_USE'),
            error: true,
          };
        }
      }
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: i18next.t('callback.ERROR_OCCURED'),
        error: true,
      };
    }

    try {

      await this.userRepository.update(user, {
        username: data.username,
        nickname: data.nickname,
        email: data.email,
        bio: data.bio,
      });

      return {
        status: HttpStatus.CREATED,
        message: i18next.t('callback.INFO_CHANGED'),
        error: false,
        data: {
          username: data.username,
          nickname: data.nickname,
          email: data.email,
          avatar: user.avatar,
          bio: user.bio,
        },
      };
    } catch (err) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: i18next.t('callback.ERROR_OCCURED'),
        error: true,
      };
    }
  }

  @GrpcMethod(USER_SERVICE_NAME, 'GetInformation')
  async getInformation(data: GetInformationDto): Promise<Response> {
    const user = await this.userService.findUserByID(data.id);

    if (!user)
      return {
        status: HttpStatus.NOT_FOUND,
        message: i18next.t('callback.USER_NOT_FOUND'),
        error: true,
      };

    return {
      status: HttpStatus.ACCEPTED,
      message: '',
      error: false,
      data: {
        user: {
          id: user._id.toString(),
          username: user.username,
          nickname: user.nickname,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
        },
      },
    };
  }
}