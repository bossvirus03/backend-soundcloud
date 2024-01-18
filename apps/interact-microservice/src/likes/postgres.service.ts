import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool } from "pg";

@Injectable()
export class PostgresService {
  private readonly pool: Pool;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      user: configService.get<string>("POSTGRES_USERNAME"),
      host: configService.get<string>("POSTGRES_HOST"),
      database: configService.get<string>("POSTGRES_DATABASE"),
      password: configService.get<string>("POSTGRES_PASSWORD"),
      port: configService.get<number>("POSTGRES_PORT"),
    });
  }

  async query(sql: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(sql, params);
      return result.rows;
    } finally {
      client.release();
    }
  }
}
