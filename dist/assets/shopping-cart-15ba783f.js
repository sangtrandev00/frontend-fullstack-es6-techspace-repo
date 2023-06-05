import"./axiosClient-bd54c5dc.js";import{m as v,n as p,k as i}from"./helper-06e4e79d.js";document.getElementById("checkout");document.getElementById("chec-div");const l=document.getElementById("view-cart"),u=t=>{const{totalPrice:e,cartLength:c}=p(t);i("cartQty",c),i("summaryTotal",`$${e.toFixed(2)}`),i("totalCost",`$${e.toFixed(2)}`)},x=async()=>{const e=JSON.parse(localStorage.getItem("cart")).cartList;await v(e,l,y);const{totalPrice:c,cartLength:a}=p(e);i("cartQty",a),i("summaryTotal",`$${c.toFixed(2)}`),i("totalCost",`$${c.toFixed(2)}`);const r=`
    <a  href="./shop.html" class="flex font-semibold text-indigo-600 text-sm my-5">

    <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
        <path
            d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
    </svg>
    Continue Shopping
    </a>
  `;l.insertAdjacentHTML("beforeend",r)},y=(t,e,c,a,r,o,n)=>`
    <div prod-id=${t} class="cart-row flex items-center hover:bg-gray-100 -mx-8 px-6 py-3">
        <div class="flex w-2/5">
            <div class="w-20">
                <img class="h-24"
                    src="http://localhost:8080/${c}" alt="${e}">
            </div>
            <div class="flex flex-col justify-between ml-4 flex-grow">
                <a href="./detail-product.html?id=${t}" class="font-bold text-sm">${e}</a>
                <span class="text-red-500 text-xs">${a}</span>
                <a href="#"
                    class="remove-link font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
            </div>
        </div>
        <div class="flex justify-center w-1/5">
            <svg class="descrease-btn fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512">
                <path class="descrease-btn"
                    d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>

            <input class="cart-qty mx-2 border text-center w-12" type="text" value="${r}">

            <svg class="increase-btn fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512">
                <path class="increase-btn"
                    d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
        </div>
        <span class="text-center w-1/5 font-semibold text-sm">$<span class="price-item">${o}</span> </span>
        <span class="text-center w-1/5 font-semibold text-sm">$<span class="total-item">${n}</span></span>
    </div>
    `,f=()=>{l.addEventListener("click",t=>{if(t.target&&t.target.classList.contains("remove-link")){t.preventDefault();const e=t.target.closest(".cart-row"),c=e.getAttribute("prod-id");e.remove();const r=JSON.parse(localStorage.getItem("cart")).cartList.filter(s=>s.prodId!==c),o={cartList:r},{cartLength:n}=p(r);i("numberCartItems",n),u(r),localStorage.setItem("cart",JSON.stringify(o))}})},g=(t,e)=>{const{cartList:c}=JSON.parse(localStorage.getItem("cart")),a=[...c],r=a.findIndex(n=>n.prodId===t);a[r].qty=e;const o={cartList:a};return localStorage.setItem("cart",JSON.stringify(o)),o},h=()=>{l.addEventListener("click",t=>{const e=t.target.closest(".cart-row"),c=e.querySelector(".cart-qty"),a=+e.querySelector(".cart-qty").value;e.querySelector(".price-item");const r=+e.querySelector(".price-item").textContent,o=e.querySelector(".total-item");+e.querySelector(".total-item").textContent;const n=e.getAttribute("prod-id");if(t.target&&t.target.classList.contains("increase-btn")){const s=a+1;c.value=s;const d=g(n,s),m=r*s;o.textContent=m.toFixed(2),u(d.cartList)}if(t.target&&t.target.classList.contains("descrease-btn")){if(a<=1)return;const s=a-1;c.value=s;const d=g(n,s),m=r*s;o.textContent=m.toFixed(2),u(d.cartList)}})},w=async()=>{const t=document.getElementById("checkoutBtn");t&&t.addEventListener("click",()=>{})};(async()=>(await x(),await w(),f(),h()))();
