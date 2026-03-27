export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Navbar placeholder */}
      <div className="fixed top-0 w-full h-[68px] bg-white/5 z-50" />

      {/* Hero banner placeholder */}
      <div className="mx-3 mt-[68px] mb-3 rounded-[28px] h-[calc(100vh-84px)] bg-white/5 animate-pulse" />
    </div>
  );
}
