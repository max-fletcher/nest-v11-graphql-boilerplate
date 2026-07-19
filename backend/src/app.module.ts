import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { BooksModule } from './books/books.module';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorsModule } from './authors/authors.module';
import { PrismaService } from './prisma/prisma.service';
import { createAuthorLoader } from './books/dataloaders/author.loader';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [PrismaModule],
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        context: () => ({
          authorLoader: createAuthorLoader(prisma),
        }),
      }),
    }),
    BooksModule,
    AuthorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
