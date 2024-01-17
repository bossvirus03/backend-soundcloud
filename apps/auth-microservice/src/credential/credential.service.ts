import { Injectable } from "@nestjs/common";
// import { UpdateCredentialDto } from "./dto/update-credential.dto";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { InjectModel } from "@nestjs/mongoose";
import { SoftDeleteModel } from "soft-delete-plugin-mongoose";

import mongoose from "mongoose";
import { Credential, credentialDocument } from "./entities/credential.entity";

@Injectable()
export class CredentialService {
  constructor(
    @InjectModel(Credential.name)
    private credentialModel: SoftDeleteModel<credentialDocument>,
  ) {}

  getHashPassword(password: string) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  isValidPassword(password: string, hashPassword: string) {
    return compareSync(password, hashPassword);
  }

  findByUsername(username: string) {
    return this.credentialModel.findOne({ username: username });
  }

  findById(id: string) {
    return this.credentialModel.findOne({ _id: id });
  }

  create(id: mongoose.Types.ObjectId, username: string, password: string) {
    const pass = this.getHashPassword(password);
    return this.credentialModel.create({
      _id: id,
      username,
      password: pass,
    });
  }

  findAll() {
    return `This action returns all credential`;
  }

  findOne(id: number) {
    return `This action returns a #${id} credential`;
  }

  async findUserByToken(refreshToken: string) {
    return await this.credentialModel.findOne({ refreshToken });
  }

  async updateUserToken(refreshToken, _id) {
    return await this.credentialModel.updateOne({ _id }, { refreshToken });
  }
}
