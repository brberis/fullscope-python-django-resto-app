import { useState } from "react";
import Layout from "../components/Layout";

export default function ContactUs() {

  const [sent, setSend] = useState(false);

  const formHandler = async (e) => {
    setSend('in-progress');
    e.preventDefault()
    const newMessage = JSON.stringify({
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    });

    try {
        // * This response is from NextJs
        const apiRes = await fetch(`/api/email/`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: newMessage,
        });
        const data = await apiRes;
        if (data.status === 200) {
          setSend(true);
        }

      // await dispatch(emailActions.sendEmail(newMessage));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout>
        {/* Header */}
        <div className="bg-warm-gray-50 -mt-10">
          Header
        </div>

        {/* Contact section */}
        <section className="mb-40 relative bg-white" aria-labelledby="contact-heading">
          Form section
        </section>
    </Layout>
  )
}

