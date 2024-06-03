"use client";
import { createProject } from "@/action/createProject";
import { message } from "antd";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  liveDemoLink: string;
  githubLink: string;
  postmanLink: string;
  frontendTech: string[];
  backendTech: string[];
  image1: string;
  image2: string;
  description: string;
  category: string;
}

const CreateProject: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    liveDemoLink: "",
    githubLink: "",
    postmanLink: "",
    frontendTech: [],
    backendTech: [],
    category: "",
    image1: "",
    image2: "",
    description: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;
    const selectedValues: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setFormData({
      ...formData,
      [name]: selectedValues,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createProject(formData);
      message.success(res.message);
      router.push('/all-projects')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-red-500">
      <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
        <div className="mt-3 text-center text-4xl font-bold">
          Create a Project
        </div>
        <form className="p-8" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <input
              type="text"
              name="name"
              className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Title"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="liveDemoLink"
              className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Live Demo Link"
              value={formData.liveDemoLink}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="githubLink"
              className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Github Repository Link"
              value={formData.githubLink}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="postmanLink"
              className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Postman Documentation Link"
              value={formData.postmanLink}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-6 flex gap-4">
            <select
              name="frontendTech"
              className="block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 font-semibold text-gray-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              multiple={true}
              onChange={handleSelectChange}
            >
              <option value="Html">Html</option>
              <option value="CSS">CSS</option>
              <option value="Tailwind">Tailwind</option>
              <option value="React">React</option>
              <option value="Typescript">Typescript</option>
              <option value="Jod">Jod</option>
              <option value="Next.js">Next.js</option>
              <option value="React Router">React Router</option>
              <option value="Redux">Redux</option>
              <option value="Redux Toolkit">Redux Toolkit</option>
              <option value="Tansack Query">Tansack Query</option>
              <option value="Axios">Axios</option>
              <option value="Ant Design">Ant Design</option>
              <option value="Material UI">Material UI</option>
              <option value="Next UI">Next UI</option>
              <option value="Framer Motion">Framer Motion</option>
              <option value="Auth0">Auth0</option>
            </select>
            <select
              name="backendTech"
              className="block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 font-semibold text-gray-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              multiple={true}
              onChange={handleSelectChange}
            >
              <option value="Node.js">Node.js</option>
              <option value="Express">Express</option>
              <option value="MongoDB">MongoDB</option>
              <option value="Typescript">Typescript</option>
              <option value="Mongoose">Mongoose</option>
              <option value="JWT">JWT</option>
              <option value="Jod">Jod</option>
            </select>
          </div>
          <div className="flex gap-4 my-6">
            <input
              type="text"
              name="category"
              className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Category"
              value={formData.category}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="image1"
              className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Primary Image"
              value={formData.image1}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="image2"
              className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              placeholder="Secondary Image"
              value={formData.image2}
              onChange={handleInputChange}
            />
          </div>
          <div className="">
            <textarea
              name="description"
              className="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-300"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-blue-700 px-8 py-3 text-sm font-semibold text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
