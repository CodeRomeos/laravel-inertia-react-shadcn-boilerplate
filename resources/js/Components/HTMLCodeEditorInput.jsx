import React from "react";
import Prism from "prismjs";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css"; //Example style, you can use another

const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
        .split("\n")
        .map(
            (line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`
        )
        .join("\n");

export default function HTMLCodeEditorInput({ value = "", onChange }) {
    return (
        <Editor
            value={value}
            onValueChange={onChange}
            highlight={(code) =>
                hightlightWithLineNumbers(code, languages.markup)
            }
            className="html-code-editor"
            padding={10}
            textareaClassName="codeArea"
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                // marginLeft: `20px`,
            }}
        />
    );
}
