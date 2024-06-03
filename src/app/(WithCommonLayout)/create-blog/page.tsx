"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { message, Select } from "antd";
import { createBlog } from "@/action/createBlog";
import { useRouter } from "next/navigation";

const { Option } = Select;

// Dynamically import Editor component
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then(mod => mod.Editor),
  { ssr: false }
);

const CreateBlog = () => {
  const router = useRouter();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentField, setCurrentField] = useState("title");
  const [titleState, setTitleState] = useState(EditorState.createEmpty());
  const [contentState, setContentState] = useState(EditorState.createEmpty());
  const [categoryState, setCategoryState] = useState(EditorState.createEmpty());
  const [image, setImage] = useState("");

  const handleEditorChange = (state: any) => {
    setEditorState(state);
    if (currentField === "title") {
      setTitleState(state);
    } else if (currentField === "content") {
      setContentState(state);
    } else if (currentField === "category") {
      setCategoryState(state);
    }
  };

  const handleFieldChange = (value: string) => {
    setCurrentField(value);
    if (value === "title") {
      setEditorState(titleState);
    } else if (value === "content") {
      setEditorState(contentState);
    } else if (value === "category") {
      setEditorState(categoryState);
    }
  };

  const handleSubmit = async () => {
    const content = draftToHtml(convertToRaw(contentState.getCurrentContent()));
    const title = draftToHtml(convertToRaw(titleState.getCurrentContent()));
    const category = draftToHtml(
      convertToRaw(categoryState.getCurrentContent())
    );

    if (
      !title ||
      !content ||
      !category ||
      title === "<p></p>\n" ||
      content === "<p></p>\n" ||
      category === "<p></p>\n"
    ) {
      message.error("All fields (Title, Content, and Category) are required.");
      return;
    }
    const currentTime = new Date().toISOString();
    const data = {
      title,
      content,
      category,
      image,
      time: currentTime,
    };

    try {
      const res = await createBlog(data);
      message.success(res.message);
      router.push('/all-blogs');
    } catch (err) {
      console.log(err);
      message.error("Failed to create blog.");
    }
  };

  return (
    <div>
      <h1>Create Blog</h1>
      <div>
        <Select
          value={currentField}
          onChange={handleFieldChange}
          style={{ width: 200 }}
        >
          <Option value="title">Title</Option>
          <Option value="content">Content</Option>
          <Option value="category">Category</Option>
        </Select>
      </div>
      <div>
        <h2>{currentField.charAt(0).toUpperCase() + currentField.slice(1)}</h2>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          placeholder={`Enter blog ${currentField} here...`}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "list",
              "textAlign",
              "colorPicker",
              "link",
              "embedded",
              "emoji",
              "image",
              "remove",
              "history",
            ],
            inline: { inDropdown: false },
            list: { inDropdown: false },
            textAlign: { inDropdown: false },
            link: { inDropdown: false },
            history: { inDropdown: false },
          }}
        />
        <input
          type="text"
          name="image"
          className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
          placeholder="Blog Image"
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="cursor-pointer rounded-lg bg-blue-700 px-8 py-3 text-sm font-semibold text-white mt-5"
      >
        Submit
      </button>
    </div>
  );
};

export default CreateBlog;
