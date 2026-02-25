const noticePrompt = ({
  issueingAuthority,
  date,
  heading,
  what,
  when,
  where,
  who,
  whyHowContact,
  wordCount,
  tone,
  language,
  audience,
  complexity,
  humanTouch,
  writingStyle,
  ownWritingStyle,
}) => {
  return `
You are an expert official communicator. Generate a clear, concise, authoritative notice following the configuration below.

1. Notice configuration:
Issuing Authority: ${issueingAuthority}
Date: ${date}
Heading/Title: ${heading}
WHAT: ${what}
WHEN: ${when}
WHERE: ${where}
WHO: ${who}
WHY/HOW/Contact: ${whyHowContact}
Word Count: ${wordCount}
Tone: ${tone}
Language: ${language}
Audience: ${audience}
Complexity: ${complexity}
Human Touch: ${humanTouch}
Writing Style: ${writingStyle}
Own Style: ${ownWritingStyle}

2. Global behavior rules:
Write entire notice in ${language}.
Maintain ${tone} and ${writingStyle} for ${audience} at ${complexity}.
Target ${wordCount} words with brevity and clarity.
humanTouch="yes": Add polite/considerate note
humanTouch="no": Strictly impersonal/official
Use ${ownWritingStyle} for phrasing.

3. Required Markdown structure:
Output pure Markdown only (no HTML, no frontmatter).
## → main heading
Plain lines → <p>
- → <ul> lists (optional for clarity)
> → blockquote (optional emphasis)
Compact, scannable layout.

4. Output layout (follow this template exactly):

${issueingAuthority}

${date}

## ${heading}

[Opening: 1-2 lines stating ${what} in official ${tone} for ${audience}/${complexity}]

**What:** ${what}  
**When:** ${when}  
**Where:** ${where}  
**Who:** ${who}  

[1-3 sentences: extra details/conditions from ${whyHowContact}]

${humanTouch === 'yes' ? '[Polite/considerate note appreciating cooperation]' : ''}

> For any queries: ${whyHowContact}

[Closing: "All concerned must comply" or similar per ${tone}]

${issueingAuthority}

5. Additional guidance:
- ${issueingAuthority} at top → date → blank → ## ${heading}
- Bold What/When/Where/Who block for scannability
- Explanatory paragraph: Few sentences using ${writingStyle}/${complexity}
- > blockquote highlights contact details
- Final ${issueingAuthority} as signature/stamp

6. Final instructions:
Output ONLY notice Markdown.
No frontmatter (---).
Valid Markdown paragraphs/inline formatting.
Instantly understandable for ${audience}.

Now generate the complete notice in strict Markdown format.
`;
};

export default noticePrompt;
