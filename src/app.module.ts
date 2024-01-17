import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { AuthModule } from './modules/auth/auth.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    TaskModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 10000,
          limit: 10,
        },
      ],
      storage: new ThrottlerStorageRedisService(),
    }),
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
