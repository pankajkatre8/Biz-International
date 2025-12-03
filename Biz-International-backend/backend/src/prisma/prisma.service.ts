import "dotenv/config";
import { Injectable, OnModuleInit, INestApplication } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"; // adapter package

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });

    // pass adapter instance to PrismaClient (v7)
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // $on typing can be strict in TS; cast to any to avoid type error here
    (this as any).$on("beforeExit", async () => {
      await app.close();
    });
  }
}
