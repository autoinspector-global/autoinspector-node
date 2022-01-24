export interface IOAuth20Credentials {
  clientappId: string;
  clientSecret: string;
}

export interface IExchangeCodeForAccessToken {
  code: string;
}

export interface IRefreshAccessToken {
  refreshToken: string;
}
