import { IsNotEmpty } from "class-validator";

export class CreateLikeDto {
  @IsNotEmpty()
  quantity: string;

  @IsNotEmpty()
  track: string;
}
