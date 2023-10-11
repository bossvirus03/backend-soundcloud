import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'password',
  'username',
] as const) {
  _id: string;
  username: string;
  age: number;
  address: string;
}
