// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import Auth from '@/components/Auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Жалобы',
  description: 'Форма подачи жалоб',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <ToastContainer autoClose={2000} hideProgressBar={true} />

        <Auth>
          {children}
        </Auth>
      </body>
    </html>
  );
}
