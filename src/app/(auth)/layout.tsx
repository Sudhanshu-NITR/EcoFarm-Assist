import Chatbot from "@/components/chatbot/chatbot";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

const geistSans = GeistSans;
const geistMono = GeistMono;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            <Navbar />
            {children}
            <Chatbot />
            <Footer />
        </body>
    </html>
  );
}
