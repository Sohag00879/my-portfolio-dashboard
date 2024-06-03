import React from "react";

type TItem = {
  _id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  time: string;
};

const Blogs = async () => {
  const res = await fetch("https://portfolio-server-rho-gold.vercel.app/api/v1/blogs", {
    next: {
      revalidate: 30,
    },
  });
  const data = await res.json();
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Number
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Time
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((item: TItem, i: number) => (
                  <tr className="bg-gray-100 border-b" key={i}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {i + 1}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      ></div>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.category }}
                      ></div>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {new Date(item.time).toLocaleDateString()}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <button className="cursor-pointer rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white ">
                        Edit
                      </button>
                      <button className="ms-3 cursor-pointer rounded-lg bg-red-700 px-4 py-3 text-sm font-semibold text-white">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
