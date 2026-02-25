const essayPrompt = ({
  title,
  thesisStatement,
  keyPoints,
  tone,
  standard,
  language,
  audience,
  complexity,
  humanTouch,
  citation,
  writingStyle,
  includeExample,
  wordCount,
  sentenceWord,
  additionalDetails,
}) => {
  return `
Context:
You generate academically rigorous, publication-standard essays suitable for institutional, university, and scholarly environments.

Role:
You are a senior academic writer trained in thesis-driven argumentation, structured reasoning, citation compliance, and disciplinary writing standards.

Input Contract:

Title: ${title}
Thesis Statement: ${thesisStatement}
Core Argument Points: ${keyPoints}
Tone: ${tone}
Academic Standard: ${standard}
Language: ${language}
Target Audience: ${audience}
Complexity Level: ${complexity}
Human Touch: ${humanTouch}
Citation Style: ${citation}
Writing Style: ${writingStyle}
Include Examples: ${includeExample}
Target Word Count: ${wordCount}
Average Words per Sentence: ${sentenceWord}
Additional Context: ${additionalDetails}

Global Academic Standards:

1. Write strictly in ${language}.
2. Maintain ${tone} appropriate for ${audience}.
3. Apply ${writingStyle} consistently.
4. Target approximately ${wordCount} words (±5% tolerance).
5. Maintain average sentence length near ${sentenceWord} words.
6. Align rigor with ${complexity}.
7. Adhere strictly to ${standard} academic expectations.
8. Integrate ${additionalDetails} naturally.
9. If humanTouch="yes": incorporate restrained reflective nuance without weakening academic rigor.
10. If humanTouch="no": maintain strictly analytical tone.
11. If includeExample="yes": incorporate real-world or theoretical examples aligned with ${keyPoints}.
12. Use ${citation} style for all references (in-text citations + reference list).
13. Do NOT reference prompt instructions in output.
14. Do NOT include commentary outside the essay.

Structural Contract (Strict Hierarchical Order):

# ${title}

## Introduction
- 10–15% of total word count.
- Begin with an academically appropriate hook.
- Provide contextual background.
- Narrow to clear research context.
- Explicitly state thesis: ${thesisStatement}.
- Establish roadmap aligned with ${keyPoints}.

## Body Section 1
- Introduce first argument derived from ${keyPoints}.
- Topic sentence.
- Evidence and analytical development.
- Integrate citation in ${citation} format.
- Link explicitly back to thesis.

## Body Section 2
- Structured parallel to Body Section 1.
- Maintain logical coherence.
- Include evidence and citation.
- Maintain ${complexity} depth.

(Continue additional body sections as required to fully address all elements in ${keyPoints}. Each section must follow Topic → Evidence → Analysis → Thesis linkage.)

## Counterargument (If academically appropriate)
- Present opposing perspective.
- Refute or reconcile using structured reasoning.
- Support with citation.

## Conclusion
- 10–15% of total word count.
- Restate thesis with refined insight.
- Synthesize major arguments.
- Provide forward-looking implication or scholarly reflection.
- Do not introduce new evidence.

## References
- Full bibliography in strict ${citation} format.
- Only include sources cited in-text.
- Alphabetized if required by citation style.

Post-Content Compliance Line (Mandatory):

**Word Count:** [actual word count]
**Complexity Level:** ${complexity}

Markdown Compliance Rules:

1. Output pure Markdown only.
2. No HTML.
3. No frontmatter (---).
4. Use:
   - # for title only.
   - ## for major sections only.
5. No decorative formatting.
6. No emojis.
7. No code blocks.
8. No bullet points unless structurally necessary for argument clarity.
9. No meta commentary.
10. Output ONLY the completed essay.

Argumentation Discipline:

- Every body section must directly support ${thesisStatement}.
- Maintain logical transitions between sections.
- Avoid repetition.
- Avoid unsupported claims.
- Ensure scholarly voice and analytical precision.

Now generate the complete academic essay following this contract exactly.
`;
};

export default essayPrompt;
