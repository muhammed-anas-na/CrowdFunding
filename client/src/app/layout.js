import { Inter } from "next/font/google";
import "./globals.css";
import { CorwdFundingProvider } from "@/context/crowdFundingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fund IT - Decentralized funding platform",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CorwdFundingProvider>
          <div className="wrapper">{children}</div>
        </CorwdFundingProvider>
      </body>
    </html>
  );
}
