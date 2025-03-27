import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';

import useAlert from '../hooks/useAlert.tsx';
import Alert from '../components/Alert.tsx';

const Contact = () => {
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  // Sécurisation des clés API
  const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
  
  if (!serviceId || !templateId || !publicKey) {
    console.error("Les clés API EmailJS ne sont pas définies !");
  }

  // Validation email
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification des champs requis
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showAlert({ show: true, text: "Tous les champs sont requis.", type: "danger" });
      return;
    }

    // Validation email
    if (!validateEmail(form.email)) {
      showAlert({ show: true, text: "Adresse email invalide.", type: "danger" });
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
          message: form.message,
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
    <section className="c-space my-20" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="relative min-h-screen flex items-center justify-center flex-col">

        <div className="contact-container">
          <br />
          <h3 className="head-text">Prenons contact !</h3>
          <p className="text-lg text-white-600 mt-3">
          Pour toute demande particulière, qu'il s'agisse d'une commande sur-mesure, d'une collaboration ou de toute autre requête...
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
            <label className="space-y-3">
              <span className="field-label">Nom complet</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., John Doe"
                aria-label="Nom complet"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Adresse Mail</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., johndoe@gmail.com"
                aria-label="Adresse email"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Votre message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Partagez vos pensées et demandes..."
                aria-label="Message"
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading || !form.name || !form.email || !form.message}>
              {loading ? 'Envoi en cours...' : 'Envoyer le message'}
              <img src="/arrow_up.png" alt="arrow_up" className="field-btn_arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
