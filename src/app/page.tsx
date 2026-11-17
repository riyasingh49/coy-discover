import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#faf7f5] px-6">
      <h1 className="text-5xl font-bold tracking-tight text-gray-900">
        coy<span className="text-rose-500">.</span>
      </h1>

      <p className="mt-3 text-gray-500 text-center">
        Discover meaningful connections.
      </p>

      <Link
        href="/discover"
        className="mt-8 rounded-full bg-rose-500 px-8 py-3 text-white font-semibold hover:bg-rose-600 transition"
      >
        Explore Discover
      </Link>
    </main>
  );
}
