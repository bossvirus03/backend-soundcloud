import { Controller, Get, Patch, Param } from "@nestjs/common";
import { CredentialService } from "./credential.service";

@Controller("credential")
export class CredentialController {
  constructor(private readonly credentialService: CredentialService) {}

  @Get()
  findAll() {
    return this.credentialService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.credentialService.findOne(+id);
  }

  @Patch(":id")
  update() {
    // @Body() updateCredentialDto: UpdateCredentialDto, // @Param("id") id: string,
    // return this.credentialService.update(+id, updateCredentialDto);
    return 1;
  }
}
