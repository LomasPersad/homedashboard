'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating monthly highlight albums from baby photos.
 *
 * The flow uses AI to select the best photos based on content and creates a highlight album.
 *
 * @interface GenerateMonthlyHighlightsInput - Defines the input for the generateMonthlyHighlights function.
 * @interface GenerateMonthlyHighlightsOutput - Defines the output for the generateMonthlyHighlights function.
 * @function generateMonthlyHighlights - The main function that triggers the highlight album generation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMonthlyHighlightsInputSchema = z.object({
  photoDataUris: z
    .array(z.string())
    .describe(
      'An array of baby photos as data URIs that must include a MIME type and use Base64 encoding. Expected format: [\'data:<mimetype>;base64,<encoded_data>\', ...]' // Corrected the expected format
    ),
  month: z.string().describe('The month for which to generate the highlights (e.g., \'January 2024\').'),
});
export type GenerateMonthlyHighlightsInput = z.infer<
  typeof GenerateMonthlyHighlightsInputSchema
>;

const GenerateMonthlyHighlightsOutputSchema = z.object({
  highlightedPhotoDataUris: z
    .array(z.string())
    .describe(
      'An array of selected baby photos as data URIs, chosen by AI for being the most memorable from the specified month.'
    ),
  reasoning: z
    .string()
    .describe('The AI reasoning behind selecting the highlighted photos.'),
});
export type GenerateMonthlyHighlightsOutput = z.infer<
  typeof GenerateMonthlyHighlightsOutputSchema
>;

export async function generateMonthlyHighlights(
  input: GenerateMonthlyHighlightsInput
): Promise<GenerateMonthlyHighlightsOutput> {
  return generateMonthlyHighlightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMonthlyHighlightsPrompt',
  input: {schema: GenerateMonthlyHighlightsInputSchema},
  output: {schema: GenerateMonthlyHighlightsOutputSchema},
  prompt: `You are an AI assistant specialized in creating monthly highlight albums from baby photos.

  Given a list of baby photos for the month {{{month}}}, select the best photos that capture memorable moments.
  Explain your reasoning for selecting these photos.

  Photos:
  {{#each photoDataUris}}
  - {{media url=this}}
  {{/each}}

  Return only the data URIs of the selected photos in the highlightedPhotoDataUris array.
  `,
});

const generateMonthlyHighlightsFlow = ai.defineFlow(
  {
    name: 'generateMonthlyHighlightsFlow',
    inputSchema: GenerateMonthlyHighlightsInputSchema,
    outputSchema: GenerateMonthlyHighlightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
