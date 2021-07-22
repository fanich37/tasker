export const parseToken = (token: Token) => {
  try {
    const parsed = JSON.parse(token);
    const { user } = parsed;

    return user;
  } catch (error) {
    throw new Error(`[parseToken]. Error: ${error.message}`);
  }
};
