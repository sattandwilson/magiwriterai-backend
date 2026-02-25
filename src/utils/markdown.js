import { marked } from "marked";
import dompurify from "dompurify";
import { JSDOM } from "jsdom";

const { window } = new JSDOM();
const purify = dompurify(window);

const documentRenderer = {
  // Block-level renderers
  code(code) {
    const { lang, text } = code;
    const language = lang ? ` class="language-${lang}"` : "";

    return `
    <pre style="
      background:#f4f4f4;
      padding:1em;
      border-radius:6px;
      overflow-x:auto;
      margin:1.5em 0;
      font-size:13px;
      line-height:1.5;
    ">
      <code${language}
        style="font-family:monospace;">
        ${text}
      </code>
    </pre>
  `;
  },
  blockquote(blockquote) {
    return `
    <blockquote style="
      border-left:4px solid #888;
      background:#f5f5f5;
      padding:1em 1.2em;
      margin:1.5em 0;
      font-style:italic;
      border-radius:0 6px 6px 0;
    ">
      ${this.parser.parse(blockquote.tokens)}
    </blockquote>
  `;
  },
  html(html) {
    return html.text;
  },

  heading(heading) {
    const sizes = ["28px", "22px", "18px", "16px", "14px", "13px"];
    const size = sizes[heading.depth - 1] || "14px";
    const text = this.parser.parseInline(heading.tokens);

    const align = heading.depth === 1 ? "center" : "left";

    return `
    <h${heading.depth}
      style="
        font-size:${size};
        font-weight:700;
        margin:1.5em 0 0.75em 0;
        line-height:1.4;
        text-align:${align};
      ">
      ${text}
    </h${heading.depth}>
  `;
  },

  hr() {
    return `<hr style="border:none;border-top:1px solid #ddd;margin:2em 0;">`;
  },

  list(list) {
    const type = list.ordered ? "ol" : "ul";
    const start =
      list.start !== "" && list.start !== 1 ? ` start="${list.start}"` : "";

    return `
    <${type}${start}
      style="
        margin:1em 0;
        padding-left:1.5em;
        line-height:1.6;
      ">
      ${list.items.map((item) => this.listitem(item)).join("")}
    </${type}>
  `;
  },
  listitem(listitem) {
    if (listitem.task) {
      const checked = listitem.checked ? " checked" : "";
      return `<li style="margin:0.2em 0;"><input type="checkbox"${checked} style="margin-right:0.5em;" disabled> ${this.parser.parse(
        listitem.tokens,
      )}</li>`;
    }
    // ✅ KEY FIX: parse() not parseInline()
    return `<li style="margin:0.2em 0;">${this.parser.parse(
      listitem.tokens,
    )}</li>`;
  },

  // ✅ ENSURE these exist:
  paragraph(paragraph) {
    return `
    <p style="
      margin:0.75em 0;
      line-height:1.7;
      font-size:15px;
    ">
      ${this.parser.parseInline(paragraph.tokens)}
    </p>
  `;
  },
  text(text) {
    return text.text.replace(/\n/g, "<br>");
  },

  strong(strong) {
    return `<strong style="font-weight:700;">${this.parser.parseInline(
      strong.tokens,
    )}</strong>`;
  },

  em(em) {
    return `<em style="font-style:italic;">${this.parser.parseInline(
      em.tokens,
    )}</em>`;
  },

  codespan(codespan) {
    return `
    <code style="
      background:#f0f0f0;
      padding:2px 6px;
      border-radius:4px;
      font-family:monospace;
      font-size:13px;
    ">
      ${codespan.text}
    </code>
  `;
  },
  checkbox(checkbox) {
    const checked = checkbox.checked ? " checked" : "";
    return `<input type="checkbox"${checked} disabled style="margin-right:0.5em;">`;
  },

  table(table) {
    const header = table.header
      .map(
        (cell) =>
          `<th style="border:1px solid #ddd;padding:0.75em;background:#f8f9fa;font-weight:600;text-align:left;vertical-align:top;">${this.parser.parseInline(
            cell.tokens,
          )}</th>`,
      )
      .join("");

    const rows = table.rows
      .map(
        (row) => `
      <tr>
        ${row
          .map(
            (cell) => `
            <td style="
              border:1px solid #ddd;
              padding:0.75em;
              vertical-align:top;
            ">
              ${this.parser.parseInline(cell.tokens)}
            </td>
          `,
          )
          .join("")}
      </tr>
    `,
      )
      .join("");

    return `
  <table style="
    border-collapse:collapse;
    width:100%;
    margin:1.5em 0;
  ">
    <thead>
      <tr>${header}</tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
`;
  },

  tablerow() {
    return ""; // Handled in table renderer
  },

  tablecell() {
    return ""; // Handled in table renderer
  },

  br() {
    return "<br>";
  },

  del(del) {
    return `<del style="text-decoration:line-through;color:#666;">${this.parser.parseInline(
      del.tokens,
    )}</del>`;
  },

  link(link) {
    const title = link.title ? ` title="${link.title}"` : "";
    const text = this.parser.parseInline(link.tokens);

    return `
    <a href="${link.href}"${title}
      style="
        color:#2563eb;
        text-decoration:underline;
      ">
      ${text}
    </a>
  `;
  },
  image(image) {
    // const title = image.title ? ` title="${image.title}"` : "";
    // const alt = this.parser.parseInline(image.tokens);

    return;
  },
};

// Usage with inline styles for PDF/DOCX compatibility
marked.use({ renderer: documentRenderer });

// Add document styles (include this in your HTML head)
const documentStyles = `
<style>
  body { 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.7;
    color: #212121;
    max-width: 800px;
    margin: 0 auto;
    padding: 2em 3em;
  }
</style>
`;

const markdownToSafeHtml = (markdown) => {
  try {
    const dirtyHtml = marked.parse(markdown);
    const cleanHtml = purify.sanitize(dirtyHtml, {
      ALLOWED_TAGS: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "a",
        "ul",
        "ol",
        "li",
        "strong",
        "em",
        "code",
        "pre",
        "blockquote",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "img",
        "br",
        "hr",
        "div",
      ],
      ALLOWED_ATTR: [
        "href",
        "src",
        "alt",
        "target",
        "rel",
        "title",
        "style",
        "input",
        "del",
      ],
    });
    const fullHTML = `
<!DOCTYPE html> <html> <head>${documentStyles}</head> <body>${cleanHtml}</body> </html>`;
    return fullHTML;
  } catch (error) {
    console.error("Markdown parsing error:", error);
    return `<p>Failed to parse markdown: ${error.message}</p>`;
  }
};

export default markdownToSafeHtml;
