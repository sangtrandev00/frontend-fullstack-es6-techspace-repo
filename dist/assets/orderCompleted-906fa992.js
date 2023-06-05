import"./axiosClient-bd54c5dc.js";import"./main-0ae8c9b5.js";import{S as p,k as t,l as f,m as g}from"./helper-06e4e79d.js";const o=document.getElementById("view-history-cart"),y=new URL(location.href),h=y.searchParams,c=h.get("id"),w=async()=>{const{order:{user:{fullName:l,email:e,phone:s,shippingAddress:r},products:{items:i,totalPrice:a},createdAt:d},message:n}=await p.getOrderById(c),m=(a+8).toFixed(2);t("orderId",`#${c}`),t("orderCreatedAt",`${d}`),t("subtotal",`$${a.toFixed(2)}`),t("discount","0"),t("allTotal",`$${m}`),t("customerName",`${l}`),t("shippingAddress",`${r}`),t("email",`${e}`),t("phone",`${s}`),f("customerAvatar","http://localhost:8080/images/user-avatar.jpg");const x=i;o.innerHTML="",g(x,o,$)},$=(l,e,s,r,i,a,d)=>`
        <div prod-id=${l}
        class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
        <div class="pb-4 md:pb-8 w-10 md:w-40 ">
            <img class="w-28 hidden md:block" src="http://localhost:8080/${s}"
                alt="${e}" />
            <img class="w-full md:hidden" src="http://localhost:8080/${s}"
                alt="${e}" />
        </div>
        <div
            class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
            <div class="w-full flex flex-col justify-start items-start space-y-8">
                <h3
                    class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                    ${e}</h3>
                <div class="flex justify-start items-start flex-col space-y-2">
                    <p class="text-sm dark:text-white leading-none text-gray-800"><span
                            class="dark:text-gray-400 text-gray-300">Brand: </span>
                        ${r}</p>
                </div>
            </div>
            <div class="flex justify-between space-x-8 items-start w-full">
                <p class="text-base dark:text-white xl:text-lg leading-6">$${a} </p>
                <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">${i} <span class="italic font-normal text-gray-500">(item)</span></p>
                <p
                    class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                    $${d}</p>
            </div>
        </div>
        </div>
      `;(async()=>await w())();
