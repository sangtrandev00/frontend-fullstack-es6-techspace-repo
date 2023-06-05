import"./axiosClient-bd54c5dc.js";import"./main-0ae8c9b5.js";/* empty css                   */import{e as E,d as m,j as T,P as v,k as a,f as l,l as u,t as P}from"./helper-06e4e79d.js";E({Tab:T});const x=new URL(location.href),B=x.searchParams,i=B.get("id"),s=document.getElementById("small-thumbnails",`${name}`);console.log(s);const I=async()=>{if(!i)return;const{product:t}=await v.getById(i),{_id:o,thumbnail:e,images:r,name:h,oldPrice:d,discount:g,shortDesc:p,fullDesc:f,stockQty:y,views:w}=t,b=d*(1-g/100);let n;e?n=e.startsWith("http")?e:`http://localhost:8080/${e}`:n="https://placehold.co/358x358",a("product-title",h),a("oldPrice",`$${d}`),a("newPrice",`$${b.toFixed(2)}`),a("stockQty",`${y}`),l("shortDesc",`${p}`),l("tabs-description",`${f}`),a("views",w||0),u("thumbnail",`${n}`),s&&(s.innerHTML="",r.split(", ").forEach(c=>{const $=`
        <div class="swiper-slide cursor-pointer">
          <img alt="Error image"
              src="${c.startsWith("http")?c:`http://localhost:8080/${c}`}"
              class="aspect-square w-full rounded-xl object-cover" />
      </div>
    `;s.insertAdjacentHTML("beforeend",$)}))},k=async()=>{const t=document.getElementById("addToCartBtn");t&&t.addEventListener("click",o=>{o.preventDefault();const r=document.getElementById("Quantity").value;m(i,+r),l("modalIcon",`
          <i class="fa-solid fa-cart-plus text-xl text-sky-600"></i>
        `),l("modalTitle","Add Product to cart successfully!"),P("toggleModalBtn")})},C=async()=>{s.addEventListener("click",t=>{if(t.target&&t.target.nodeName==="IMG"){const o=t.target.getAttribute("src");u("thumbnail",o)}})};(async()=>(await I(),await m(),await k(),await C()))();
