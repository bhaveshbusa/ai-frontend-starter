import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({ apiKey: process.env.NEW_OPENAI_API_KEY })

export async function POST(req: Request) {
  const { prompt } = await req.json()

  // return Response.json({ message: `Got prompt: ${prompt}` })

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
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