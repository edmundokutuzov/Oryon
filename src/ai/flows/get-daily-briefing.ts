
'use server';
/**
 * @fileOverview A flow to generate a predictive and personalized daily briefing for a user.
 *
 * - getDailyBriefing - A function that analyzes user's tasks and meetings and provides a summary.
 * - DailyBriefingInput - The input type for the getDailyBriefing function.
 * - DailyBriefingOutput - The return type for the getDailyBriefing function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { tasks as allTasks, meetings as allMeetings } from '@/lib/data';

const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  priority: z.string(),
  dueDate: z.string(),
});

const MeetingSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  time: z.string(),
  duration: z.number(),
});

const DailyBriefingInputSchema = z.object({
  userName: z.string().describe('The name of the user.'),
  tasks: z.array(TaskSchema).describe('A list of the user\'s tasks.'),
  meetings: z.array(MeetingSchema).describe('A list of the user\'s meetings for today.'),
});
export type DailyBriefingInput = z.infer<typeof DailyBriefingInputSchema>;

const DailyBriefingOutputSchema = z.object({
  briefing: z.string().describe('A personalized and proactive daily briefing for the user, written in a helpful and slightly informal tone. It should highlight priorities, potential connections between tasks and meetings, and offer suggestions. The response MUST be in Portuguese.'),
});
export type DailyBriefingOutput = z.infer<typeof DailyBriefingOutputSchema>;

export async function getDailyBriefing(input: DailyBriefingInput): Promise<DailyBriefingOutput> {
  return getDailyBriefingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyBriefingPrompt',
  input: { schema: DailyBriefingInputSchema },
  output: { schema: DailyBriefingOutputSchema },
  prompt: `Você é OryonAI, um assistente de IA especialista da plataforma Oryon, agindo como um assistente pessoal ultra-eficiente.

O seu objetivo é analisar as tarefas e reuniões de hoje para o utilizador, {{userName}}, e fornecer um resumo proativo, inteligente e personalizado para o início do dia.

Regras do Resumo:
- O tom deve ser profissional, mas amigável e encorajador. Trate o utilizador pelo nome.
- Seja conciso e direto ao ponto. Use parágrafos curtos ou listas de itens.
- EVITE o uso excessivo de markdown. Não use '*' para ênfase.
- NÃO liste todas as tarefas e reuniões. Em vez disso, sintetize e extraia os pontos mais importantes.
- Identifique as prioridades do dia (tarefas com prioridade 'high' ou com prazo a expirar).
- Encontre sinergias. Por exemplo, se uma tarefa está relacionada com uma reunião, mencione isso. (Ex: "Vejo que tem a tarefa 'X', que é perfeita para preparar a sua reunião 'Y' à tarde.")
- Termine com uma nota positiva e motivacional.
- A resposta deve ser SEMPRE em Português.

Contexto do Utilizador para Hoje:

Tarefas Pendentes:
{{#each tasks}}
- Título: {{title}} (Prioridade: {{priority}}, Prazo: {{dueDate}})
{{/each}}

Reuniões Agendadas para Hoje:
{{#each meetings}}
- Título: {{title}} (Hora: {{time}}, Duração: {{duration}} min)
{{/each}}

Agora, com base nesta informação, gere o resumo diário para {{userName}}.`,
});

const getDailyBriefingFlow = ai.defineFlow(
  {
    name: 'getDailyBriefingFlow',
    inputSchema: DailyBriefingInputSchema,
    outputSchema: DailyBriefingOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
