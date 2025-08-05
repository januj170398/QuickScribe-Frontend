'use server';
/**
 * @fileOverview A flow for summarizing a note.
 *
 * - summarizeNote - A function that takes a note's content and returns a summary.
 * - SummarizeNoteInput - The input type for the summarizeNote function.
 * - SummarizeNoteOutput - The return type for the summarizeNote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SummarizeNoteInputSchema = z.object({
  content: z.string().describe('The content of the note to summarize.'),
});
export type SummarizeNoteInput = z.infer<typeof SummarizeNoteInputSchema>;

const SummarizeNoteOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the note.'),
});
export type SummarizeNoteOutput = z.infer<typeof SummarizeNoteOutputSchema>;

export async function summarizeNote(
  input: SummarizeNoteInput
): Promise<SummarizeNoteOutput> {
  return summarizeNoteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeNotePrompt',
  input: {schema: SummarizeNoteInputSchema},
  output: {schema: SummarizeNoteOutputSchema},
  prompt: `You are a world-class summarization engine.
You will be given the content of a note and your task is to provide a concise summary of it.

Note Content:
{{{content}}}
`,
});

const summarizeNoteFlow = ai.defineFlow(
  {
    name: 'summarizeNoteFlow',
    inputSchema: SummarizeNoteInputSchema,
    outputSchema: SummarizeNoteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
