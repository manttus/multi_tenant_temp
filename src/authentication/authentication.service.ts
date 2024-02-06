import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthenticationService {
  constructor(private readonly httpService: HttpService) {}
  async signin(signinDto: { email: string; password: string }) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'http://localhost:8080/realms/company_formation/protocol/openid-connect/token',
          new URLSearchParams({
            client_id: 'company_client',
            client_secret: 'hQfgNzTVwCykUchgrfSR1w94kRQIg64D',
            grant_type: 'password',
            username: signinDto.email,
            password: signinDto.password,
          }),
        ),
      );
      return response.data;
    } catch (err) {
      return {
        message: err.response.data.error,
        description: err.response.data.error_description,
      };
    }
  }

  async signup(signupDto: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  }) {
    try {
      const admin = await firstValueFrom(
        this.httpService.post(
          'http://localhost:8080/realms/master/protocol/openid-connect/token',
          new URLSearchParams({
            username: 'admin',
            password: 'admin',
            grant_type: 'password',
            client_id: 'admin-cli',
          }),
        ),
      );
      const create = await firstValueFrom(
        this.httpService.post(
          'http://localhost:8080/admin/realms/company_formation/users',
          {
            firstName: signupDto.firstname,
            lastName: signupDto.lastname,
            username: signupDto.email,
            email: signupDto.email,
            credentials: [
              {
                type: 'password',
                value: signupDto.password,
                temporary: false,
              },
            ],
            enabled: true,
          },
          {
            headers: {
              Authorization: `Bearer ${admin.data.access_token}`,
            },
          },
        ),
      );
      const headerLocation = create.headers.location.split('/');
      const roles = await firstValueFrom(
        this.httpService.get(
          'http://localhost:8080/admin/realms/company_formation/clients/ac6aee50-8976-4ffd-990f-fb7597d929a5/roles/CLIENT',
          {
            headers: {
              Authorization: `Bearer ${admin.data.access_token}`,
            },
          },
        ),
      );
      const assign = await firstValueFrom(
        this.httpService.post(
          `http://localhost:8080/admin/realms/company_formation/users/${headerLocation[headerLocation.length - 1]}/role-mappings/clients/ac6aee50-8976-4ffd-990f-fb7597d929a5`,
          [{ ...roles.data }],
          {
            headers: {
              Authorization: `Bearer ${admin.data.access_token}`,
            },
          },
        ),
      );
      return {
        message: 'Account Create Successful',
        role: 'CLIENT',
      };
    } catch (err) {
      return {
        message: err.response.data.errorMessage
          ? err.response.data.errorMessage
          : 'Something went wrong',
      };
    }
  }
}
