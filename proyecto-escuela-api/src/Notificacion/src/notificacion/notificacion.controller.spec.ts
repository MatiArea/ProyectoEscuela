import { Test, TestingModule } from '@nestjs/testing';
import { NotificacionController } from './notificacion.controller';

describe('Notificacion Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [NotificacionController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: NotificacionController = module.get<NotificacionController>(NotificacionController);
    expect(controller).toBeDefined();
  });
});
