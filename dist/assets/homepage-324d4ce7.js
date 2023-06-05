import{g,S as p,h as u,c as y,d as h,f as m,t as b,u as v}from"./helper-06e4e79d.js";import"./axiosClient-bd54c5dc.js";const o=document.getElementById("show-product"),w=document.getElementById("nextBtn"),k=document.getElementById("prevBtn"),E=document.getElementById("show-result-products"),$=async()=>{const e=document.getElementById("catalog-section"),t=document.querySelector("#slider");if(!e)return;const{categories:s}=await y.getAll();t.innerHTML="",s.forEach((a,l)=>{const{cateImage:r,name:i,_id:c}=a,d=`
        <div class="flex flex-shrink-0 relative w-1/4 sm:w-auto">
                            <img src="http://localhost:8080/${r}"
                                alt="black chair and white table" class="object-cover object-center w-[358px] h-[358px]"/>
                            <div class="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                                <h2 class="lg:text-xl leading-4 text-base lg:leading-5 text-white dark:text-gray-900">
                                    Catalog ${l+1}</h2>
                                <div class="flex h-full items-end pb-6">
                                    <a href="./shop.html?_cateIds=${c}"
                                        class="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white dark:text-gray-900">
                                       ${i}</a>
                                </div>
                            </div>
                        </div>

    `;t.insertAdjacentHTML("beforeend",d)})},n=async e=>{const{products:t}=await p.getProducts(e);E.innerText=`Showing ${t.length} products`,o.innerHTML="",o&&t.forEach(s=>{const{thumbnail:a,name:l,_id:r,oldPrice:i,discount:c}=s,d=i*c,x=a.startsWith("http")?a:`http://localhost:8080/${a}`,f=`
      <div data-id=${r} class="product-item relative mb-10">
      <div class="absolute z-10 top-0 left-0 py-2 px-4 bg-slate-300 bg-opacity-50 rounded-[10px]">
          <p class="text-xs leading-3 text-gray-800">New</p>
      </div>
      <div class="relative group">
          <div
              class="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full">
          </div>
          <img class="w-full"
              src="${x}"
              alt="${l}" />
          <div class="absolute bottom-0 p-8 w-full opacity-0 group-hover:opacity-100">
              <button
                  class="add-to-cart dark:bg-gray-800 dark:text-gray-300 font-medium text-base leading-4 text-gray-800 bg-white py-3 w-full">Add to cart</button>
              <button
                  class="bg-transparent font-medium text-base leading-4 border-2 border-white py-3 w-full mt-2 text-white">Quick
                  View</button>
          </div>
      </div>
      <p class="font-normal dark:text-white text-xl leading-5 text-gray-800 md:mt-6 mt-4">${l}</p>
      <div class="flex">
          <p class="font-semibold dark:text-gray-300 text-xl leading-5 text-red-700 mt-4">$${d}</p>
          <p
              class="font-semibold dark:text-gray-300 text-lg leading-5 text-gray-800 mt-4 ms-4 line-through">
              $${i}
          </p>

      </div>

      <a href="detail-product.html?id=${r}"
          class="detail-product inline-block font-normal dark:text-gray-300 text-base leading-4 text-gray-600 mt-4 border border-slate-400 p-4">Xem
          ngay</a>
    </div>
    `;o.insertAdjacentHTML("beforeend",f)})},P=async()=>{o.addEventListener("click",e=>{if(e.target&&e.target.classList.contains("add-to-cart")){e.target;const s=e.target.closest(".product-item").dataset.id;h(s,1),m("modalIcon",`
        <i class="fa-solid fa-cart-plus text-xl text-sky-600"></i>
      `),m("modalTitle","Add Product to cart successfully!"),b("toggleModalBtn")}})},_=async()=>{o.addEventListener("click",async e=>{if(e.preventDefault(),console.log("clicked: ",e.target),e.target&&e.target.classList.contains("detail-product")){const t=e.target.closest(".product-item").dataset.id;v(t),location.href=`./detail-product.html?id=${t}`}})};(async()=>(await $(),await n({_limit:12,_page:1}),await P(),await _(),(()=>{let t=0;function s(){t=t-398;var l=document.getElementById("slider");Math.abs(t)>=l.scrollWidth/1.7&&(t=0),l.style.transform="translateX("+t+"px)"}next.addEventListener("click",s);function a(){var l=document.getElementById("slider");Math.abs(t)===0?t=0:t=t+398,l.style.transform="translateX("+t+"px)"}prev.addEventListener("click",a)})(),w.addEventListener("click",async()=>{const t=+(g("_page")||1),{pagination:{_totalRows:s}}=await p.getProducts({_limit:12}),a=Math.ceil(s/12);t>=a||(u("_page",t+1),await n({_page:t+1,_limit:12}))}),k.addEventListener("click",async()=>{const t=+(g("_page")||1);t!==1&&(u("_page",t-1),await n({_page:t-1,_limit:12}))})))();
