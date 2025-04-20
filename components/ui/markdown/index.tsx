"use client"

import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { replaceLatexDelimiters } from "@/lib/utils";
import { memo } from "react";
import markedKatex from "marked-katex-extension";

// Initialize a new Marked instance with markedHighlight
const marked = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
  {
    breaks: true,
    gfm: true,
  }
);

// Use markedKatex with the new Marked instance
marked.use(
  markedKatex({
    // @ts-ignore
    throwOnError: false,
    displayMode: true,
    output: "mathml",
  })
);

// Add custom tokenizer if needed
marked.use({
  walkTokens(token) {
    if (token.type === "text") {
      token.text = token.text.replace(
        /\^\^\^(.*?)\^\^\^/g,
        '<span class="bg-yellow-300 dark:bg-yellow-900/50 text-yellow-900 dark:text-yellow-100 py-0.5 px-1 rounded">$1</span>'
      );
    }
  },
});

const Markdown = memo(
  ({ content }: { content: string }) => {
    const parsedContent = marked.parse(replaceLatexDelimiters(content)) as string;

    return (
      <div
        className="prose prose-sm dark:prose-invert w-full overflow-hidden mx-auto max-w-xs sm:max-w-sm md:max-w-xl"
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      />
    );
  },
  (prevProps, nextProps) => {
    return prevProps.content === nextProps.content;
  }
);

Markdown.displayName = "Markdown";

export default Markdown;
