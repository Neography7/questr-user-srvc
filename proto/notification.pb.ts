/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";
import { Struct } from "./google/protobuf/struct.pb";

export const protobufPackage = "notification";

export enum NotificationType {
  UNKNOWN = 0,
  NEW_QUESTION = 1,
  UNRECOGNIZED = -1,
}

/** Response */
export interface Response {
  status: number;
  error: boolean;
  message: string;
  data?: { [key: string]: any } | undefined;
}

/** Push Notification */
export interface PushNotificationRequest {
  affectedID: string;
  causerID?: string | undefined;
  objectID: string;
  notificationType: string;
  message?: string | undefined;
}

export const NOTIFICATION_PACKAGE_NAME = "notification";

wrappers[".google.protobuf.Struct"] = { fromObject: Struct.wrap, toObject: Struct.unwrap } as any;

export interface NotificationServiceClient {
  pushNotification(request: PushNotificationRequest): Observable<Response>;
}

export interface NotificationServiceController {
  pushNotification(request: PushNotificationRequest): Promise<Response> | Observable<Response> | Response;
}

export function NotificationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["pushNotification"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("NotificationService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("NotificationService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const NOTIFICATION_SERVICE_NAME = "NotificationService";
