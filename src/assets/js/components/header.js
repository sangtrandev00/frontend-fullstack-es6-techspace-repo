import { BACKEND_URL } from "../../../constant/backend-domain";

const getHeader = () => {
  return `
    <header class="text-gray-600 body-font relative z-10  mt-14  bg-slate-500 xl:px-20 mx-auto -ms-20 -me-20">
    <div class="md:container mx-auto flex flex-wrap flex-col md:flex-row items-center text-white justify-around max-[700px]:py-4 md:py-2 w-fit max-[1024px]:px-4">
        <a href="./index.html" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 py-2">
            <img src="${BACKEND_URL}/images/tech-main-logo-bright.png" alt="" class="w-20 h-20 rounded-full">
        </a>
        <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center ">
            <a href="./shop.html"
                class=" xl:mr-5 max-[667px]:mx-4 hover:text-gray-900 cursor-pointer bg-gray-100/50 px-4 py-2 rounded-[2px] md:w-[8rem] flex justify-between items-center max-[700px]:my-2 md:mx-2 max-[668px]:w-[10rem] ">Shop
                <i class="fa-solid fa-store"></i></a>
            <a href="./blog-posts.html"
                class=" xl:mr-5 max-[667px]:mx-4 hover:text-gray-900 cursor-pointer bg-gray-100/50 px-4 py-2 rounded-[2px] md:w-[8rem] flex justify-between items-center max-[700px]:my-2 md:mx-2 max-[668px]:w-[10rem]">Blog
                <i class="fa-brands fa-blogger-b"></i></a>
            <a href="./contact.html"
                class=" xl:mr-5 max-[667px]:mx-4 hover:text-gray-900 cursor-pointer bg-gray-100/50 px-4 py-2 rounded-[2px] md:w-[8rem] flex justify-between items-center max-[700px]:my-2 md:mx-2 max-[668px]:w-[10rem]">Contact
                <i class="fa-solid fa-address-book"></i></a>
            <a href="./about.html"
                class=" xl:mr-5 max-[667px]:mx-4 hover:text-gray-900 cursor-pointer bg-gray-100/50 px-4 py-2 rounded-[2px] md:w-[8rem] flex justify-between items-center max-[700px]:my-2 md:mx-2 max-[668px]:w-[10rem]">About
                <i class="fa-solid fa-address-card"></i></a>
        </nav>

        <form class="flex items-center md:me-10" action="./shop.html" method="GET">   
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input type="text" name="_q" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Search" required>
            </div>
        </form>

        <!-- <button onclick="onNavigate()"
    class="me-3 inline-flex items-center bg-gray-200/40 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ">Button
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
        stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
    </svg>
</button> -->

        <a href="./login.html" id="loginHeaderBtn" onclick="onNavigate()"
            class="inline-flex items-center bg-gray-200/40 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ">Login
            <i class="fa-regular fa-user ms-2"></i>
        </a>
    </div>
</header>
    `;
};

export const getTopHeader = () => {
  return `
    <nav class="before:flex-no-wrap fixed z-20 left-0 right-0 top-0 flex items-center justify-between bg-slate-300 text-white py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4 xl:px-20 mx-auto"
    data-te-navbar-ref>

    <div class="flex w-full flex-wrap items-center justify-between px-3 container">
        <!-- Hamburger button for mobile view -->
        <button
            class="block border-0 bg-transparent px-2 text-neutral-800 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button" data-te-collapse-init data-te-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
            <!-- Hamburger icon -->
            <span class="[&>svg]:w-7">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                    class="h-7 w-7">
                    <path fill-rule="evenodd"
                        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                        clip-rule="evenodd" />
                </svg>
            </span>
        </button>

        <!-- Collapsible navigation container -->
        <div class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto justify-between"
            id="navbarSupportedContent1" data-te-collapse-item>

            <!-- Left navigation links -->
            <ul class="list-style-none mr-auto flex flex-col pl-0 lg:flex-row w-full " data-te-navbar-nav-ref>
                <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                    <!-- Dashboard link -->

                    <a class="text-neutral-800 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                        href="phone:0937988510" data-te-nav-link-ref>Phone: 0937988510</a>
                </li>
                <!-- Team link -->

                <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                    <a class="text-neutral-800 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                        href="#" data-te-nav-link-ref>Email: techspace@gmail.com</a>
                </li>
                <li>

                    <a id="userName"  class="text-neutral-800 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    href="#" data-te-nav-link-ref></a>
                </li>
            </ul>
        </div>

        <!-- Right elements -->
        <div class="relative flex items-center">
            <!-- Cart Icon -->
            <a class="relative mr-4 text-neutral-800 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                href="./view-cart.html">
                <span class="[&>svg]:w-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="h-5 w-5">
                        <path
                            d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                </span>

                <span id="numberCartItems" class="absolute -top-4 -right-3 z-10 rounded-full text-red-700 font-medium bg-slate-100 w-6 h-6 text-center">
                12
                </span>

            </a>

            <!-- Container with two dropdown menus -->
            <div class="relative" data-te-dropdown-ref>
                <!-- First dropdown trigger -->
                <a class="hidden-arrow mr-4 flex items-center text-neutral-800 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    href="./wishlist.html">
                    <i class="fa-regular fa-heart"></i>
                </a>
               
            </div>

            <!-- Second dropdown container -->
            <div class="relative" data-te-dropdown-ref>
                <!-- Second dropdown trigger -->
                <a id="userAuthenticate" class="hidden items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                    href="#" role="button" data-te-dropdown-toggle-ref
                    aria-expanded="false">
                    <!-- User avatar -->
                    <img id="userAvatar" src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg" class="rounded-full"
                        style="height: 25px; width: 25px" alt="" loading="lazy" />
                </a>
                <!-- Second dropdown menu -->
                <ul class="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                    aria-labelledby="userAuthenticate" data-te-dropdown-menu-ref>
                    <!-- Second dropdown menu items -->
                    <li>
                        <a class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                            href="#" data-te-dropdown-item-ref>Account</a>
                    </li>
                    <li>
                        <a class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                            href="#" data-te-dropdown-item-ref>History orders</a>
                    </li>
                    <li>
                        <a id="logoutBtn" class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                            href="./logout.html" data-te-dropdown-item-ref>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>
    `;
};

export default getHeader;
