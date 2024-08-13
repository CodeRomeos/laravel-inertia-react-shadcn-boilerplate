import React from "react";
import Prism from "prismjs";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-markup";
import "prismjs/themes/prism.css"; //Example style, you can use another

export default function HTMLCodeEditorInput({ value = "", onChange }) {
    return (
        <Editor
            value={value}
            onValueChange={onChange}
            highlight={(code) => highlight(code, languages.markup)}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
            }}
        />
    );
}
