export default function App() {
  return (
    <div className="min-h-screen bg-black text-white grid place-items-center p-8">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          <span className="px-2 py-1 bg-white text-black">TC</span>
          <span className="ml-2 text-red-500"> Design</span>
        </h1>
        <p className="mt-4 text-white/70">
          Tailwind is working if this headline is huge and “Design” is red.
        </p>
        <a href="#" className="inline-block mt-6 px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition">
          Button test
        </a>
      </div>
    </div>
  );
}
