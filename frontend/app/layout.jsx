import './globals.css';

export const metadata = {
  title: 'AI Finance Super App',
  description: 'Premium AI Finance Dashboard'
};

export default function RootLayout({
  children
}) {

  return (

    <html lang="en">

      <body>

        {children}

      </body>

    </html>

  );

}