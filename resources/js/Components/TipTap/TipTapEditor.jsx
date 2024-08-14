import React from "react";
import './TipTap.css'
import {
    BubbleMenu,
    EditorContent,
    FloatingMenu,
    useEditor,
} from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import { ToggleGroup, ToggleGroupItem } from "@/shadcn/ui/toggle-group";
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, HighlighterIcon, ItalicIcon, PilcrowIcon, StrikethroughIcon, TableIcon } from "lucide-react";


export const tableHTML = `
  <table style="width:100%" class="tiptap-table">
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
    </tr>
    <tr>
      <td>John</td>
      <td>Doe</td>
      <td>80</td>
    </tr>
  </table>
`;


const CustomTable = Table.extend({
    addAttributes() {
        return {
            // extend the existing attributes …
            ...this.parent?.(),

            // and add a new one …
            class: {
                default: null,
                renderHTML: (attributes) => {
                    return {
                        "class": 'tiptap-table ' + attributes.class,
                    };
                },
            },
        };
    },
});

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <>
            <div className="control-group">
                <ToggleGroup
                    size={"sm"}
                    type="multiple"
                    className="button-group"
                >
                    <ToggleGroupItem
                        value="paragraph"
                        onClick={() =>
                            editor.chain().focus().setParagraph().run()
                        }
                        data-state={editor.isActive("paragraph") ? "on" : "off"}
                    >
                        <PilcrowIcon className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="bold"
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                        data-state={editor.isActive("bold") ? "on" : "off"}
                    >
                        <BoldIcon className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="italic"
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                        data-state={editor.isActive("italic") ? "on" : "off"}
                    >
                        <ItalicIcon className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="strike"
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                        data-state={editor.isActive("strike") ? "on" : "off"}
                    >
                        <StrikethroughIcon className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="highlight"
                        onClick={() =>
                            editor.chain().focus().toggleHighlight().run()
                        }
                        data-state={editor.isActive("highlight") ? "on" : "off"}
                    >
                        <HighlighterIcon className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="left"
                        onClick={() =>
                            editor.chain().focus().setTextAlign("left").run()
                        }
                        data-state={
                            editor.isActive({ textAlign: "left" })
                                ? "on"
                                : "off"
                        }
                    >
                        <AlignLeftIcon className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="center"
                        onClick={() =>
                            editor.chain().focus().setTextAlign("center").run()
                        }
                        data-state={
                            editor.isActive({ textAlign: "center" })
                                ? "on"
                                : "off"
                        }
                    >
                        <AlignCenterIcon className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="right"
                        onClick={() =>
                            editor.chain().focus().setTextAlign("right").run()
                        }
                        data-state={
                            editor.isActive({ textAlign: "right" })
                                ? "on"
                                : "off"
                        }
                    >
                        <AlignRightIcon className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="justify"
                        onClick={() =>
                            editor.chain().focus().setTextAlign("justify").run()
                        }
                        data-state={
                            editor.isActive({ textAlign: "justify" })
                                ? "on"
                                : "off"
                        }
                    >
                        <AlignJustifyIcon className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className="control-group">
                <ToggleGroup
                    size={"sm"}
                    type="multiple"
                    className="flex flex-wrap w-full items-center justify-center"
                >
                    <ToggleGroupItem
                        value="insertTable"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .insertTable({
                                    rows: 3,
                                    cols: 3,
                                    withHeaderRow: true,
                                })
                                .run()
                        }
                    >
                        Insert Table
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="insertHTMLTable"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .insertContent(tableHTML, {
                                    parseOptions: {
                                        preserveWhitespace: false,
                                    },
                                })
                                .run()
                        }
                    >
                        Insert HTML table
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="addTableColumnBefore"
                        onClick={() =>
                            editor.chain().focus().addColumnBefore().run()
                        }
                        data-state={
                            !editor.can().addColumnBefore() ? "off" : "on"
                        }
                    >
                        Add column before
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="addTableColumnAfter"
                        onClick={() =>
                            editor.chain().focus().addColumnAfter().run()
                        }
                        data-state={
                            !editor.can().addColumnAfter() ? "off" : "on"
                        }
                    >
                        Add column after
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="addTableRowBefore"
                        onClick={() =>
                            editor.chain().focus().deleteColumn().run()
                        }
                        data-state={!editor.can().deleteColumn() ? "off" : "on"}
                    >
                        Delete column
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="addTableRowBefore"
                        onClick={() =>
                            editor.chain().focus().addRowBefore().run()
                        }
                        data-state={!editor.can().addRowBefore() ? "off" : "on"}
                    >
                        Add row before
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="addTableRowAfter"
                        onClick={() =>
                            editor.chain().focus().addRowAfter().run()
                        }
                        data-state={!editor.can().addRowAfter() ? "off" : "on"}
                    >
                        Add row after
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="deleteTableRow"
                        onClick={() => editor.chain().focus().deleteRow().run()}
                        data-state={!editor.can().deleteRow() ? "off" : "on"}
                    >
                        Delete row
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="deleteTable"
                        onClick={() =>
                            editor.chain().focus().deleteTable().run()
                        }
                        data-state={!editor.can().deleteTable() ? "off" : "on"}
                    >
                        Delete table
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="mergeCells"
                        onClick={() =>
                            editor.chain().focus().mergeCells().run()
                        }
                        data-state={!editor.can().mergeCells() ? "off" : "on"}
                    >
                        Merge cells
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="splitCell"
                        onClick={() => editor.chain().focus().splitCell().run()}
                        data-state={!editor.can().splitCell() ? "off" : "on"}
                    >
                        Split cell
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="toggleHeaderColumn"
                        onClick={() =>
                            editor.chain().focus().toggleHeaderColumn().run()
                        }
                        data-state={
                            !editor.can().toggleHeaderColumn() ? "off" : "on"
                        }
                    >
                        ToggleHeaderColumn
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="toggleHeaderRow"
                        onClick={() =>
                            editor.chain().focus().toggleHeaderRow().run()
                        }
                        data-state={
                            !editor.can().toggleHeaderRow() ? "off" : "on"
                        }
                    >
                        Toggle header row
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="toggleHeaderCell"
                        onClick={() =>
                            editor.chain().focus().toggleHeaderCell().run()
                        }
                        data-state={
                            !editor.can().toggleHeaderCell() ? "off" : "on"
                        }
                    >
                        Toggle header cell
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="mergeOrSplit"
                        onClick={() =>
                            editor.chain().focus().mergeOrSplit().run()
                        }
                        data-state={!editor.can().mergeOrSplit() ? "off" : "on"}
                    >
                        Merge or split
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="fixTables"
                        onClick={() => editor.chain().focus().fixTables().run()}
                        data-state={!editor.can().fixTables() ? "off" : "on"}
                    >
                        Fix tables
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="goToNextCell"
                        onClick={() =>
                            editor.chain().focus().goToNextCell().run()
                        }
                        data-state={!editor.can().goToNextCell() ? "off" : "on"}
                    >
                        Go to next cell
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="goToPreviousCell"
                        onClick={() =>
                            editor.chain().focus().goToPreviousCell().run()
                        }
                        data-state={
                            !editor.can().goToPreviousCell() ? "off" : "on"
                        }
                    >
                        Go to previous cell
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        </>
    );
};

