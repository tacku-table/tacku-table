import { useRef, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";

const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

interface EditorProps {
  editorText: string;
  setEditorText: React.Dispatch<React.SetStateAction<string>>;
}

const EditorComponent = ({ editorText, setEditorText }: EditorProps) => {
  const quillRef: any = useRef();

  const imageHandler = () => {
    console.log("이미지 핸들러 실행!");
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    document.body.appendChild(input);
    input.click();

    input.onchange = async () => {
      const inputImage: any = input.files;
      const uploadImage = inputImage[0];
      if (inputImage !== null) {
        const reader = new FileReader();
        reader?.readAsDataURL(uploadImage);
        reader.onloadend = (finishedEvent: any) => {
          const imgDataUrl: any = finishedEvent.currentTarget.result;
          localStorage.setItem("imgDataUrl", imgDataUrl);
          addImgTag();
        };
      }
    };
  };

  const addImgTag = async () => {
    let randomID = Date.now();
    const imgRef = ref(storage, `photoTitle${randomID}`);
    const imgDataUrl = localStorage.getItem("imgDataUrl");
    let downloadUrl;
    if (imgDataUrl) {
      const response = await uploadString(imgRef, imgDataUrl, "data_url");
      downloadUrl = await getDownloadURL(response.ref);
      // 현재 텍스트 에디터 커서 위치를 불러오고, image태그 생성후
      // 파이어베이스에서 다운로드한 downloadUrl을 image태그의 src에 넣어준 후 태그를 생성하는 함수입니다.
      const range: any = quillRef.current.getEditorSelection();
      quillRef.current
        .getEditor()
        .insertEmbed(range.index, "image", downloadUrl);
      // 현재위치에 +1을 하여 이미지가 들어가는 위치보다 한칸 더 커서를 이동시키는 기능입니다.
      quillRef.current.getEditor().setSelection(range.index + 1);
      (document.body.querySelector(":scope > input") as HTMLElement).remove();
    }
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "video"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),

    []
  );

  return (
    <>
      <QuillWrapper
        forwardedRef={quillRef}
        value={editorText}
        onChange={setEditorText}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
    </>
  );
};

export default EditorComponent;
