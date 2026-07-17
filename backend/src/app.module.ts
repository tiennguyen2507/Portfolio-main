import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { PostsModule } from './posts/posts.module';
import { ContactsModule } from './contacts/contacts.module';
import { CommentsModule } from './comments/comments.module';
import { ImageProxyModule } from './image/image-proxy.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ProjectsModule,
    PostsModule,
    ContactsModule,
    CommentsModule,
    ImageProxyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
