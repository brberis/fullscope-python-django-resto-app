// import { API_URL } from '../../../config/index';

const API_URL = process.env.NEXT_PUBLIC_API_HOST;


const register = async (req, res) => {
  if (req.method === 'POST') {
    const { first_name, last_name, username, password, re_password } = req.body;

    const body = JSON.stringify({
      first_name,
      last_name,
      username,
      password,
      re_password,
    });

    try {
      // * This response is from Django
      const apiRes = await fetch(`${API_URL}/api/account/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      });
      const data = await apiRes.json();

      if (apiRes.status === 201) {
        // * This response is from Node.js
        return res.status(201).json({ success: data.success });
      } else {
        return res.status(apiRes.status).json({ error: data.error });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Something went wrong while registering an account' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};

export default register;
