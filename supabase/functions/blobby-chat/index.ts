// Supabase Edge Function: blobby-chat
// Serves as the secure Gemini AI backend for the SKILLIO learning companion (Blobby)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface ChatRequestBody {
  message: string;
  profile?: {
    name?: string;
    educationLevel?: string;
    degreeCourse?: string;
    yearOfStudy?: string;
    careerInterests?: string[];
    skills?: string[];
    ambition?: string;
  };
  progress?: {
    xp?: number;
    streak?: number;
    completedMissionsCount?: number;
    completedTasksCount?: number;
    savedCoursesCount?: number;
  };
  history?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  currentSection?: string;
}

serve(async (req: Request) => {
  // 1. Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 2. Validate Gemini API Key from Supabase Secret
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      console.error('[blobby-chat] Missing GEMINI_API_KEY secret in Supabase');
      return new Response(
        JSON.stringify({
          error: 'GEMINI_API_KEY is not configured in Supabase Edge Function secrets.',
          response: "Hi! My AI brain is currently waiting for the GEMINI_API_KEY secret in Supabase. Please add it in your Supabase Dashboard under Settings > Secrets. 💜",
          expression: 'thinking'
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 3. Parse and Validate Request Payload
    const body: ChatRequestBody = await req.json().catch(() => ({ message: '' }));
    const rawMessage = (body.message || '').trim();

    if (!rawMessage) {
      return new Response(
        JSON.stringify({ error: 'Message cannot be empty.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Limit maximum user message length for safety and token protection
    const userMessage = rawMessage.slice(0, 3000);

    // 4. Build Contextual System Prompt
    const studentName = body.profile?.name || 'Learner';
    const education = [
      body.profile?.educationLevel,
      body.profile?.degreeCourse,
      body.profile?.yearOfStudy
    ].filter(Boolean).join(' • ') || 'Not specified';
    const careers = body.profile?.careerInterests?.join(', ') || 'Software Development';
    const skills = body.profile?.skills?.filter(s => s !== 'Beginner / None yet').join(', ') || 'Beginner';
    const ambition = body.profile?.ambition || 'Building solid skills and confidence';

    const xp = body.progress?.xp ?? 120;
    const streak = body.progress?.streak ?? 1;
    const missions = body.progress?.completedMissionsCount ?? 0;
    const tasks = body.progress?.completedTasksCount ?? 0;
    const currentSection = body.currentSection || 'home';

    const systemInstruction = `You are Blobby, the friendly, intelligent, and encouraging personal AI learning companion for SKILLIO.
Your mission is to guide students on their personalized learning journey, answering academic questions, breaking down hard concepts, recommending roadmaps, and keeping them motivated.

CORE PERSONALITY:
- Warm, enthusiastic, approachable, and encouraging (inspired by Duolingo's friendly mascot style, paired with the clarity of a top-tier mentor).
- Concise and focused: keep standard answers to 2-4 clean, easy-to-read sentences or short bullet points. Do NOT write walls of text unless the student explicitly asks for a deep dive or code walkthrough.
- Use natural emojis tastefully (💜, 🚀, 🧠, ✨, 🎯).
- Intelligent and technically accurate across Computer Science (Python, Java, C++, JavaScript, TypeScript, React, SQL), AI/ML, Data Structures & Algorithms, and career guidance.
- If writing code, provide minimal, clean, well-commented snippets.
- Ground your advice in the student's real context below. Never hallucinate facts about them that are not provided. If a profile field is missing, ask naturally.

STUDENT PROFILE CONTEXT:
- Name: ${studentName}
- Education: ${education}
- Target Career Focus: ${careers}
- Current Skills: ${skills}
- North Star Ambition: ${ambition}

CURRENT STUDENT PROGRESS:
- Current XP: ${xp} XP
- Learning Streak: ${streak} day(s)
- Completed Daily Missions: ${missions}
- Completed Roadmap Tasks: ${tasks}
- Current Active Tab in SKILLIO: ${currentSection}

RESPONSE FORMAT:
You MUST respond with a valid JSON object matching this schema:
{
  "response": "Your friendly, clear and helpful markdown answer here",
  "expression": "happy" | "thinking" | "curious" | "excited" | "proud" | "celebrating" | "encouraging",
  "suggestedAction": {
    "label": "Short label for next action, e.g. 'View Python Roadmap' or 'Try Daily Mission'",
    "targetTab": "roadmap" | "skills" | "learning" | "projects" | "careers" | "companies" | null
  }
}
Choose the expression that best matches your message tone.`;

    // 5. Build Multi-Turn Conversation History for Gemini
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(body.history)) {
      // Include last 8 messages for context window efficiency
      const recentHistory = body.history.slice(-8);
      for (const msg of recentHistory) {
        contents.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        });
      }
    }

    // Append the current student prompt
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });

    // 6. Call Google Gemini API (Attempt gemini-2.5-flash with fallback to gemini-1.5-flash)
    const geminiPayload = {
      contents,
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        responseMimeType: 'application/json',
      },
    };

    let geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiPayload),
      }
    );

    // If 2.5-flash isn't available, fallback to 1.5-flash
    if (!geminiRes.ok && geminiRes.status === 404) {
      console.warn('[blobby-chat] gemini-2.5-flash not found, falling back to gemini-1.5-flash');
      geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(geminiPayload),
        }
      );
    }

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('[blobby-chat] Gemini API error:', geminiRes.status, errText);
      return new Response(
        JSON.stringify({
          error: `Gemini API returned error ${geminiRes.status}`,
          details: errText,
          response: "Oops! I ran into a small hiccup connecting to my neural core. Let's try that again in a second! 💜",
          expression: 'thinking',
        }),
        {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const geminiData = await geminiRes.json();
    const candidateText =
      geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // 7. Parse the Structured JSON Output
    let parsedResult = {
      response: candidateText,
      expression: 'happy',
      suggestedAction: null as { label: string; targetTab: string | null } | null,
    };

    try {
      const parsed = JSON.parse(candidateText);
      if (parsed && typeof parsed.response === 'string') {
        parsedResult = {
          response: parsed.response,
          expression: parsed.expression || 'happy',
          suggestedAction: parsed.suggestedAction || null,
        };
      }
    } catch {
      // In case the model wrapped JSON in markdown code fences
      const cleanJson = candidateText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      try {
        const parsed = JSON.parse(cleanJson);
        if (parsed && typeof parsed.response === 'string') {
          parsedResult = {
            response: parsed.response,
            expression: parsed.expression || 'happy',
            suggestedAction: parsed.suggestedAction || null,
          };
        }
      } catch {
        // Fallback to raw text
        parsedResult.response = candidateText;
      }
    }

    // 8. Return Clean Result to Client
    return new Response(JSON.stringify(parsedResult), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[blobby-chat] Unexpected error:', err);
    return new Response(
      JSON.stringify({
        error: err.message || 'Internal server error',
        response: "I couldn't quite process that right now. Could you repeat it? 💜",
        expression: 'curious',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