const TiptapEditor = ({ content = "<p>Hello World!</p>", onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight,
            CustomTable.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <>
            {editor && (
                <BubbleMenu
                    className="bubble-menu"
                    tippyOptions={{ duration: 100 }}
                    editor={editor}
                >
                    <ToggleGroup
                        size={"sm"}
                        type="multiple"
                        className="bg-white border rounded-sm"
                    >
                        <ToggleGroupItem
                            value="bold"
                            onClick={() =>
                                editor.chain().focus().toggleBold().run()
                            }
                            data-state={editor.isActive("bold") ? "on" : "off"}
                        >
                            Bold
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="italic"
                            onClick={() =>
                                editor.chain().focus().toggleItalic().run()
                            }
                            data-state={
                                editor.isActive("italic") ? "on" : "off"
                            }
                        >
                            Italic
                        </ToggleGroupItem>
                        <ToggleGroupItem
                            value="strike"
                            onClick={() =>
                                editor.chain().focus().toggleStrike().run()
                            }
                            data-state={
                                editor.isActive("strike") ? "on" : "off"
                            }
                        >
                            Strike
                        </ToggleGroupItem>
                    </ToggleGroup>
                </BubbleMenu>
            )}

            {/* {editor && (
                <FloatingMenu
                    className="floating-menu"
                    tippyOptions={{ duration: 100 }}
                    editor={editor}
                >
                    <ToggleGroup
                        size={"sm"}
                        type="multiple"
                        className="bg-white border rounded-sm"
                    >
                        
                    </ToggleGroup>
                </FloatingMenu>
            )} */}
            <MenuBar editor={editor} />
            <EditorContent
                editor={editor}
                className="outline-none [&>.tiptap.ProseMirror]:p-4"
                onChange={console.log}
            />
        </>
    );
};

export default TiptapEditor;
