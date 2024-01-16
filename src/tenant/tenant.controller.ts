import { Body, Controller, Get, Post } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { Tenant } from './entities/tenant.entity';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async create(@Body() data: { name: string }) {
    const response = this.tenantService.createTenant(data.name);
    return response;
  }

  @Get()
  async findAll(): Promise<Tenant[]> {
    return await this.tenantService.findAllTenants();
  }

  async login(
    @Body() credentials: { username: string; password: string },
  ): Promise<string> {
    const tenant = await this.tenantService.findTenantByName(
      credentials.username,
    );
    if (tenant) {
      await this.tenantService.switchSchema(tenant.schema);
      return 'Login successful';
    } else {
      return 'Invalid credentials';
    }
  }
}
