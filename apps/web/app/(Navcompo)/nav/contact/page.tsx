'use client';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

type ContactForm = {
  name: string;
  number: string;
  email: string;
  message: string;
};

const Contact = () => {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    number: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/contact/contact`, form);
      
      setForm({ name: '', number: '', email: '', message: '' });
      toast.success("message sent successfully")
    } catch (err) {
      console.error('Message send failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="overflow-hidden flex items-center justify-center sm:px-4 mt-24">
      <section className="p-4 w-full sm:max-w-[1152px] mx-auto text-center  ">
        <h1 className="text-4xl text-black font-bold mb-1">
          Conta<span className="text-orange-500">ct Us</span>
        </h1>
        <p className="text-gray-600 text-[18px]">
          Have questions or need support? Reach out to us!
        </p>
        <div className="relative">
          <div className="absolute w-[95%] h-[60%] top-20 left-14 bg-orange-200 opacity-50 rounded-full blur-[100px] z-[-1]"></div>

          <div className="grid md:grid-cols-2 grid-cols-1 mt-6 sm:mt-[35px] gap-10">
            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-gray-00 p-6 rounded-lg border shadow-[0_0_10px_rgba(200,100,100,20)]"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full p-2 mb-4 bg-gray-00 border mt-2 text-black rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={form.name}
                onChange={handleChange}
                required
              />
      <input
        type="tel"
        name="number"
        placeholder="Your number"
        className="w-full p-2 mb-4 bg-gray-00 text-black border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        value={form.number}
        maxLength={10}
        onChange={(e) => {
          const value = e.target.value;
          if (/^[+0-9]{0,13}$/.test(value)) {
            setForm((prev) => ({
              ...prev,
              number: value,
            }));
          }
        }}
        required
      />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-2 mb-4 bg-gray-00 text-black border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={form.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="w-full p-2 bg-gray-00 text-black border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                rows={11}
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-400 hover:bg-orange-500 px-4 py-2 text-[18px] rounded transition duration-300 ease-in-out text-white"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
             
            </form>

            <div className="w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3793.0909793093797!2d74.0068627!3d18.067342500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc259c774edce29%3A0xcbb9ebc30425056f!2sViraj%20Multipurpose%20Hall!5e0!3m2!1sen!2sin!4v1746471900796!5m2!1sen!2sin"
                width="100%"
                height="400"
                className="rounded-lg w-full h-[300px] md:h-[580px] border shadow-[0_0_10px_rgba(200,100,100,20)]"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

 <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {/* Catering Contact */}
            <div className="bg-white border  p-6 rounded-xl shadow-[0_0_10px_rgba(200,100,100,20)]">
              <h3 className="text-lg font-semibold text-orange-600 mb-2">🍽 Catering Inquiries</h3>
              <p className="text-gray-700 ">Want a different menu? Talk to our catering expert.</p>
              <p className="mt-2 text-sm text-gray-700 font-medium">👨‍🍳 Mr. Rakesh Mehra</p>
              <p className="text-sm text-gray-700">📞 +91 98765 43210</p>
              <div className="mt-3 flex gap-3">
                <a href="tel:+919876543210" className="px-5 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600">Call</a>
                <a href="https://wa.me/919876543210" target="_blank" className="px-5 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600">WhatsApp</a>
              </div>
            </div>

            <div className="bg-white border  p-6 rounded-xl  shadow-[0_0_10px_rgba(200,100,100,20)]">
              <h3 className="text-lg font-semibold text-orange-600 mb-2">🎨 Decor Customization</h3>
              <p className="text-gray-700 ">Looking for a unique decor theme? Contact our design team.</p>
              <p className="mt-2 text-sm text-gray-700 font-medium">🎨 Ms. Anjali Verma</p>
              <p className="text-sm text-gray-700">📞 +91 91234 56789</p>
              <div className="mt-3 flex gap-3">
                <a href="tel:+919123456789" className="px-5 py-2 bg-orange-500 text-white text-sm rounded hover:bg-orange-600">Call</a>
                <a href="https://wa.me/919123456789" target="_blank" className="px-5 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600">WhatsApp</a>
              </div>
            </div>
          </div>

          <div className="mt-14 text-center">
            <h2 className="text-2xl font-bold text-orange-500 mb-2">📍 Our Hall Address</h2>
            <p className="text-gray-700 text-[16px] font-medium leading-relaxed">
              Viraj Multipurpose Hall, Near 412802,
              Old NH4,<br /> Kini, Maharashtra 416112
            </p>
          </div>
                </div>
      </section>
    </main>
  );
};

export default Contact;
