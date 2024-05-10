import { Inter } from "next/font/google";
import Index from "@/app/index";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Esthetic App",
  description: "Generated by AbaSayo Company",
};

export default function PanelLayout({ children }) {
    return (
      <html lang="es">
        <body>
          {children} 
        </body>
      </html>
    )
}