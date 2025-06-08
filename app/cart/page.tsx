'use client';

import { useCartStore } from '../components/cartStore';
import { useRouter } from 'next/navigation';
import Navbar from '../Sections/Navbar';

const CartPage: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const getTotal = useCartStore((state) => state.getTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();

  const handleConfirm = () => {
    alert('Commande confirmée ! 🎉');
    clearCart();
    router.push('/confirmation');
  };

  const total = getTotal();
  const formattedTotal = (total || 0).toLocaleString('fr-FR');

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-28">
        <h1 className="text-4xl font-extrabold text-white mb-10 text-center drop-shadow">
          Résumé de votre commande
        </h1>

        {items.length === 0 ? (
          <p className="text-gray-400 text-center text-lg">Votre panier est vide.</p>
        ) : (
          <div className="space-y-6">
            {items
              .filter((item) => typeof item.price === 'number' && !isNaN(item.price))
              .map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white/5 p-4 rounded-xl text-white"
                >
                  <div>
                    <p className="font-semibold text-lg">{item.name || 'Article inconnu'}</p>
                    <p className="text-sm text-gray-400">{item.quantity}x</p>
                  </div>
                  <p className="text-orange-400 font-bold">
                    {(item.price * item.quantity).toLocaleString('fr-FR')} CFP
                  </p>
                   <button
                    onClick={() => useCartStore.getState().removeFromCart(item.id)}
                    className="text-sm text-red-400 hover:text-red-500 transition"
                  >
                    Retirer
                  </button>
                </div>
              ))}

            <hr className="border-gray-700" />

            <div className="flex justify-between text-white text-xl font-bold">
              <span>Total :</span>
              <span className="text-orange-400">{formattedTotal} CFP</span>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Vos informations de contact
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleConfirm();
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  placeholder="Nom complet"
                  required
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400"
                />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  required
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400"
                />
                <textarea
                  placeholder="Adresse de livraison (facultatif)"
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold transition"
                >
                  Confirmer la commande
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
