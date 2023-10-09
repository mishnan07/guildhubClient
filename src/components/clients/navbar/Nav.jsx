import React from 'react';

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white shadow-lg py-2 text-gray-800 dark:bg-neutral-600">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-4">
          <div>
            <a href="/" className="flex items-center text-gray-800 dark:text-neutral-200 hover:text-gray-900">
              <img
                src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                alt="TE Logo"
                className="w-6 h-6 mr-2"
              />
              GuildHub
            </a>
          </div>
          <button
            className="block lg:hidden text-gray-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            type="button"
            data-te-collapse-init
            data-te-target="#navbarSupportedContent4"
            aria-controls="navbarSupportedContent4"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div
            className="hidden lg:flex lg:items-center"
            id="navbarSupportedContent4"
            data-te-collapse-item
          >
            <ul className="list-none lg:flex space-x-4">
              <li className="my-4 lg:my-0">
                <a
                  href="#"
                  className="text-gray-800 dark:text-neutral-200 hover:text-gray-900"
                  aria-current="page"
                >
                  Dashboard
                </a>
              </li>
            </ul>
            <div className="flex items-center space-x-4 ml-4">
              <button
                type="button"
                className="px-3 py-2 text-xs font-medium text-white uppercase bg-primary border rounded hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-600 active:bg-primary-700"
              >
                Login
              </button>
              <button
                type="button"
                className="px-3 py-2 text-xs font-medium text-white uppercase bg-primary border rounded hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-600 active:bg-primary-700"
              >
                Sign up for free
              </button>
              <button
                type="button"
                className="px-2.5 py-2.5 text-xs font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-900 active:bg-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
