import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {
  //Enable oauth2 login for the user
  async oauth2Login(access_token: string): Promise<any> {
    //Get user info
    axios
      .get('https://fenix.tecnico.ulisboa.pt/tecnico-api/v2/person', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  }
}
