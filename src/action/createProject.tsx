"use server";
interface Project {
    name: string;
    liveDemoLink: string;
    githubLink: string;
    postmanLink: string;
    frontendTech: string[];
    backendTech: string[];
    image1:string;
    image2:string;
    description: string;
  }
export const createProject = async (data:Project) => {
    const res = await fetch("https://portfolio-server-rho-gold.vercel.app/api/v1/create-project", {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data),
        cache:'no-store'
    });
    const projectInfo = await res.json();
    return projectInfo;
}
