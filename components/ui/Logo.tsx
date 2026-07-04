import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  showWordmark?: boolean;
  size?: number;
  className?: string;
  href?: string;
};

export default function Logo({
  showWordmark = true,
  size = 32,
  className = "",
  href = "/",
}: LogoProps) {
  const content = (
    <>
      <Image
        src="/logo.png"
        alt="Tanjil Ahmed"
        width={size}
        height={size}
        className="rounded-lg transition-transform duration-300 group-hover:scale-105"
        priority={size >= 32}
      />
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight">
          tanjil<span className="text-accent">.</span>ahmed
        </span>
      )}
    </>
  );

  const classes = `group flex items-center gap-2.5 ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
