export const getAPIHeaderWithAuth = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};
