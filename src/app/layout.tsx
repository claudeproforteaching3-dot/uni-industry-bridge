import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/AppShell';
import { AuthProvider } from '@/lib/auth-context';

export const metadata: Metadata = {
  title: 'RUPP University | University-Industry Linkage & Outcomes Portal',
  description:
    'Transparent higher education platform showcasing Program Structure, PLO/CLO mappings, Credits, Public Trust accreditations, Student Projects by year, Talent directory, and Industry Recruitment dashboard.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="h-full antialiased font-sans">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
