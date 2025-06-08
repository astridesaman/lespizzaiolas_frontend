'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import AnimatedAlert from '../components/AnimatedAlert.tsx';
import useAlert from '../hooks/useAlert.tsx';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
    },
  }),
};

const Contact = () => {
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isPro, setIsPro] = useState(false);
  const [detailsPro, setDetailsPro] = useState({
    company: '',
    eventType: '',
    date: '',
    attendees: '',
  });

  const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showAlert({ show: true, text: 'Tous les champs sont requis.', type: 'danger' });
      return;
    }

    if (!validateEmail(form.email)) {
      showAlert({ show: true, text: 'Adresse email invalide.', type: 'danger' });
      return;
    }

    setLoading(true);

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: 'Astride SAMAN',
          from_email: form.email,
          to_email: 'astridesmn@gmail.com',
          message:
            form.message +
            (isPro
              ? `\n\n---\n[DEMANDE PRO]\nEntreprise : ${detailsPro.company}\nÉvénement : ${detailsPro.eventType}\nDate : ${detailsPro.date}\nParticipants : ${detailsPro.attendees}`
              : ''),
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          showAlert({ show: true, text: 'Merci pour votre message 😃', type: 'success' });
          setTimeout(() => {
            hideAlert(false);
            setForm({ name: '', email: '', message: '' });
            setDetailsPro({ company: '', eventType: '', date: '', attendees: '' });
            setIsPro(false);
          }, 3000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          showAlert({ show: true, text: "Votre message n'a pas pu être envoyé 😢", type: 'danger' });
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#111111] text-white border-t border-[#292929]"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,115,0,0.08)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-3xl mx-auto z-10">
        <AnimatedAlert show={alert.show} text={alert.text} type={alert.type} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.h2
            variants={fadeIn}
            custom={1}
            className="text-4xl font-bold text-center mb-4 text-primary-pizza"
          >
            📬 Prenons contact
          </motion.h2>

          <motion.p
            variants={fadeIn}
            custom={2}
            className="text-center text-neutral-400 max-w-xl mx-auto mb-10"
          >
            Pour toute demande spéciale (commande, partenariat, événement privé),
            remplissez ce formulaire et nous reviendrons vers vous rapidement.
          </motion.p>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            variants={fadeIn}
            custom={3}
            className="space-y-6 bg-[#1c1c1c]/80 p-8 rounded-2xl shadow-xl border border-[#2c2c2c] backdrop-blur"
          >
            <motion.div variants={fadeIn} custom={4}>
              <label htmlFor="name" className="block text-sm mb-1 font-medium">Nom complet</label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="ex., John Doe"
                className="w-full px-4 py-3 rounded-md bg-neutral-800 border border-neutral-600 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-pizza transition"
              />
            </motion.div>

            <motion.div variants={fadeIn} custom={5}>
              <label htmlFor="email" className="block text-sm mb-1 font-medium">Adresse email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="ex., johndoe@mail.com"
                className="w-full px-4 py-3 rounded-md bg-neutral-800 border border-neutral-600 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-pizza transition"
              />
            </motion.div>

            <motion.div variants={fadeIn} custom={6} className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPro"
                checked={isPro}
                onChange={() => setIsPro(!isPro)}
                className="w-4 h-4 accent-primary-pizza"
              />
              <label htmlFor="isPro" className="text-sm">
                Je contacte pour une entreprise ou un événement privé
              </label>
            </motion.div>

            {isPro && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1 font-medium">Nom de l’entreprise</label>
                  <input
                    type="text"
                    name="company"
                    value={detailsPro.company}
                    onChange={(e) => setDetailsPro({ ...detailsPro, company: e.target.value })}
                    placeholder="ex., Nom de l'entreprise"
                    className="w-full px-4 py-3 rounded-md bg-neutral-800 border border-neutral-600 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 font-medium">Type d’événement</label>
                  <input
                    type="text"
                    name="eventType"
                    value={detailsPro.eventType}
                    onChange={(e) => setDetailsPro({ ...detailsPro, eventType: e.target.value })}
                    placeholder="ex., Comité d'entreprise, Anniversaire..."
                    className="w-full px-4 py-3 rounded-md bg-neutral-800 border border-neutral-600 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 font-medium">Date souhaitée</label>
                  <input
                    type="date"
                    name="date"
                    value={detailsPro.date}
                    onChange={(e) => setDetailsPro({ ...detailsPro, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-md bg-neutral-800 border border-neutral-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 font-medium">Nombre de personnes</label>
                  <input
                    type="number"
                    name="attendees"
                    value={detailsPro.attendees}
                    onChange={(e) => setDetailsPro({ ...detailsPro, attendees: e.target.value })}
                    placeholder="ex., 50"
                    className="w-full px-4 py-3 rounded-md bg-neutral-800 border border-neutral-600 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  />
                </div>
              </div>
            )}

            <motion.div variants={fadeIn} custom={8}>
              <label htmlFor="message" className="block text-sm mb-1 font-medium">Message</label>
              <textarea
                name="message"
                id="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Votre message ici..."
                className="w-full px-4 py-3 rounded-md bg-neutral-800 border border-neutral-600 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-pizza transition resize-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              variants={fadeIn}
              custom={9}
              className="w-full flex items-center justify-center gap-2 bg-primary-pizza hover:bg-orange-500 text-white font-semibold py-3 rounded-md transition duration-200 disabled:opacity-50 shadow-md"
            >
              {loading ? 'Envoi en cours...' : 'Envoyer'}
              <img src="/arrow_up.png" alt="Envoyer" className="w-4 h-4" />
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
