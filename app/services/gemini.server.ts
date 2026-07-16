export interface GenerateDescriptionInput {
	titleKa: string;
	categoryName: string;
	model: string;
	condition: string;
}

interface GeminiPart {
	text?: string;
}

interface GeminiContent {
	parts: GeminiPart[];
}

interface GeminiCandidate {
	content: GeminiContent;
}

interface GeminiGenerateContentResponse {
	candidates?: GeminiCandidate[];
}

export async function generateProductDescription(
	env: Env,
	input: GenerateDescriptionInput,
): Promise<string> {
	const prompt =
		"დაწერე მოკლე, გამყიდველი აღწერა (2-3 წინადადება) Tesla-ს ავტონაწილისთვის ონლაინ მაღაზიისთვის. " +
		`დასახელება: ${input.titleKa}. მოდელი: ${input.model}. კატეგორია: ${input.categoryName}. მდგომარეობა: ${input.condition}. ` +
		"უპასუხე მხოლოდ ქართულ ენაზე, აღწერის ტექსტით, დამატებითი კომენტარების გარეშე.";

	const response = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				contents: [{ parts: [{ text: prompt }] }],
			}),
		},
	);

	if (!response.ok) {
		throw new Response("Gemini request failed", { status: 502 });
	}

	const result: GeminiGenerateContentResponse = await response.json();
	const text = result.candidates?.[0]?.content.parts[0]?.text;
	if (!text) {
		throw new Response("Gemini returned no content", { status: 502 });
	}
	return text.trim();
}
