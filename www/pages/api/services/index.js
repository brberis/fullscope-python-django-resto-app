import cookie from 'cookie';

const API_URL = process.env.NEXT_PUBLIC_API_HOST;


const services = async (req, res) => {

  // GET all services
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const access = cookies.access ?? false;

    if (!access) {
      return res.status(401).json({
        error: 'User unauthorized to make this request',
      });
    }

    try {
      const apiRes = await fetch(`${API_URL}/api-v1/services`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${access}`,
        },
      });
      const data = await apiRes.json();
      if (apiRes.status === 200) {
        return res.status(200).json({ services: data });
      } else {
        return res
          .status(apiRes.status)
          .json({ error: 'Failed to authenticate' });
      }

    } catch (err) {
      console.log(err);
    }
  };

  // Post a service
  if (req.method === 'POST') {
    const cookies = cookie.parse(req.headers.cookie ?? '');
    const access = cookies.access ?? false;

    if (!access) {
      return res.status(401).json({
        error: 'User unauthorized to make this request',
      });
    }

    try {
      const apiRes = await fetch(`${API_URL}/api-v1/services`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access}`,
        },
        body: JSON.stringify(req.body)
      });
      if (apiRes.status === 201) {
        return res.status(201).json({ success: 'success' });
      } else {
        return res
          .status(apiRes.status)
          .json({ error: 'Failed to authenticate' });
      }

    } catch (err) {
      console.log(err);
    }
  };


}

export default services;
