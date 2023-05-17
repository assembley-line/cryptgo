"use client";

import { IoClose } from "react-icons/io5";
import { FiCopy } from "react-icons/fi";
import { MdVisibilityOff } from "react-icons/md";

interface Props {
  code: string;
  visible: boolean;
  close(): any;
}

function CreatedNewEncryptedMessageModal(props: Props) {
  if (!props.visible) {
    return null;
  }

  function copyCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <div className="absolute w-[100vw] h-[100vh] bg-black/40 flex justify-center items-center backdrop-blur">
      <div className="w-[90%] max-w-[37rem] h-[12.5rem] bg-[#1f1f24] border-[1px] border-white/20 rounded-md py-[1.2rem] px-[1.3rem] relative">
        <p className="text-white/70 font-medium text-lg">New code created!</p>
        <p className="text-white/30">Give your friend this code or copy it</p>
        <div
          className="text-white absolute top-4 right-[1.15rem] hover:bg-white/10 rounded-md cursor-pointer flex items-center justify-center p-1"
          onClick={props.close}
        >
          <IoClose color={"white"} size={"1.3rem"} />
        </div>
        <pre className="newCodePopupText py-[0.8rem] px-[0.5rem] bg-white/10 border-[1px] border-white/20 rounded-md w-full flex items-center justify-center text-white/70 mt-4 gap-4">
          {props.code}
          <FiCopy
            className="w-[2rem] h-[2rem] flex justify-center items-center rounded-md hover:bg-white/20 cursor-pointer p-[0.45rem]"
            onClick={copyCodeToClipboard}
          />
        </pre>
        <div className="flex gap-2 items-center mt-[0.8rem]">
          <MdVisibilityOff size={18} color="#bd3737" />
          <p className="text-red-600/80 text-s">
            You will not be able to see this code again.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreatedNewEncryptedMessageModal;
