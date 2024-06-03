"use client";
import { uploadResume } from "@/action/uploadResume";
import { message } from "antd";
import { FormEvent, useState } from "react";

const UploadResume = () => {
  const [resume, setResume] = useState("");
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      resume,
    };
    try {
      const res = await uploadResume(data);
      message.success(res.message);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2>Resume Upload</h2>{" "}
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            onChange={(e) => setResume(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-blue-700 px-8 py-3 text-sm font-semibold text-white mt-5"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadResume;
