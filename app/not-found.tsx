import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-brand/15 blur-[120px]" />
          <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-brand-accent/15 blur-[120px]" />
        </div>
        <div className="container-max px-6 text-center">
          <h1 className="text-8xl font-bold text-gradient sm:text-9xl">404</h1>
          <h2 className="mt-4 text-2xl font-bold">Page not found</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild size="lg" className="mt-8 bg-brand-gradient text-white shadow-lg shadow-primary/25">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
