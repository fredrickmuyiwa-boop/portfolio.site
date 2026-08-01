export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center pt-28">
      <div className="relative">
        <div className="h-16 w-16 animate-spin-slow rounded-full border-2 border-primary/20 border-t-primary" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-gradient">FM</span>
        </div>
      </div>
    </div>
  );
}
