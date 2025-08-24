import "./globals.css";

export const metadata = {
  title: "LeadBridge – Turn Google clicks into booked conversations",
  description: "Bring back instant customer messaging with an AI receptionist that texts, answers, and books 24/7.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "LeadBridge",
    description: "Turn Google clicks into booked conversations.",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
