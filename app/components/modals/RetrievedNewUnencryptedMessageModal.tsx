import { IoClose } from "react-icons/io5";
import { MdVisibilityOff } from "react-icons/md";

interface Props {
  message: string;
  visible: boolean;
  close(): any;
}

function RetrievedNewUnencryptedMessageModal(props: Props) {
  if (!props.visible) {
    return null;
  }

  return (
    <div className="absolute w-[100vw] h-[100vh] bg-black/40 flex justify-center items-center backdrop-blur">
      <div className="w-[90%] max-w-[37rem] h-fit bg-[#1f1f24] border-[1px] border-white/20 rounded-md pt-[1.2rem] pb-3 px-[1.3rem] relative">
        <p className="text-white/70 font-medium text-lg">Opened a new code!</p>
        <p className="text-white/30">
          This message has now been deleted from storage
        </p>
        <div
          className="text-white absolute top-4 right-[1.15rem] hover:bg-white/10 rounded-md cursor-pointer flex items-center justify-center p-1"
          onClick={props.close}
        >
          <IoClose color={"white"} size={"1.3rem"} />
        </div>
        <p className="px-[0.9rem] py-[0.55rem] bg-white/5 my-3 border-[1px] border-white/20 rounded-md text-white/60 whitespace-pre-line overflow-clip w-[100%] max-w-[34.25rem] h-fit flex-wrap break-words">
          {props.message}
        </p>
      </div>
    </div>
  );
}

export default RetrievedNewUnencryptedMessageModal;
