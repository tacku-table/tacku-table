// // components/ModalContainer.js

// import React, { useContext } from "react";
// import { createPortal } from "react-dom";
// import { ModalStateContext } from "../../context/ModalProvider";
// import MyModal from "./MyModal";

// const MODAL_COMPONENTS = {
//   first: MyModal
// //   second: SecondModal,
// };

// function ModalContainer() {
//   const { type, props } = useContext(ModalStateContext);

//   if (!type) {
//     return null;
//   }

//   const Modal = MODAL_COMPONENTS[type];
//   return createPortal(
//     <>
//       <Modal {...props} />
//     </>
//       document.getElementById("modal")
//   );
// }

// export default ModalContainer;
