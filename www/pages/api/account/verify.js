import cookie from 'cookie';
// import { API_URL } from '../../../config/index';

const API_URL = process.env.NEXT_PUBLIC_API_HOST;

const verify = async (req, res) => {
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const access = cookies.access ?? false;

    if (!access) {
      return res.status(403).json({
        error: 'User forbidden for making this request',
      });
    }

    const body = JSON.stringify({
      token: access,
    });

    try {
      const apiRes = await fetch(`${API_URL}/api/token/verify/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (apiRes.status === 200) {
        return res.status(200).json({ success: 'Authenticated successfully' });
      } else {
        return res
          .status(apiRes.status)
          .json({ error: 'Failed to authenticate' });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Something went wrong while trying to authenticate' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};

export default verify;
