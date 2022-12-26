import cookie from 'cookie';
const API_URL = process.env.NEXT_PUBLIC_API_HOST;

const login = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const body = JSON.stringify({
      username,
      password,
    });

    try {
      // * This response is from Django
      const apiRes = await fetch(`${API_URL}/api/token/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      });
      const data = await apiRes.json();

      if (apiRes.status === 200) {
        res.setHeader('Set-Cookie', [
          cookie.serialize('access', data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 30,
            sameSite: 'strict',
            path: '/api/',
          }),
          cookie.serialize('refresh', data.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24,
            sameSite: 'strict',
            path: '/api/',
          }),
        ]);

        // * This response is from Node.js
        return res.status(200).json({ success: 'Logged in successfully' });
      } else {
        return res
          .status(apiRes.status)
          .json({ error: 'Authentication failed' });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Something went wrong while authenticating' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};

export default login;
