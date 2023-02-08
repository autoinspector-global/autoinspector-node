export const buildOAuthHeader = (accessToken?: string) => {
  return {
    ...(!!accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {}),
  };
};
