import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
        This route doesn&apos;t resolve.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you&apos;re looking for was moved, renamed, or never deployed.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gradient-to-r from-accent-deep to-glow px-8 py-3.5 text-sm font-semibold text-void transition-transform duration-300 hover:scale-[1.03]"
      >
        Back to Home
      </Link>
    </div>
  );
}
