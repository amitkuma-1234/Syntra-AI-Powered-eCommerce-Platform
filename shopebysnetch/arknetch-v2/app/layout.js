import './globals.css';
import { StoreProvider } from '@/lib/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import ToastContainer from '@/components/ToastContainer';

export const metadata = {
  title: 'Syntra — Smart Shopping, Smarter Deals',
  description: "India's most innovative AI-powered shopping platform. Discover millions of products with fast delivery, unbeatable prices, and AI-powered shopping.",
  keywords: 'online shopping, electronics, fashion, deals, Syntra',
  openGraph: { title: 'Syntra — Smart Shopping, Smarter Deals', description: "India's most innovative AI-powered shopping platform", type: 'website' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          <main id="app" style={{ minHeight: '60vh' }}>{children}</main>
          <Footer />
          <ChatbotWidget />
          <ToastContainer />
        </StoreProvider>
      </body>
    </html>
  );
}
