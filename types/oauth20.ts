export interface IOAuth20Credentials {
  clientappId: string;
  clientSecret: string;
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
  refreshToken: string;
}

export interface IRefreshAccessTokenOutput {
  access_token: string;
  expires_in: number;
}
