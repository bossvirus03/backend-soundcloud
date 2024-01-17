import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type credentialDocument = HydratedDocument<Credential>;

@Schema()
export class Credential {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  refreshToken: string;
}

export const credentialSchema = SchemaFactory.createForClass(Credential);
