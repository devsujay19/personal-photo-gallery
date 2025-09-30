// Implemented AI to suggest groupings of media items for narrative presentation.
'use server';
/**
 * @fileOverview Provides an AI tool to suggest groupings of media items for narrative or thematic presentation within a gallery.
 *
 * - suggestMediaGroups - A function that suggests groupings of media items.
 * - SuggestMediaGroupsInput - The input type for the suggestMediaGroups function.
 * - SuggestMediaGroupsOutput - The output type for the suggestMediaGroups function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMediaGroupsInputSchema = z.object({
  mediaItemDescriptions: z
    .array(z.string())
    .describe("A list of descriptions for each media item in the gallery.  These descriptions should capture the essence of the media item so the AI can group effectively."),
  groupingPreference: z
    .string()
    .optional()
    .describe("Optional preference for grouping, e.g., 'chronological', 'thematic', 'emotional'.  Leave blank for the AI to decide."),
});
export type SuggestMediaGroupsInput = z.infer<typeof SuggestMediaGroupsInputSchema>;

const SuggestMediaGroupsOutputSchema = z.object({
  suggestedGroups: z
    .array(z.array(z.number()))
    .describe("An array of suggested groups, where each group is an array of indices corresponding to the input media items.  The indices start at 0."),
  reasoning: z
    .string()
    .describe("The AI's reasoning for the suggested groupings."),
});
export type SuggestMediaGroupsOutput = z.infer<typeof SuggestMediaGroupsOutputSchema>;


export async function suggestMediaGroups(input: SuggestMediaGroupsInput): Promise<SuggestMediaGroupsOutput> {
  return suggestMediaGroupsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMediaGroupsPrompt',
  input: {
    schema: SuggestMediaGroupsInputSchema,
  },
  output: {schema: SuggestMediaGroupsOutputSchema},
  prompt: `You are an AI assistant designed to help users organize their media gallery by suggesting meaningful groupings of media items.

You are provided with a list of descriptions for each media item in the gallery.  Your goal is to analyze these descriptions and suggest groupings that create a coherent narrative or theme.

Here are the media item descriptions:
{{#each mediaItemDescriptions}}
- Index {{@index}}: {{this}}
{{/each}}

{{#if groupingPreference}}
The user has specified a grouping preference: {{groupingPreference}}.
Please take this into account when suggesting groupings.
{{/if}}

Consider factors such as chronological order, common themes, emotional connections, and visual similarities.

Output your suggested groupings as an array of arrays, where each inner array contains the indices of the media items that belong to that group. The index refers to the order of the media items provided in the input array 'mediaItemDescriptions'. Also include your reasoning for the suggested groupings.

For example, if you want to group media items at indices 0, 2, and 5 together, and media items at indices 1, 3, and 4 together, your output should look like this:
{
  "suggestedGroups": [
    [0, 2, 5],
    [1, 3, 4]
  ],
  "reasoning": "The media items in the first group share a common theme of ..., while the media items in the second group ..."
}

Please provide your suggested groupings and reasoning now:
`,
});

const suggestMediaGroupsFlow = ai.defineFlow(
  {
    name: 'suggestMediaGroupsFlow',
    inputSchema: SuggestMediaGroupsInputSchema,
    outputSchema: SuggestMediaGroupsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
