import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('signin')
  signin(@Body() signinDto: { email: string; password: string }) {
    return this.authenticationService.signin(signinDto);
  }

  @Post('signup')
  signup(
    @Body()
    signupDto: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
    },
  ) {
    return this.authenticationService.signup(signupDto);
  }
}
