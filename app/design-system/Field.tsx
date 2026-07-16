import { cloneElement } from "react";
import type { AriaAttributes, ReactElement } from "react";

export const inputClass =
	"h-11 w-full rounded-card border border-line bg-white px-3 text-ink focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";
export const textareaClass =
	"w-full rounded-card border border-line bg-white px-3 py-2 text-ink focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

type FieldChildProps = AriaAttributes & { className?: string };

interface FieldProps {
	label: string;
	htmlFor: string;
	children: ReactElement<FieldChildProps>;
	error?: string;
}

export function Field({ label, htmlFor, children, error }: FieldProps) {
	const errorId = `${htmlFor}-error`;
	const existingClassName = children.props.className ?? "";
	const child = cloneElement(children, {
		"aria-invalid": error ? true : undefined,
		"aria-describedby": error ? errorId : undefined,
		className: error ? `${existingClassName} border-ink`.trim() : existingClassName,
	});

	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={htmlFor} className="text-sm font-medium text-ink">
				{label}
			</label>
			{child}
			{error && (
				<p id={errorId} role="alert" className="text-sm font-medium text-ink">
					{error}
				</p>
			)}
		</div>
	);
}
