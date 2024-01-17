import { Module } from "@nestjs/common";
import { CredentialService } from "./credential.service";
import { CredentialController } from "./credential.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Credential, credentialSchema } from "./entities/credential.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Credential.name, schema: credentialSchema },
    ]),
  ],
  controllers: [CredentialController],
  providers: [CredentialService],
  exports: [CredentialService],
})
export class CredentialModule {}
