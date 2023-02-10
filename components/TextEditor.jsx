import React, { useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ content, setContent }) => {
  const quillRef = useRef();
  const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
  });

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  return (
    <QuillNoSSRWrapper
      forwardedRef={quillRef}
      modules={modules}
      value={content}
      placeholder="본문"
      onChange={setContent}
      theme="snow"
    />
  );
};

export default TextEditor;
