import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/index.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from "./index";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Esthetic App",
  description: "Generated by AbaSayo Company",
};

export default function RootLayout({children}) {
  
  return (
      <html>
        <body className={inter.className}>
          <Index >
            {children}
          </Index>  
        </body>
      </html>
    
  );
}
