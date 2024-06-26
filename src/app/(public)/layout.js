import { Inter } from "next/font/google";
import "../globals.css";
import "../../styles/index.scss"
import MenuWeb from "@/components/MenuWeb";
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Esthetic App",
  description: "Generated by AbaSayo Company",
};

export default function RootLayout({children}) {
  
  return (
      <html lang="es">
        <body className={inter.className}>
            <MenuWeb />
            {children}
        </body>
      </html>
  );
}
