import {
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import axios from 'axios';

const loginUrl = new URL('https://fenix.tecnico.ulisboa.pt/oauth/userdialog');
loginUrl.searchParams.append('client_id', '3384764941729808');
loginUrl.searchParams.append(
  'redirect_uri',
  'http://localhost:8080/auth/callback',
);
loginUrl.searchParams.append('response_type', 'code');

const url = new URL('https://fenix.tecnico.ulisboa.pt/oauth/access_token');
url.searchParams.append('client_id', '3384764941729808');
url.searchParams.append(
  'client_secret',
  'F/XIjrfqn/MOr/ENZKHkIfhhPL+rflEW7w2n9N/tQfa6cGt2o4BR69M4utwQrk4ksfjvi6MtbtbewmteWBC4Tw==',
);
url.searchParams.append('redirect_uri', 'http://localhost:8080/auth/callback');
url.searchParams.append('code', 'code');

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //Enable oauth2 login for the user
  @HttpCode(200)
  @Get('login')
  @Redirect(loginUrl.toString())
  async login(): Promise<any> {
    return;
  }

  //Callback from oauth2 login
  @HttpCode(200)
  @Get('callback')
  async callback(@Query('code') code: string): Promise<any> {
    //redirect to oauth2 login page
    axios
      .post(
        `https://fenix.tecnico.ulisboa.pt/oauth/access_token?client_id=3384764941729808&client_secret=F/XIjrfqn/MOr/ENZKHkIfhhPL+rflEW7w2n9N/tQfa6cGt2o4BR69M4utwQrk4ksfjvi6MtbtbewmteWBC4Tw==&redirect_uri=http://localhost:8080/auth/callback&code=${code}&grant_type=authorization_code`,
      )
      .then((response) => {
        // Read the access token from the response body
        const accessToken = response.data.access_token;
        // Save the access token in the database
        return this.authService.oauth2Login(accessToken);
      })
      .catch((err) => console.log({ err }));
  }
}

/*
Auth URL https://fenix.tecnico.ulisboa.pt/oauth/userdialog
Token URL https://fenix.tecnico.ulisboa.pt/oauth/access_token
Refresh URL https://fenix.tecnico.ulisboa.pt/oauth/refresh_token
client_id  3384764941729808
client_secret F/XIjrfqn/MOr/ENZKHkIfhhPL+rflEW7w2n9N/tQfa6cGt2o4BR69M4utwQrk4ksfjvi6MtbtbewmteWBC4Tw== */
