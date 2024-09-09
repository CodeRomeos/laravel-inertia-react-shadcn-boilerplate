import React from "react";
import { Editor } from "react-draft-wysiwyg";
import {
    EditorState,
    convertToRaw,
    convertFromHTML,
    ContentState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function EditorInput({
    value = "",
    onChange
}) {

    const [editorState, editorStateSet] = React.useState(
        EditorState.createEmpty()
    );

    React.useEffect(() => {
        onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }, [editorState]);

    React.useEffect(() => {
        const contentBlock = htmlToDraft(value);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            editorStateSet(editorState);
        }
    }, []);

    return (
        <Editor
            editorState={editorState}
            // toolbarClassName="toolbarClassName"
            // wrapperClassName="wrapperClassName"
            editorClassName="border p-2 border-slate-100 h-80"
            onEditorStateChange={editorStateSet}
        />
    );
}