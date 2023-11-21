import { IsString, IsAlphanumeric, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ChangePasswordRequest, CreateUserRequest, GetUserRequest, GetUserByIDReqest, ValidateUserRequest, UploadAvatarRequest, ChangeInformationRequest, GetInformationRequest } from '../../proto/user.pb';
import * as i18next from 'i18next';

export class CreateUserDto implements CreateUserRequest {
  @IsAlphanumeric(undefined, { message: () => i18next.t('validation.INVALID_ALPHANUMERIC', { field: 'username' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'username' }) })
  public readonly username: string;

  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'nickname' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'nickname' }) })
  public readonly nickname: string;

  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'password' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'password' }) })
  public readonly password: string;

  @IsEmail({ allow_ip_domain: false }, { message: () => i18next.t('validation.INVALID_EMAIL', { field: 'email' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'email' }) })
  public readonly email: string;
}

export class LoginUserDto implements ValidateUserRequest {
  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'email' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'email' }) })
  public readonly email: string;

  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'password' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'password' }) })
  public readonly password: string;
}

export class GetUserByIDDto implements GetUserByIDReqest {
  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'id' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'id' }) })
  public readonly id: string;
}

export class GetUserDto implements GetUserRequest {
  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'username' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'username' }) })
  public readonly username: string;
}

export class ChangePasswordDto implements ChangePasswordRequest {
  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'userID' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'userID' }) })
  public readonly userID: string;

  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'oldPassword' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'oldPassword' }) })
  public readonly oldPassword: string;

  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'newPassword' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'newPassword' }) })
  public readonly newPassword: string;

  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'newPasswordConfirmation' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'newPasswordConfirmation' }) })
  public readonly newPasswordConfirmation: string;
}

export class UploadAvatarDto implements UploadAvatarRequest {
  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'userID' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'userID' }) })
  public readonly userID: string;

  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'avatarBase64' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'avatarBase64' }) })
  public readonly avatarBase64: string;
}

export class ChangeInformationDto implements ChangeInformationRequest {
  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'userID' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'userID' }) })
  public readonly userID: string;
  
  @IsAlphanumeric(undefined, { message: () => i18next.t('validation.INVALID_ALPHANUMERIC', { field: 'username' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'username' }) })
  public readonly username: string;

  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'nickname' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'nickname' }) })
  public readonly nickname: string;

  @IsEmail({ allow_ip_domain: false }, { message: () => i18next.t('validation.INVALID_EMAIL', { field: 'email' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'email' }) })
  public readonly email: string;

  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'bio' }) })
  @IsOptional()
  public readonly bio: string;
}

export class GetInformationDto implements GetInformationRequest {
  @IsString({ message: () => i18next.t('validation.INVALID_STRING', { field: 'id' }) })
  @IsNotEmpty({ message: () => i18next.t('validation.NOT_EMPTY', { field: 'id' }) })
  public readonly id: string;
}