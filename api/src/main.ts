import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('NestJS Swagger')
    .setDescription('nestJS + dynamoDB + SAM')
    .setVersion('1.0')
    .addBearerAuth(
      {    
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token'
    )
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  
  const reflector = app.get(Reflector); //추가
  app.useGlobalGuards(new JwtAuthGuard(reflector)); //추가

  const PORT = process.env.PORT || 3000;
  
  console.info(`서버 ${PORT} 실행중~`);
  await app.listen(PORT);
}
bootstrap();
