export interface IOAuth20Credentials {
  client_app_id: string;
  client_secret: string;
}

export interface IExchangeCodeForAccessToken {
  code: string;
}

export interface IExchangeCodeForAccessTokenOutput {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface IRefreshAccessToken {
  refresh_token: string;
}

export interface IRefreshAccessTokenOutput {
  access_token: string;
  expires_in: number;
}
