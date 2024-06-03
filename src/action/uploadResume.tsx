"use server";
interface Resume {
    resume:string;
}
export const uploadResume = async (data:Resume) => {
    const res = await fetch("https://portfolio-server-rho-gold.vercel.app/api/v1/upload-resume", {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data),
        cache:'no-store'
    });
    const resumeInfo = await res.json();
    return resumeInfo;
}
