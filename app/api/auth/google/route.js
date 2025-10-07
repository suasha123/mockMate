
export async function GET(req) {
  const redirect_uri = "https://safe-vault-li5g.vercel.app/api/auth/google/callback";

  const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&scope=openid%20email%20profile`;

  return Response.redirect(googleAuthURL);
}
