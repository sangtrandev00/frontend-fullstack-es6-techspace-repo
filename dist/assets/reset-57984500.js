import"./axiosClient-bd54c5dc.js";import"./main-0ae8c9b5.js";import{A as a}from"./authApi-bb3dd306.js";import{o as n}from"./helper-06e4e79d.js";const l=async()=>{const s=document.getElementById("reset-form");s&&s.addEventListener("submit",async t=>{t.preventDefault(),console.log("submit reset password");const o=t.target.elements.email.value;try{const e=await a.sendEmailReset({email:o});console.log(e);const{message:i,user:{_id:r}}=e;localStorage.setItem("user",JSON.stringify({email:o,userId:r})),console.log("submit sending email to reset password"),console.log("user token: ",localStorage.getItem("user"))}catch(e){console.log(e.response.status),e.response.status===402&&n("")}})};(async()=>await l())();