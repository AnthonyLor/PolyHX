import { Test, TestingModule } from '@nestjs/testing';
import { MatrixService } from './generate-world.service';

describe('GenerateWorldService', () => {
  let service: MatrixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatrixService],
    }).compile();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    service = module.get<MatrixService>(MatrixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
