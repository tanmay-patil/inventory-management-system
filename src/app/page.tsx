import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background text-foreground">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col gap-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary">
          MRI/CT Spare Parts MVP
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl text-center">
          Hello World! The foundation is set up successfully. We are ready to build the inventory
          management system.
        </p>
        <div className="flex gap-4">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            View Dashboard
          </Button>
        </div>
      </div>
    </main>
  );
}
