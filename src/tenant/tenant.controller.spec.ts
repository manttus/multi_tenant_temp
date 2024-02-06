import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

const repositoryMockFactory: () => MockType<Repository<Tenant>> = jest.fn(
  () => ({
    save: jest.fn((entity) => entity),
    find: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
    delete: jest.fn((entity) => entity),
  }),
);

describe('TenantController', () => {
  let controller: TenantController;
  let repositoryMock: MockType<Repository<Tenant>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(TenantService),
          useFactory: repositoryMockFactory,
        },
        TenantService,
      ],
    }).compile();

    controller = module.get<TenantController>(TenantController);
    repositoryMock = await module.get(getRepositoryToken(Tenant));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('findAll', () => {
  //   it('should find all the tenants', async () => {
  //     const result: Tenant[] = [
  //       {
  //         id: 1,
  //         name: 'Raymon',
  //         schema: 'Raymon_Schema',
  //       },
  //     ];
  //     jest
  //       .spyOn(service, 'findAllTenants')
  //       .mockImplementation(async () => result);
  //     expect(await controller.findAll()).toBe(result);
  //   });
  // });
});
