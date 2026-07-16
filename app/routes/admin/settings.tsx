import { Form } from "react-router";
import type { Route } from "./+types/settings";
import { Button } from "~/design-system/Button";
import { Field, inputClass } from "~/design-system/Field";
import { requireAdmin } from "~/services/auth.server";
import { getDb } from "~/services/db";
import { getSettings, saveSettings } from "~/services/settings.server";

export function meta(_: Route.MetaArgs) {
	return [{ title: "პარამეტრები — TeslaMarket ადმინი" }];
}

export async function loader({ request, context }: Route.LoaderArgs) {
	await requireAdmin(request, context.cloudflare.env);
	const db = getDb(context.cloudflare.env);
	const siteSettings = await getSettings(db);
	return { siteSettings };
}

export async function action({ request, context }: Route.ActionArgs) {
	await requireAdmin(request, context.cloudflare.env);
	const formData = await request.formData();
	const phone = String(formData.get("phone") ?? "").trim();
	const address = String(formData.get("address") ?? "").trim();
	const hours = String(formData.get("hours") ?? "").trim();
	const contactName = String(formData.get("contactName") ?? "").trim();

	const errors: { phone?: string; address?: string } = {};
	if (!phone || !/^\+?[\d\s]{9,}$/.test(phone)) {
		errors.phone = "ტელეფონის ნომერი არასწორია";
	}
	if (!address) {
		errors.address = "მისამართი ცარიელია";
	}
	if (errors.phone || errors.address) {
		return { errors, saved: false };
	}

	const db = getDb(context.cloudflare.env);
	await saveSettings(db, { phone, address, hours, contactName });
	return { errors: null, saved: true };
}

export default function AdminSettings({ loaderData, actionData }: Route.ComponentProps) {
	const { siteSettings } = loaderData;
	return (
		<div className="max-w-lg">
			<h1 className="text-2xl font-bold text-ink">პარამეტრები</h1>
			<p className="mt-2 text-sm text-ink-muted">
				ეს მონაცემები ჩანს საიტზე — ქვედა ზოლში, კონტაქტისა და პროდუქტის გვერდებზე.
			</p>
			<Form method="post" className="mt-6 flex flex-col gap-4">
				<Field label="ტელეფონი" htmlFor="phone" error={actionData?.errors?.phone}>
					<input
						id="phone"
						name="phone"
						type="tel"
						required
						defaultValue={siteSettings.phone}
						className={inputClass}
					/>
				</Field>
				<Field label="მისამართი" htmlFor="address" error={actionData?.errors?.address}>
					<input
						id="address"
						name="address"
						required
						defaultValue={siteSettings.address}
						className={inputClass}
					/>
				</Field>
				<Field label="სამუშაო საათები" htmlFor="hours">
					<input
						id="hours"
						name="hours"
						defaultValue={siteSettings.hours}
						className={inputClass}
					/>
				</Field>
				<Field label="საკონტაქტო პირი" htmlFor="contactName">
					<input
						id="contactName"
						name="contactName"
						defaultValue={siteSettings.contactName}
						className={inputClass}
					/>
				</Field>
				{actionData?.saved && (
					<p role="status" className="text-sm font-medium text-ink">
						შენახულია
					</p>
				)}
				<Button type="submit">შენახვა</Button>
			</Form>
		</div>
	);
}
