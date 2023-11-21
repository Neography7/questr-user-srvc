/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";
import { Struct } from "./google/protobuf/struct.pb";

export const protobufPackage = "user";

/** Response */
export interface Response {
  status: number;
  error: boolean;
  message: string;
  data?: { [key: string]: any } | undefined;
}

/** User */
export interface GetUserByIDReqest {
  id: string;
}

export interface UserResponse {
  id: string;
  username: string;
}

export interface UserRequest {
  id: string;
}

/** Get User */
export interface GetUserRequest {
  username: string;
}

/** Register */
export interface CreateUserRequest {
  email: string;
  username: string;
  nickname: string;
  password: string;
}

/** Validate User */
export interface ValidateUserRequest {
  email: string;
  password: string;
}

/** UploadAvatarRequest */
export interface UploadAvatarRequest {
  userID: string;
  avatarBase64: string;
}

/** Change Password */
export interface ChangePasswordRequest {
  userID: string;
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

/** Change Information Request */
export interface ChangeInformationRequest {
  userID: string;
  email: string;
  username: string;
  nickname: string;
  bio: string;
}

/** User */
export interface GetInformationRequest {
  id: string;
}

export const USER_PACKAGE_NAME = "user";

wrappers[".google.protobuf.Struct"] = { fromObject: Struct.wrap, toObject: Struct.unwrap } as any;

export interface UserServiceClient {
  user(request: UserRequest): Observable<Response>;

  createUser(request: CreateUserRequest): Observable<Response>;

  validateUser(request: ValidateUserRequest): Observable<Response>;

  getUserById(request: GetUserByIDReqest): Observable<Response>;

  getUser(request: GetUserRequest): Observable<Response>;

  uploadAvatar(request: UploadAvatarRequest): Observable<Response>;

  changePassword(request: ChangePasswordRequest): Observable<Response>;

  changeInformation(request: ChangeInformationRequest): Observable<Response>;

  getInformation(request: GetInformationRequest): Observable<Response>;
}

export interface UserServiceController {
  user(request: UserRequest): Promise<Response> | Observable<Response> | Response;

  createUser(request: CreateUserRequest): Promise<Response> | Observable<Response> | Response;

  validateUser(request: ValidateUserRequest): Promise<Response> | Observable<Response> | Response;

  getUserById(request: GetUserByIDReqest): Promise<Response> | Observable<Response> | Response;

  getUser(request: GetUserRequest): Promise<Response> | Observable<Response> | Response;

  uploadAvatar(request: UploadAvatarRequest): Promise<Response> | Observable<Response> | Response;

  changePassword(request: ChangePasswordRequest): Promise<Response> | Observable<Response> | Response;

  changeInformation(request: ChangeInformationRequest): Promise<Response> | Observable<Response> | Response;

  getInformation(request: GetInformationRequest): Promise<Response> | Observable<Response> | Response;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "user",
      "createUser",
      "validateUser",
      "getUserById",
      "getUser",
      "uploadAvatar",
      "changePassword",
      "changeInformation",
      "getInformation",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
