import EditorComponent from "@/components/write/TextEditor";
import { useState } from "react";

const WritePage = () => {
  // 레시피 글쓰기 페이지에 추후 들어갈 데이터 목록입니다.
  // : 닉네임, 애니메이션 제목, 음식명, 재료, 소요시간, 음식종류,공개여부,대표사진
  const [editorText, setEditorText] = useState("");

  return (
    <div>
      <h3>레시피 글쓰기 페이지입니다.</h3>
      <EditorComponent editorText={editorText} setEditorText={setEditorText} />
      <h3>글쓰기 미리보기</h3>
      <div dangerouslySetInnerHTML={{ __html: editorText }} />
    </div>
  );
};

export default WritePage;
