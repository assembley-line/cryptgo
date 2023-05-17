"use client";

import { useRouter } from "next/navigation";
import retrieveFromCode from "@/functions/retrieveFromCode";
import { HiLockOpen } from "react-icons/hi";
import { useState } from "react";
import Image from "next/image";
import RetrievedNewUnencryptedMessageModal from "@/app/components/modals/retrievedNewUnencryptedMessageModal";
import logo from "../../assets/CryptGo Logo_Final.png";

const errorMessages = {
  404: "*CryptGo code not found!",
  303: "*CryptGo code is invalid",
  101: "*Invalid code format (XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX)",
};

function DecryptPage() {
  const [codeInput, setCodeInput] = useState("");
  const [disabledControls, setDisabledControls] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useRouter();

  var errorCodes = Object.keys(errorMessages);

  var CryptoJS = require("crypto-js");

  function decryptCode() {
    setDisabledControls(true);
    retrieveFromCode(codeInput).then((message: string) => {
      if (errorCodes.includes(message)) {
        // @ts-ignore
        setErrorMessage(errorMessages[message]);
        setDisabledControls(false);
        return;
      }
      var decryptedUTF = CryptoJS.AES.decrypt(message, "2b8tconrcm928yrn23t7");
      var decryptedMessage = decryptedUTF.toString(CryptoJS.enc.Utf8);
      decryptedMessage = decryptedMessage.replaceAll("/*40%/", "\n");
      setErrorMessage("");
      setMessage(decryptedMessage);
      setShowModal(true);
      setDisabledControls(false);
    });
  }
  return (
    <div className="w-[100vw] h-[100vh] bg-[#1f1f24] flex justify-center items-center">
      <RetrievedNewUnencryptedMessageModal
        visible={showModal}
        message={message}
        close={() => setShowModal(false)}
      />
      <div className="absolute top-10 left-10 flex gap-2 items-center">
        <Image alt="logo" src={logo} width={40} height={40} />
        <p className="text-lg font-medium text-white">CryptGo</p>
      </div>
      <div className="w-[80%] max-w-[40rem] h-[20rem] flex flex-col gap-3 items-end">
        <p className="text-white/30 w-[100%] max-w-[40rem] flex-wrap flex justify-center">
          Input the CryptGo code given to you. Careful, you can only view this
          message once
        </p>
        {errorMessage != "" && (
          <p className="w-[100%] max-w-[39rem] text-red-700">{errorMessage}</p>
        )}
        <input
          className={
            "text-white bg-white/10 w-[100%] max-w-[39rem] h-[3rem] border-[1px] rounded-md resize-none box-border py-[0.8rem] px-[0.8rem] focus:outline-none overflow-hidden scroll mb-1 disabled:text-white/70 " +
            (errorMessage != "" ? "border-red-700" : "border-white/20")
          }
          placeholder="Enter CryptGo code here..."
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
          disabled={disabledControls}
        ></input>
        <div className="flex gap-2">
          <button
            className="bg-white/10 text-white h-[2.4rem] px-[1.2rem] py-[0.5rem] border-[1px] 
            border-white/20 rounded-md flex gap-2 items-center hover:bg-[#ffffff22] tracking-wide
            disabled:bg-white/5 disabled:cursor-not-allowed"
            onClick={() => navigate.push("/encrypt")}
            disabled={disabledControls}
          >
            Encrypt
          </button>
          <button
            className="bg-red-800/70 text-white h-[2.4rem] px-[1.2rem] py-[0.5rem] border-[1px] 
            border-white/20 rounded-md flex gap-2 items-center hover:bg-red-800/80 tracking-wide
            disabled:bg-red-800/60 disabled:cursor-not-allowed"
            onClick={decryptCode}
            disabled={disabledControls}
          >
            Decrypt
            <HiLockOpen />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DecryptPage;
