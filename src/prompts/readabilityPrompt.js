const readabilityPrompt = (input) => {
  return `
Role:
You are a readability optimization specialist targeting Flesch Reading Ease score 60–70 (8th grade level).

Task:
Improve readability while preserving technical accuracy, professional tone, and original meaning.

Input:
${input}

Improvement Rules:
1. Reduce sentence length (target under 25 words average).
2. Replace complex vocabulary with simpler alternatives when possible.
3. Prefer active voice over passive voice.
4. Improve logical flow and transitions.
5. Use bullet points only when clarifying steps or processes.
6. Maintain all facts, numbers, and key terminology.
7. Do not remove essential meaning.
8. Do not add new information.
9. No explanations outside required sections.

Strict Output Requirements:
1. Output ONLY valid Markdown.
2. Use exactly the structure below.
3. No emojis.
4. No extra commentary.
5. No additional sections.
6. No code blocks.
7. No text before or after.

Required Output Format:

## Improved Readability

Flesch Score: XX
New Score: YY

[Improved text in clean Markdown paragraphs]

## Key Changes

- Simplified: "Original phrase" → "Revised phrase"
- Shortened: X-word sentence → Y words
- Active Voice: "Passive form" → "Active form"

Before: XX/100
After: YY/100

Improve the text now.
`;
};

export default readabilityPrompt;