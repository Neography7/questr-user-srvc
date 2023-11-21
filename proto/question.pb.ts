/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";
import { Struct } from "./google/protobuf/struct.pb";

export const protobufPackage = "question";

/** Response */
export interface Response {
  status: number;
  error: boolean;
  message: string;
  data?: { [key: string]: any } | undefined;
}

/** Question */
export interface CreateQuestionRequest {
  authID?: string | undefined;
  question: string;
  userID?: string | undefined;
  anon?: boolean | undefined;
}

export interface DeleteQuestionRequest {
  authID: string;
  questionID: string;
}

/** Answer */
export interface CreateAnswerRequest {
  authID: string;
  questionID: string;
  answer: string;
}

export interface DeleteAnswerRequest {
  authID: string;
  questionID: string;
}

export interface GetQuestionsRequest {
  userID?: string | undefined;
  username?: string | undefined;
  page: number;
}

export interface GetQuestionRequest {
  userID?: string | undefined;
  questionID: string;
}

export interface GetUnansweredsRequest {
  authID: string;
}

export const QUESTION_PACKAGE_NAME = "question";

wrappers[".google.protobuf.Struct"] = { fromObject: Struct.wrap, toObject: Struct.unwrap } as any;

export interface QuestionServiceClient {
  createQuestion(request: CreateQuestionRequest): Observable<Response>;

  deleteQuestion(request: DeleteQuestionRequest): Observable<Response>;

  createAnswer(request: CreateAnswerRequest): Observable<Response>;

  deleteAnswer(request: DeleteAnswerRequest): Observable<Response>;

  getQuestions(request: GetQuestionsRequest): Observable<Response>;

  getQuestion(request: GetQuestionRequest): Observable<Response>;

  getUnanswereds(request: GetUnansweredsRequest): Observable<Response>;
}

export interface QuestionServiceController {
  createQuestion(request: CreateQuestionRequest): Promise<Response> | Observable<Response> | Response;

  deleteQuestion(request: DeleteQuestionRequest): Promise<Response> | Observable<Response> | Response;

  createAnswer(request: CreateAnswerRequest): Promise<Response> | Observable<Response> | Response;

  deleteAnswer(request: DeleteAnswerRequest): Promise<Response> | Observable<Response> | Response;

  getQuestions(request: GetQuestionsRequest): Promise<Response> | Observable<Response> | Response;

  getQuestion(request: GetQuestionRequest): Promise<Response> | Observable<Response> | Response;

  getUnanswereds(request: GetUnansweredsRequest): Promise<Response> | Observable<Response> | Response;
}

export function QuestionServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createQuestion",
      "deleteQuestion",
      "createAnswer",
      "deleteAnswer",
      "getQuestions",
      "getQuestion",
      "getUnanswereds",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("QuestionService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("QuestionService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const QUESTION_SERVICE_NAME = "QuestionService";
