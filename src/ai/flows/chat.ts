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
import { googleAI } from '@genkit-ai/google-genai';


// Define the schema for a single chat message part (Genkit can have multiple parts, like text and images)
const ChatMessageContentSchema = z.object({
  text: z.string(),
});
export type ChatMessageContent = z.infer<typeof ChatMessageContentSchema>;

// Define the schema for a single chat message
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.array(ChatMessageContentSchema),
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
    response: z.string().describe('The AI model\'s response text.'),
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

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable not set. Please check your .env file.");
    }
    
    // Convert the incoming history to the format Genkit's model expects
    const genkitMessages: MessageData[] = history ? history.map(msg => ({
        role: msg.role,
        content: msg.content.map(c => ({ text: c.text })),
    })) : [];
    
    const response = await ai.generate({
      history: genkitMessages,
      prompt: prompt,
    });

    const responseText = response.text;
    if (!responseText) {
        throw new Error("The model did not return a text response.");
    }

    return {
        response: responseText,
    };
  }
);
