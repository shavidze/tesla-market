import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "cta";

export function buttonClass(variant: ButtonVariant = "primary", className = ""): string {
	const base =
		"inline-flex min-h-11 items-center justify-center rounded-card px-5 text-base font-medium transition-colors";
	const variants: Record<ButtonVariant, string> = {
		primary: "bg-ink text-white hover:bg-ink/90",
		secondary: "border border-line bg-white text-ink hover:bg-bg",
		cta: "bg-accent text-white hover:bg-accent/90",
	};
	return `${base} ${variants[variant]} ${className}`.trim();
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	children: ReactNode;
}

export function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
	return (
		<button className={buttonClass(variant, className)} {...rest}>
			{children}
		</button>
	);
}
