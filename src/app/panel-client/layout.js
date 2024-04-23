import Index from '@/app/index';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className={inter.className}>
            <Index >
                {children}
            </Index>
            </body>
        </html>
    )
}