import { useEffect, useState } from "react";
import { Form } from "react-router";
import type { Category, Condition, ProductPhoto, ProductStatus, TeslaModel } from "../../../db/schema";
import { Button, buttonClass } from "~/design-system/Button";
import { Field, inputClass, textareaClass } from "~/design-system/Field";
import {
	CONDITION_LABELS,
	MODEL_LABELS,
	STATUS_LABELS,
	isCondition,
	isProductStatus,
	isTeslaModel,
	slugify,
} from "~/services/format";

export interface ProductFormValues {
	slug: string;
	titleKa: string;
	descriptionKa: string;
	categoryId: string;
	teslaModel: string;
	yearFrom: string;
	yearTo: string;
	condition: string;
	price: string;
	quantity: string;
	oemNumber: string;
	status: string;
}

export interface ParsedProductInput {
	slug: string;
	titleKa: string;
	descriptionKa: string | null;
	categoryId: number;
	teslaModel: TeslaModel;
	yearFrom: number | null;
	yearTo: number | null;
	condition: Condition;
	priceTetri: number;
	quantity: number;
	oemNumber: string | null;
	status: ProductStatus;
}

export function parseProductForm(
	formData: FormData,
	categories: Category[],
):
	| { input: ParsedProductInput; errors: null }
	| { input: null; errors: Record<string, string> } {
	const errors: Record<string, string> = {};

	const slug = String(formData.get("slug") ?? "").trim();
	const titleKa = String(formData.get("titleKa") ?? "").trim();
	const descriptionRaw = String(formData.get("descriptionKa") ?? "").trim();
	const categoryIdRaw = String(formData.get("categoryId") ?? "");
	const teslaModelRaw = String(formData.get("teslaModel") ?? "");
	const yearFromRaw = String(formData.get("yearFrom") ?? "").trim();
	const yearToRaw = String(formData.get("yearTo") ?? "").trim();
	const conditionRaw = String(formData.get("condition") ?? "");
	const priceRaw = String(formData.get("price") ?? "").trim();
	const quantityRaw = String(formData.get("quantity") ?? "").trim();
	const oemNumberRaw = String(formData.get("oemNumber") ?? "").trim();
	const statusRaw = String(formData.get("status") ?? "active");

	if (!slug) errors.slug = "სლაგი სავალდებულოა";
	if (!titleKa) errors.titleKa = "სათაური სავალდებულოა";

	const categoryId = Number(categoryIdRaw);
	const categoryExists = categories.some((category) => category.id === categoryId);
	if (!categoryIdRaw || !Number.isInteger(categoryId) || !categoryExists) {
		errors.categoryId = "აირჩიეთ კატეგორია";
	}

	if (!isTeslaModel(teslaModelRaw)) {
		errors.teslaModel = "აირჩიეთ მოდელი";
	}

	if (!isCondition(conditionRaw)) {
		errors.condition = "აირჩიეთ მდგომარეობა";
	}

	const price = Number.parseFloat(priceRaw);
	if (!priceRaw || !Number.isFinite(price) || price <= 0) {
		errors.price = "ფასი სავალდებულოა";
	}

	const quantity = Number.parseInt(quantityRaw, 10);
	if (!quantityRaw || !Number.isInteger(quantity) || quantity < 0) {
		errors.quantity = "რაოდენობა არასწორია";
	}

	const yearFrom = yearFromRaw ? Number.parseInt(yearFromRaw, 10) : null;
	const yearTo = yearToRaw ? Number.parseInt(yearToRaw, 10) : null;
	if (yearFromRaw && !Number.isInteger(yearFrom)) errors.yearFrom = "წელი არასწორია";
	if (yearToRaw && !Number.isInteger(yearTo)) errors.yearTo = "წელი არასწორია";
	if (
		yearFrom !== null &&
		yearTo !== null &&
		Number.isInteger(yearFrom) &&
		Number.isInteger(yearTo) &&
		yearFrom > yearTo
	) {
		errors.yearTo = "წლების დიაპაზონი არასწორია";
	}

	if (!isProductStatus(statusRaw)) {
		errors.status = "სტატუსი არასწორია";
	}

	if (
		Object.keys(errors).length > 0 ||
		!isTeslaModel(teslaModelRaw) ||
		!isCondition(conditionRaw) ||
		!isProductStatus(statusRaw)
	) {
		return { input: null, errors };
	}

	return {
		input: {
			slug,
			titleKa,
			descriptionKa: descriptionRaw || null,
			categoryId,
			teslaModel: teslaModelRaw,
			yearFrom,
			yearTo,
			condition: conditionRaw,
			priceTetri: Math.round(price * 100),
			quantity,
			oemNumber: oemNumberRaw || null,
			status: statusRaw,
		},
		errors: null,
	};
}

interface ProductFormProps {
	categories: Category[];
	mode: "create" | "edit";
	defaultValues: ProductFormValues;
	errors?: Record<string, string>;
	photos?: ProductPhoto[];
	generatedDescription?: string;
	photoError?: string;
	generateError?: string;
}

