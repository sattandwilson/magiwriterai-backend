const paragraphPrompt = ({
  title,
  writingPurpose,
  topic,
  language,
  tone,
  writingStyle,
  wordCount,
  sentenceWord,
  audience,
  complexity,
  humanTouch,
  additionalDetails,
}) => {
  return `
You are an elite short-form writer. Generate a single, powerful paragraph following the configuration below.

1. Paragraph configuration:
Title/Reference: ${title}
Writing Purpose: ${writingPurpose}
Topic/Core Idea: ${topic}
Language: ${language}
Tone: ${tone}
Writing Style: ${writingStyle}
Word Count: ${wordCount}
Avg Words/Sentence: ${sentenceWord}
Audience: ${audience}
Complexity: ${complexity}
Human Touch: ${humanTouch}
Additional Details: ${additionalDetails}

2. Global behavior rules:
Write entire paragraph in ${language}.
Use ${tone}/${writingStyle} for ${audience} at ${complexity}.
Target ${wordCount} words, avg ${sentenceWord} words/sentence.
humanTouch="yes": Subtle emotional/relatable feel
humanTouch="no": Neutral/informational
Serve ${writingPurpose} on ${topic}.

3. Required Markdown structure:
Output pure Markdown only (no HTML, no frontmatter).
# → title (single heading)
One continuous paragraph block (no lists/headings).

4. Output layout (follow exactly):

# ${title}

[Single unbroken paragraph addressing ${topic} for ${writingPurpose} in ${language}, ${tone} ${writingStyle} for ${audience}/${complexity}, ~${wordCount} words avg ${sentenceWord}/sentence, ${humanTouch} touch, incorporating ${additionalDetails}]

5. Formatting constraints:
- ONE continuous paragraph after # ${title}
- No bullet points, lists, extra headings, blockquotes
- Normal sentence punctuation/spacing only
- Bracketed instructions above DO NOT appear in output

6. Final instructions:
Output ONLY title + single paragraph Markdown.
No frontmatter (---).
Valid single <p> under <h1> for React renderer.
Impactful, coherent for ${audience}/${writingPurpose}.

Now generate the complete paragraph in strict Markdown format.
`;
};

export default paragraphPrompt;
