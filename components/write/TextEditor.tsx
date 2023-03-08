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
  "color",
  "align",
];

interface EditorProps {
  editorText: string;
  setEditorText: React.Dispatch<React.SetStateAction<string>>;
}

const EditorComponent = ({ editorText, setEditorText }: EditorProps) => {
  const quillRef: any = useRef();
  const [imgLoading, setImgLoading] = useState("default");

  const imageHandler = () => {
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
      setImgLoading("loading");
      const response = await uploadString(imgRef, imgDataUrl, "data_url");
      setImgLoading("completed");
      downloadUrl = await getDownloadURL(response.ref);
      const range: any = quillRef.current.getEditorSelection();
      quillRef.current
        .getEditor()
        .insertEmbed(range.index, "image", downloadUrl);
      quillRef.current.getEditor().setSelection(range.index + 1);
      (document.body.querySelector(":scope > input") as HTMLElement).remove();
    }
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "blockquote"],
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
      {imgLoading == "loading" && (
        <div className="flex items-center justify-center">
          <div className="mt-[30px] text-center absolute rounded-lg flex bg-brand100 w-[500px] h-[200px]">
            <div className="text-xl text-white m-auto">
              사진을 서버에 열심히 로딩하고 있어요 <br />
              잠시만 기다려주세요 !!!!
            </div>
          </div>
        </div>
      )}
      <QuillWrapper
        className="textEditor"
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
