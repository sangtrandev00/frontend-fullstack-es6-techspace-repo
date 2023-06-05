import"./axiosClient-bd54c5dc.js";import"./main-0ae8c9b5.js";/* empty css                   */import{e as B,g as i,C as L,s as $,a as y,b as M,S as v,c as C,i as _,d as P,f as b,t as q,u as A,h as n}from"./helper-06e4e79d.js";B({Ripple:L});const w=document.getElementById("product-list"),f=document.getElementById("cate-list");document.querySelector(".shop-content__products-display");const T=document.querySelector(".show-result-text__by-cate"),k=document.querySelector(".show-result-text__by-range"),j=document.querySelector(".show-result-text__by-sort");let h;const H=(t,e=t.length,o=1,s=12)=>{w.innerHTML="",t.forEach(r=>{const{_id:l,name:a,thumbnail:d,oldPrice:g,discount:u}=r,c=(g*(1-u/100)).toFixed(2);let p;d?p=d.startsWith("http")?d:`http://localhost:8080/${d}`:p="https://placehold.co/358x358";const m=`
      <div data-id=${l} class="lg:w-1/3 md:w-1/2 p-4 w-full card-product">
        <a href="./detail-product.html?id=${l}"
          class="group relative block overflow-hidden border pt-2 card-product__link">
          <button
              class="card-product__wishlist absolute end-4 top-4 z-4 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
              <span class="sr-only">Wishlist</span>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                  <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
          </button>

          <div>
              <img src="${p}"
                  alt="${a}"
                  class="h-64 w-full transition duration-500 group-hover:scale-105 sm:h-72 xl:px-4 md:px-2" />

          </div>
          <div class="relative border border-gray-100 bg-white p-6">
              <span class="whitespace-nowrap bg-slate-300 px-3 py-1.5 text-xs font-medium">
                  New
              </span>

              <h3 class="mt-4 card-product__title text-lg font-medium text-gray-900">
                  ${a}
              </h3>

              <div class="flex items-center">
                  <p class="mt-1.5 text-xl text-red-500 ">$${c}</p>
                  <p class="mt-1.5 text-sm text-gray-700 ms-2 line-through ">$${g}</p>
              </div>

              <!-- Rating here -->
              <ul class="flex justify-center mt-2">
                  <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                          fill="currentColor" class="mr-1 h-5 w-5 text-warning">
                          <path fill-rule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clip-rule="evenodd" />
                      </svg>
                  </li>
                  <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                          fill="currentColor" class="mr-1 h-5 w-5 text-warning">
                          <path fill-rule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clip-rule="evenodd" />
                      </svg>
                  </li>
                  <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                          fill="currentColor" class="mr-1 h-5 w-5 text-warning">
                          <path fill-rule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clip-rule="evenodd" />
                      </svg>
                  </li>
                  <li>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          stroke-width="1.5" stroke="currentColor"
                          class="mr-1 h-5 w-5 text-warning">
                          <path stroke-linecap="round" stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                  </li>
                  <li>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          stroke-width="1.5" stroke="currentColor"
                          class="mr-1 h-5 w-5 text-warning">
                          <path stroke-linecap="round" stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                  </li>
              </ul>

              <form class="mt-4">
                  <button
                      class="add-to-cart block w-full rounded bg-slate-300 p-4 text-sm font-medium transition hover:scale-105">
                      Add to Cart
                  </button>
              </form>
          </div>
      </a>
    </div>
  `;w.insertAdjacentHTML("beforeend",m)}),F(o,e,s)},x=async()=>{if(!w)return;const t=i("_q"),e=+(i("_limit")||12),o=+(i("_page")||1),s=i("_sort"),r=i("_order"),l=i("_min"),a=i("_max"),d=i("_cateIds"),g=document.getElementById("show-result-text"),u=document.getElementById("keyword");try{const c={_limit:e,_page:o};s&&(c._sort=s,c._order=r,$(j,h)),t&&(c._q=t,g.classList.remove("hidden"),u.innerText=t),l&&(c._min=l,y(k,l,a)),a&&(c._max=a,y(k,l,a)),d&&(c._cateIds=d,M(T,d)),console.log("query: ",c);const{products:p,pagination:{_totalRows:m},message:U}=await v.getProducts(c);H(p,m,o,e)}catch(c){console.log(c)}},R=async()=>{const{message:t,categories:e}=await C.getAll(),o=` <a href="#"
  class="flex items-center text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline">
  View all
</a>`;e.forEach(d=>{const{_id:g,name:u,cateImage:c,description:p}=d,m=`
    <div data-id=${g} class="flex items-center cate-item">
      <input id="${g}" type="checkbox" value=""
          class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:bg-slate-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

      <label for="${g}" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
         ${u}
      </label>
    </div>
  `;f.insertAdjacentHTML("beforeend",m)}),f.insertAdjacentHTML("beforeend",o);const{result:[{_id:s,minFieldValue:r}]}=await v.getMinPrice(),{result:[{_id:l,maxFieldValue:a}]}=await v.getMaxPrice();_("price-from",r),_("price-to",a)},S=async()=>{w.addEventListener("click",t=>{if(t.preventDefault(),t.target&&t.target.classList.contains("add-to-cart")){const o=t.target.closest(".card-product").dataset.id;P(o,1),b("modalIcon",`
        <i class="fa-solid fa-cart-plus text-xl text-sky-600"></i>
      `),b("modalTitle","Add Product to cart successfully!"),q("toggleModalBtn")}})},V=()=>{w.addEventListener("click",async t=>{if(t.target&&t.target.nodeName==="IMG"){const e=t.target.closest(".card-product").dataset.id;A(e),location.href=`./detail-product.html?id=${e}`}})},N=async()=>{const t=document.getElementById("shop-content__filter-bar"),e=document.getElementById("apply-filter-btn");t&&e.addEventListener("click",o=>{const s=document.getElementById("price-from").value,r=document.getElementById("price-to").value;n("_min",s),n("_max",r),x()})},z=async()=>{document.querySelectorAll(".cate-item input"),f.addEventListener("click",async t=>{var e;if(t.target&&t.target.nodeName==="INPUT"){const o=t.target.checked;console.log("is checked: ",o);const s=t.target.id,r=(e=i("_cateIds"))==null?void 0:e.split(",");console.log(r);let l;r&&r.length>0?(o?l=[...i("_cateIds").split(","),s].join(","):l=i("_cateIds").split(",").filter(a=>a!==s),console.log(l),n("_cateIds",l)):(n("_cateIds",s),l=s),await x()}})},D=async()=>{const t=document.getElementById("searchInput"),e=document.getElementById("search-btn");t&&e.addEventListener("click",async o=>{console.log("click search",t.value);const s=t.value;n("_q",s),location.href=`./shop.html?_q=${s}`,t.value=""})},F=(t,e,o)=>{const s=Math.ceil(e/o);console.log("total pages: ",s),console.log("current page: ",t),console.log("total products: ",e),console.log("limit: ",o);let r='<nav aria-label="Page navigation example" class="py-8"><ul id="paginationEl" class="list-style-none flex justify-center">';t>1?r+=`<li><a class="border-2 border-slate-300 relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white" data-page=${t-1} href="?_page=${t-1}">Previous</a></li>`:r+='<li><a class="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400">Previous</a></li>';for(let a=1;a<=s;a++)a===t?r+=`<li aria-current="page"><a class="border-2 border-slate-300 relative block rounded bg-slate-600-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300" data-page=${a} href="?_page=${a}">${a}<span class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">(current)</span></a></li>`:r+=`<li><a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white" data-page=${a} href="?_page=${a}">${a}</a></li>`;t<s?r+=`<li><a class="border-2 border-slate-300 relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white" data-page=${t+1} href="?_page=${t+1}">Next</a></li>`:r+='<li><a class="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400">Next</a></li>',r+="</ul></nav>";const l=document.getElementById("pagination");l.innerHTML=r},G=()=>{const t=document.getElementById("paginationEl");t&&t.addEventListener("click",async e=>{if(e.preventDefault(),console.log("click"),e.target&&e.target.nodeName==="A"){console.log(e.target.dataset.page);const o=+e.target.dataset.page;n("_page",o),x()}})},O=()=>{const t=document.getElementById("sortBarEl");t&&t.addEventListener("click",async e=>{if(e.target&&e.target.nodeName==="A"){switch(e.target.dataset.sort){case"pricedesc":n("_sort","oldPrice"),n("_order","desc"),h="Price descrease";break;case"priceasc":n("_sort","oldPrice"),n("_order","asc"),h="Price ascending";break;case"oldest":n("_sort","createdAt"),n("_order","asc"),h="Oldest products";break;case"latest":n("_sort","createdAt"),n("_order","desc"),h="Latest products";break}await x()}})};(async()=>(await x(),await R(),await N(),await z(),await D(),await S(),G(),O(),V()))();var E;console.log((E=i("_cateIds"))==null?void 0:E.split(","));var I;console.log([...(I=i("_cateIds"))==null?void 0:I.split(","),"dfsdjfksdlfjdskl"].join(","));document.addEventListener("DOMContentLoaded",t=>{console.log(t),console.log("ahihi")});
