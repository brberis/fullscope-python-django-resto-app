import cookie from 'cookie';
// import { API_URL } from '../../../config/index';

const API_URL = process.env.NEXT_PUBLIC_API_HOST;
const refresh = async (req, res) => {
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const refresh = cookies.refresh ?? false;

    if (!refresh) {
      return res.status(401).json({
        error: 'User unauthorized for making this request',
      });
    }

    const body = JSON.stringify({
      refresh,
    });

    try {
      const apiRes = await fetch(`${API_URL}/api/token/refresh/`, {
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
        return res.status(200).json({ success: 'Refresh request successful' });
      } else {
        return res
          .status(apiRes.status)
          .json({ error: 'Failed to fulfill refresh request' });
      }
    } catch (error) {
      return res
        .status(500)
        .json({
          error: 'Something went wrong while trying to fulfill refresh request',
        });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};

export default refresh;
