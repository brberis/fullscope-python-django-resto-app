import cookie from 'cookie';

const API_URL = process.env.NEXT_PUBLIC_API_HOST;


const contacts = async (req, res) => {
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const access = cookies.access ?? false;
    const { query } = req.query;

    if (!access) {
      return res.status(401).json({
        error: 'User unauthorized to make this request',
      });
    }

    try {
      const apiRes = await fetch(`${API_URL}/api-v1/contact-search?query=${query}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${access}`,
        },
      });
      const data = await apiRes.json();
      if (apiRes.status === 200) {
        return res.status(200).json({ contacts: data });
      } else {
        return res.status(apiRes.status).json({ error: data.error });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Something went wrong while retrieving user' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};

export default contacts;
