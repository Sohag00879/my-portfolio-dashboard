"use server";
interface Blog {
   title:string;
   content:string;
   category:string;
   time:string;
  }
export const createBlog = async (data:Blog) => {
    const res = await fetch(" https://portfolio-server-rho-gold.vercel.app/api/v1/create-blog", {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data),
        cache:'no-store'
    });
    const blogInfo = await res.json();
    return blogInfo;
}
