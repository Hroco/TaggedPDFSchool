import "~/styles/globals.css";

import { type Metadata } from "next";
import { Navbar } from "~/components/Navbar";

export const metadata: Metadata = {
  title: "Tagging PDF School",
  description: "Learn how to tag PDF documents for accessibility.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-900 text-gray-100">
          <Navbar />
          <main>{children}</main>
          <footer className="bg-gray-900 py-8">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2025 Tagged PDF School. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