export function ProductForm({
	categories,
	mode,
	defaultValues,
	errors,
	photos,
	generatedDescription,
	photoError,
	generateError,
}: ProductFormProps) {
	const [slugTouched, setSlugTouched] = useState(mode === "edit");
	const [slug, setSlug] = useState(defaultValues.slug);
	const [description, setDescription] = useState(defaultValues.descriptionKa);

	useEffect(() => {
		if (generatedDescription) {
			setDescription(generatedDescription);
		}
	}, [generatedDescription]);

	return (
		<div className="flex flex-col gap-10">
			<Form method="post" className="flex flex-col gap-4">
				<input type="hidden" name="intent" value="save" />
				<Field label="სათაური" htmlFor="titleKa" error={errors?.titleKa}>
					<input
						id="titleKa"
						name="titleKa"
						defaultValue={defaultValues.titleKa}
						className={inputClass}
						onChange={(event) => {
							if (!slugTouched) setSlug(slugify(event.target.value));
						}}
					/>
				</Field>
				<Field label="სლაგი" htmlFor="slug" error={errors?.slug}>
					<input
						id="slug"
						name="slug"
						value={slug}
						onChange={(event) => {
							setSlugTouched(true);
							setSlug(event.target.value);
						}}
						className={inputClass}
					/>
				</Field>
				<Field label="კატეგორია" htmlFor="categoryId" error={errors?.categoryId}>
					<select
						id="categoryId"
						name="categoryId"
						defaultValue={defaultValues.categoryId}
						className={inputClass}
					>
						<option value="">აირჩიეთ</option>
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.nameKa}
							</option>
						))}
					</select>
				</Field>
				<Field label="Tesla მოდელი" htmlFor="teslaModel" error={errors?.teslaModel}>
					<select
						id="teslaModel"
						name="teslaModel"
						defaultValue={defaultValues.teslaModel}
						className={inputClass}
					>
						<option value="">აირჩიეთ</option>
						{Object.entries(MODEL_LABELS).map(([value, label]) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
				</Field>
				<div className="grid grid-cols-2 gap-4">
					<Field label="წელი (დან)" htmlFor="yearFrom" error={errors?.yearFrom}>
						<input
							id="yearFrom"
							name="yearFrom"
							type="number"
							defaultValue={defaultValues.yearFrom}
							className={inputClass}
						/>
					</Field>
					<Field label="წელი (მდე)" htmlFor="yearTo" error={errors?.yearTo}>
						<input
							id="yearTo"
							name="yearTo"
							type="number"
							defaultValue={defaultValues.yearTo}
							className={inputClass}
						/>
					</Field>
				</div>
				<Field label="მდგომარეობა" htmlFor="condition" error={errors?.condition}>
					<select
						id="condition"
						name="condition"
						defaultValue={defaultValues.condition}
						className={inputClass}
					>
						<option value="">აირჩიეთ</option>
						{Object.entries(CONDITION_LABELS).map(([value, label]) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
				</Field>
				<div className="grid grid-cols-2 gap-4">
					<Field label="ფასი (₾)" htmlFor="price" error={errors?.price}>
						<input
							id="price"
							name="price"
							type="number"
							step="0.01"
							defaultValue={defaultValues.price}
							className={inputClass}
						/>
					</Field>
					<Field label="რაოდენობა" htmlFor="quantity" error={errors?.quantity}>
						<input
							id="quantity"
							name="quantity"
							type="number"
							defaultValue={defaultValues.quantity}
							className={inputClass}
						/>
					</Field>
				</div>
				<Field label="OEM ნომერი" htmlFor="oemNumber">
					<input
						id="oemNumber"
						name="oemNumber"
						defaultValue={defaultValues.oemNumber}
						className={inputClass}
					/>
				</Field>
				<Field label="სტატუსი" htmlFor="status" error={errors?.status}>
					<select
						id="status"
						name="status"
						defaultValue={defaultValues.status}
						className={inputClass}
					>
						{Object.entries(STATUS_LABELS).map(([value, label]) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
				</Field>
				<Field label="აღწერა" htmlFor="descriptionKa">
					<textarea
						id="descriptionKa"
						name="descriptionKa"
						value={description}
						onChange={(event) => setDescription(event.target.value)}
						rows={5}
						className={textareaClass}
					/>
				</Field>
				<Button type="submit">შენახვა</Button>
			</Form>

			{mode === "edit" && (
				<div className="flex flex-col gap-8 border-t border-line pt-8">
					<div>
						<h2 className="text-lg font-bold text-ink">აღწერის გენერაცია (AI)</h2>
						<Form method="post" className="mt-2">
							<input type="hidden" name="intent" value="generate_desc" />
							<button type="submit" className={buttonClass("secondary")}>
								აღწერის გენერაცია (AI)
							</button>
						</Form>
						{generateError && (
							<p role="alert" className="mt-2 text-sm font-medium text-ink">
								{generateError}
							</p>
						)}
						{generatedDescription && (
							<p className="mt-2 text-sm text-ink-muted">
								გენერირებული აღწერა ჩაისვა ველში ზემოთ — შეინახეთ ფორმის გაგზავნით.
							</p>
						)}
					</div>

					<div>
						<h2 className="text-lg font-bold text-ink">ფოტოები</h2>
						{photos && photos.length > 0 && (
							<div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
								{photos.map((photo) => (
									<div key={photo.id} className="flex flex-col gap-2">
										<div className="aspect-square overflow-hidden rounded-card border border-line bg-white">
											<img
												src={`/photo/${photo.id}`}
												alt=""
												className="h-full w-full object-cover"
											/>
										</div>
										<Form method="post">
											<input type="hidden" name="intent" value="delete_photo" />
											<input type="hidden" name="photoId" value={photo.id} />
											<button
												type="submit"
												className={buttonClass("secondary", "w-full text-sm")}
											>
												წაშლა
											</button>
										</Form>
									</div>
								))}
							</div>
						)}
						<Form
							method="post"
							encType="multipart/form-data"
							className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center"
						>
							<input type="hidden" name="intent" value="upload_photo" />
							<input
								type="file"
								name="photo"
								accept="image/jpeg,image/png,image/webp"
								required
								className={inputClass}
							/>
							<button type="submit" className={buttonClass("secondary")}>
								ატვირთვა
							</button>
						</Form>
						{photoError && (
							<p role="alert" className="mt-2 text-sm font-medium text-ink">
								{photoError}
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
