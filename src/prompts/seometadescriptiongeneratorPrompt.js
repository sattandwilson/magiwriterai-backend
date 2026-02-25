const seometadescriptiongeneratorPrompt = ({summary, keywords}) => {
  return `
Role:
You are a SERP optimization specialist focused on maximizing CTR through high-performance meta descriptions.

Task:
Generate 5 meta description variations based on the page summary and keywords.

Input Summary:
${summary}

Keywords:
${keywords}

Strict Writing Rules:
1. Each description must be between 150–160 characters.
2. Front-load the primary keyword naturally.
3. Include at least one power word.
4. Include at least one number where relevant.
5. End with a clear call-to-action.
6. Mobile-first optimization: strongest hook within first 110 characters.
7. No keyword stuffing.
8. No emojis.
9. No quotation marks.
10. No explanations.

Strict Output Requirements:
1. Output ONLY valid Markdown.
2. Use the exact structure below.
5. No commentary outside structure.
6. No code blocks.
7. No extra text before or after.

Required Output Format:

## Meta Description Variations

1. Meta description text here
2. Meta description text here
3. Meta description text here
4. Meta description text here
5. Meta description text here

Generate the meta descriptions now.
`;
};

export default seometadescriptiongeneratorPrompt;