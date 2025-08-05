'use server';
/**
 * @fileOverview A flow for improving the writing of a note.
 *
 * - improveWriting - A function that takes a note's content and suggests improvements.
 * - ImproveWritingInput - The input type for the improveWriting function.
 * - ImproveWritingOutput - The return type for the improveWriting function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

export const ImproveWritingInputSchema = z.object({
  content: z.string().describe('The content of the note to improve.'),
});
export type ImproveWritingInput = z.infer<typeof ImproveWritingInputSchema>;

export const ImproveWritingOutputSchema = z.object({
  improvedContent: z
    .string()
    .describe('The improved version of the note content.'),
});
export type ImproveWritingOutput = z.infer<typeof ImproveWritingOutputSchema>;

export async function improveWriting(
  input: ImproveWritingInput
): Promise<ImproveWritingOutput> {
  return improveWritingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveWritingPrompt',
  input: {schema: ImproveWritingInputSchema},
  output: {schema: ImproveWritingOutputSchema},
  prompt: `You are an expert editor. You will be given the content of a note.
Your task is to fix any spelling or grammar mistakes and improve the overall writing.
Return only the improved text.

Note Content:
{{{content}}}
`,
});

const improveWritingFlow = ai.defineFlow(
  {
    name: 'improveWritingFlow',
    inputSchema: ImproveWritingInputSchema,
    outputSchema: ImproveWritingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
