import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { ThirdwebProvider } from 'thirdweb/react';
import { StateContextProvider } from './context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Crowd Funding',
  description: 'Powered by Web3',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThirdwebProvider>
          <StateContextProvider>
            <div className='relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row'>
              <div className='sm:flex hidden mr-10 relative'>
                <Sidebar />
              </div>

              <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
                <Navbar />
                {children}
              </div>
            </div>
          </StateContextProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
