import { Header } from '@/components/Header';
import { CartContextProvider } from '@/contexts/CartContext';
import { ReactNode } from 'react';

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <CartContextProvider>
      <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-app gap-5 p-8">
        <Header />
        {/* Mesmo usando context (client), ao passar o children, os componentes voltam a ser server components */}
        {children}
      </div>
    </CartContextProvider>
  );
}
