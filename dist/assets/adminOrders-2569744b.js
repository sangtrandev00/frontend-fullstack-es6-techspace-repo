import"./axiosClient-bd54c5dc.js";import{D as A}from"./jquery.dataTables-271468de.js";import{O as y}from"./ordersApi-e7fee0e3.js";import{m as k,k as t,o as M}from"./helper-06e4e79d.js";const E=document.getElementById("table-orders"),[$]=E.tBodies,h=document.getElementById("view-detail-cart"),b=document.getElementById("display-order"),L=document.getElementById("updateOrderBtn"),D=document.getElementById("viewOrderDetailBtn"),B=document.getElementById("deleteOrderBtnTrigger"),T=async()=>{try{const{orders:d}=await y.getAll();$.innerHTML="";const r=d.map(a=>{const{_id:e,shippingFee:i,vatFee:l,paymentMethod:n,status:s,user:{fullName:o,email:c,phone:u,shippingAddress:x},products:{items:p,totalPrice:g},createdAt:m,updatedAt:w}=a,v=p.reduce((C,I)=>C+I.qty,0);return[e,o,g.toFixed(2),s,n,m,v,`
        <div class="flex space-x-2 w-30 h-full py-2 px-2">
          <button class="update-modal-trigger" order-id="${e}" type="button">
            <i class="update-modal-trigger fa-solid fa-pen-to-square text-primary-700"></i>
            Update
          </button>
          <button class="view-detail-modal-trigger" order-id="${e}" type="button">
          <i class="view-detail-modal-trigger fa-regular fa-eye text-secondary-700"></i>
            View
          </button>
          <button class="delete-modal-trigger" order-id="${e}" type="button">
            <i class="delete-modal-trigger fa-solid fa-delete-left text-red-600"></i>
            Delete
          </button>
         
        </div>
        
        `]});new A("#table-orders",{data:r,columns:[{title:"#ID"},{title:"Customer"},{title:"Total($)"},{title:"Status"},{title:"Payment method"},{title:"Date order"},{title:"Qty (items)"},{title:"Action"}],responsive:!0})}catch(d){console.log(d)}},F=async()=>{b.addEventListener("click",async r=>{if(r.target&&r.target.classList.contains("view-detail-modal-trigger")){const a=r.target.closest("button").getAttribute("order-id");D.click();try{const{order:e,message:i}=await y.getById(a),{_id:l,products:{items:n,totalPrice:s},user:{phone:o,shippingAddress:c,email:u,fullName:x},shippingFee:p,createdAt:g,status:m}=e,w=(s+p).toFixed(2);h.innerHTML="",k(n,h,O),t("orderId",l),t("createdAt",g),t("phone",o),t("email",u),t("fullName",x),t("status",m),t("shippingAddress",c),t("shippingFee",`$${p}`),t("subtotal",`$${s.toFixed(2)}`),t("allTotal",`$${w}`)}catch(e){console.log(e)}}}),[...document.querySelectorAll(".dropdown-action-btn")].forEach(r=>{r.addEventListener("click",async a=>{const e=a.currentTarget.getAttribute("order-id"),i=document.getElementById("viewOrderDetailBtn");if(!i)return;i.addEventListener("click",C=>{});const{order:l,message:n}=await y.getById(e),{_id:s,products:{items:o,totalPrice:c},user:{phone:u,shippingAddress:x,email:p,fullName:g},shippingFee:m,createdAt:w,status:v}=l,f=(c+m).toFixed(2);h.innerHTML="",k(o,h,O),t("orderId",s),t("createdAt",w),t("phone",u),t("email",p),t("fullName",g),t("status",v),t("shippingAddress",x),t("shippingFee",`$${m}`),t("subtotal",`$${c.toFixed(2)}`),t("allTotal",`$${f}`)})})},O=(d,r,a,e,i,l,n)=>`
      <div
      prod-id = ${d}
      class="flex md:flex-row justify-start items-start md:items-center border border-gray-200 w-full">
      <div class="-m-px w-40 md:w-32">
          <img class="hidden md:block"
              src="http://localhost:8080/${a}"
              alt="${r}" />
          <img class="md:hidden"
              src="http://localhost:8080/${a}"
              alt="${r}" />
      </div>
      <div
          class="flex justify-start md:justify-between items-start md:items-center flex-col md:flex-row w-full p-4 md:px-8">
          <div
              class="flex flex-col md:flex-shrink-0 justify-start items-start">
              <h3
                  class="text-lg md:text-xl dark:text-white w-full font-semibold leading-6 md:leading-5 text-gray-800">
                  ${r}</h3>
              <div
                  class="flex flex-row justify-start space-x-4 md:space-x-6 items-start mt-4">
                  <p
                      class="text-sm leading-none dark:text-gray-300 text-gray-600">
                      Brand: <span class="text-gray-800 dark:text-white">
                          ${e}</span></p>
                  <p
                      class="text-sm leading-none dark:text-gray-300 text-gray-600">
                      Quantity: <span class="text-gray-800 dark:text-white">
                          ${i}</span></p>
                  <p
                      class="text-sm leading-none dark:text-gray-300 text-gray-600">
                      Price/item: <span class="text-gray-800 dark:text-white">
                          $${l}</span></p>
            

              </div>
          </div>
          <div class="flex mt-4 md:mt-0 md:justify-end items-center w-full">
              <p
                  class="text-xl dark:text-white lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800">
                  $${n}</p>
          </div>
      </div>
    </div>
    `,H=async()=>{b.addEventListener("click",d=>{if(d.target&&d.target.classList.contains("delete-modal-trigger")){B.click();const r=d.target.closest("button").getAttribute("order-id"),a=d.target.closest("tr");try{document.getElementById("deleteOrderBtn").addEventListener("click",async i=>{const{message:l}=await y.delete(r);B.click(),a==null||a.remove(),M("toast-danger-el",`Deleted Order #${r}`,"1 minutes",l),setTimeout(()=>{location.reload()},2e3)})}catch(e){console.log(e)}}})},V=async()=>{b.addEventListener("click",async d=>{if(d.target&&d.target.classList.contains("update-modal-trigger")){L.click();const r=d.target.closest("button").getAttribute("order-id");try{const{order:a,message:e}=await y.getById(r),{user:{fullName:i,email:l},status:n,_id:s}=a,o=document.getElementById("update-order-form");if(!o)return;const c=o.elements;c.name.value=i,c.email.value=l,c.currStatus.value=n,t("orderFormId",s),o.addEventListener("submit",async u=>{u.preventDefault();const x=document.getElementById("category");console.log("Submitted update order status!!!");const p=u.target.elements.category.value,g=await y.updateOrderStatus({status:p},s);console.log(g),g.order&&location.reload()})}catch(a){console.log(a)}}})};(async()=>(await T(),await F(),await V(),await H()))();
