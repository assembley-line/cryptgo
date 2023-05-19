"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
// @ts-ignore
import addNewEncryptedMessage from "@/functions/CreateNew";
import CreatedNewEncryptedMessageModal from "@/app/components/modals/CreatedNewEncryptedMessage";
import Image from "next/image";
import logo from "../../assets/CryptGo Logo_Final.png";

import { HiLockClosed } from "react-icons/hi";

function EncryptPage() {
  const [textInput, setTextInput] = useState("");
  const [disabledControls, setDisabledControls] = useState(false);
  const [code, setCode] = useState("");
  const [showModal, setShowModal] = useState(false);

  const naviagte = useRouter();

  var CryptoJS = require("crypto-js");

  function encryptData() {
    if (textInput === "") {
      return;
    }
    const lines = textInput.split("\n");
    var baseEncryption = CryptoJS.AES.encrypt(
      lines.join("/*40%/"),
      process.env.ENCRYPTION_KEY
    ).toString();

    var encryptedOutput = baseEncryption;

    var cores = [];

    for (let core = 0; core < 7; core++) {
      cores.push(Math.random().toString(36).substring(2, 7).toUpperCase());
    }
    var slug = cores.join("-");

    setDisabledControls(true);
    addNewEncryptedMessage(slug, encryptedOutput).then((code) => {
      setCode(code);
      setShowModal(true);
      setDisabledControls(false);
    });
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-[#1f1f24] flex justify-center items-center">
      <CreatedNewEncryptedMessageModal
        code={code}
        visible={showModal}
        close={() => setShowModal(false)}
      />
      <div className="absolute w-[100vw] top-0 p-10 flex gap-2 items-center sm:justify-start justify-center">
        <Image alt="logo" src={logo} width={40} height={40} />
        <p className="text-lg font-medium text-white">CryptGo</p>
      </div>
      <div className="w-[80%] max-w-[39rem] h-[20rem] flex flex-col gap-3 items-end">
        <p className="text-white/30 w-[100%] max-w-[39rem] flex-wrap flex justify-center">
          Create a one-time key to view an encrypted message thats deleted after
          viewing
        </p>
        <textarea
          rows={2}
          placeholder="Enter message to encrypt..."
          className="text-white bg-white/10 h-full border-[1px] border-white/20 
          rounded-md resize-none box-border py-[0.8rem] px-[0.8rem] focus:outline-none overflow-hidden scroll
          disabled:text-white/70 w-[100%] max-w-[39rem]"
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value);
          }}
          disabled={disabledControls}
        ></textarea>
        <div className="flex gap-2">
          <button
            className="bg-white/10 text-white h-[2.4rem] px-[1.2rem] py-[0.5rem] border-[1px] 
            border-white/20 rounded-md flex gap-2 items-center hover:bg-[#ffffff22] tracking-wide
            disabled:bg-white/5 disabled:cursor-not-allowed"
            onClick={() => naviagte.push("/decrypt")}
            disabled={disabledControls}
          >
            Decrypt
          </button>
          <button
            className="bg-green-800/70 text-white h-[2.4rem] px-[1.2rem] py-[0.5rem] border-[1px] 
            border-white/20 rounded-md flex gap-2 items-center hover:bg-green-800/80 tracking-wide
            disabled:bg-green-800/60 disabled:cursor-not-allowed"
            onClick={encryptData}
            disabled={disabledControls}
          >
            Encrypt
            <HiLockClosed />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EncryptPage;
