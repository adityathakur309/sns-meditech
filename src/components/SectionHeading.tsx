import { cx } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cx(
            "mb-3 text-xs font-semibold uppercase tracking-[0.22em]",
            light ? "text-brand" : "text-brand-dark",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cx(
          "font-serif text-3xl leading-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cx(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-white/72" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
