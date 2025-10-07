'use server';

/**
 * @fileOverview A general-purpose chat flow that maintains conversation history.
 *
 * - `chat` - A function that takes a prompt and history and returns the AI's response.
 * - `ChatInput` - The input type for the chat function.
 * - `ChatOutput` - The return type for the chat function.
 * - `ChatMessage` - A single message in the chat history.
 * - `ChatHistory` - An array of chat messages.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { MessageData } from 'genkit/ai';

// Define the schema for a single chat message
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.array(z.object({ text: z.string() })),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// Define the schema for chat history
const ChatHistorySchema = z.array(ChatMessageSchema);
export type ChatHistory = z.infer<typeof ChatHistorySchema>;


// Define the input schema for the chat flow
const ChatInputSchema = z.object({
  prompt: z.string().describe('The user\'s latest message.'),
  history: ChatHistorySchema.optional().describe('The conversation history.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;


// Define the output schema for the chat flow
const ChatOutputSchema = z.object({
    history: ChatHistorySchema.describe('The full conversation history including the new response.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;


export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}


const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ prompt, history }) => {

    const model = ai.model('googleai/gemini-2.5-flash');

    const chatHistory = history ? (history as MessageData[]) : [];
    
    const response = await model.generate({
      history: chatHistory,
      prompt: prompt,
    });

    const userMessage: ChatMessage = { role: 'user', content: [{ text: prompt }] };
    const modelMessage: ChatMessage = { role: 'model', content: response.candidates[0].message.content };
    
    const updatedHistory = [...chatHistory, userMessage, modelMessage];

    return {
        history: updatedHistory,
    };
  }
);
