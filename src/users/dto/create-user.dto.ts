import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  username: string;

  age: number;

  @IsNotEmpty({ message: 'password khong dc de trong' })
  @IsString()
  password: string;
  address: string;
  @IsNotEmpty({ message: 'email khong dc de trong' })
  @IsEmail({}, { message: 'dinh dang nay phai la email' })
  email: string;
}
