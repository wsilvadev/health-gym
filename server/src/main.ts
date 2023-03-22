import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app/app.module'
import { AuthenticationGuard } from './infra/guards'

function appConfig(app: INestApplication) {
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: process.env.CORS_ORIGIN || '*',
    // methods: ['GET', ' PUT', ' PATCH', ' POST', ' DELETE'],
  })

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalGuards(new AuthenticationGuard(app.get(Reflector)))
}

function swaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Compass Trilhas')
    //.setDescription('The API Documentation')
    .setVersion('1.0')
    .build()

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      apisSorter: 'alpha',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  }

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('doc', app, document, customOptions)
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  appConfig(app)
  swaggerConfig(app)

  const logger = new Logger('Bootstrap')

  await app
    .listen(process.env.PORT || 3003)
    .then(async () => logger.log(`🚀 Server is running on: ${await app.getUrl()}`))
    .catch(err => logger.log(`❌ Error: ${err}`))
}
bootstrap()
