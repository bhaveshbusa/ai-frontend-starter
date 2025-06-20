import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    functions: [
      {
        name: 'registerStudent',
        description: 'Registers a student in the system',
        parameters: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            age: { type: 'number' },
            parentEmail: { type: 'string' }
          },
          required: ['name', 'age']
        }
      }
    ],
    function_call: 'auto'
  })

  const fnCall = completion.choices[0]?.message?.function_call
  return NextResponse.json({ component: 'StudentForm', props: JSON.parse(fnCall.arguments || '{}') })
}