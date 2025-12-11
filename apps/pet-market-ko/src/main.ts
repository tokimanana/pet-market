import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuration CORS pour production
  app.enableCors({
    origin: [
      'http://localhost:4200', // Dev local Angular
      'http://localhost:3000', // Dev local (si besoin)
      /\.onrender\.com$/, // Tous les sous-domaines Render (backend + frontend)
      // Ajoutez votre URL frontend exacte après déploiement :
      // 'https://pet-market-frontend.onrender.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Validation globale des DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Retire les propriétés non définies dans les DTOs
      forbidNonWhitelisted: true, // Rejette les requêtes avec des propriétés inconnues
      transform: true, // Transforme automatiquement les payloads selon les DTOs
      transformOptions: {
        enableImplicitConversion: true, // Convertit automatiquement les types
      },
    })
  );

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0'); // Ecouter sur 0.0.0.0 pour Render
  
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
