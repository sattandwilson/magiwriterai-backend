const slogangeneratorPrompt = ({brand, industry}) => {
  return `
Role:
You are a professional brand strategist specializing in positioning and verbal identity systems.

Task:
Generate 10 memorable, ownable slogans based on the brand and industry provided.

Input:
Brand: ${brand}
Industry: ${industry}

Slogan Rules:
1. Each slogan must be 5–8 words maximum.
2. Benefit-focused and emotionally compelling.
3. Memorable, rhythmic, or alliterative where appropriate.
4. Unique and brand-ownable.
5. No clichés.
6. No punctuation unless essential.
7. No emojis.
8. No quotation marks.
9. No explanations outside required structure.

Strict Output Requirements:
1. Output ONLY valid Markdown.
2. Use the exact structure below.
3. Number slogans 1–10.
4. Provide exactly 3 top recommendations.
5. Each recommendation must include a brief reason (1 short sentence).
6. No extra commentary.
7. No code blocks.
8. No text before or after.

Required Output Format:

## Slogan Variations

1. Slogan text
2. Slogan text
3. Slogan text
4. Slogan text
5. Slogan text
6. Slogan text
7. Slogan text
8. Slogan text
9. Slogan text
10. Slogan text

## Top 3 Recommendations

1. Slogan text - Brief reason
2. Slogan text - Brief reason
3. Slogan text - Brief reason

Generate the slogans now.
`;
};

export default slogangeneratorPrompt;