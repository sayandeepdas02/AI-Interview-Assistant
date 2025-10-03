import React from "react";

export default function Navbar() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          {/* Logo */}
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                alt="AI Interview Assistant Logo"
                className="h-8 w-auto"
              />
              <span className="font-bold text-indigo-600">Interview AI</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              command="show-modal"
              commandfor="mobile-menu"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className="size-6"
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#features" className="text-sm font-semibold text-gray-900">
              Features
            </a>
            <a href="#faq" className="text-sm font-semibold text-gray-900">
              FAQs
            </a>
            <a href="#testimonials" className="text-sm font-semibold text-gray-900">
              Testimonials
            </a>
            <a href="#contact" className="text-sm font-semibold text-gray-900">
              Contact
            </a>
          </div>

          {/* Login / CTA */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="/interviewer" className="text-sm font-semibold text-gray-900">
              Get Started <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>

        {/* Mobile menu */}
        <el-dialog>
          <dialog id="mobile-menu" className="backdrop:bg-transparent lg:hidden">
            <div tabIndex="0" className="fixed inset-0 focus:outline-none">
              <el-dialog-panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                    <img
                      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                      alt="AI Interview Assistant Logo"
                      className="h-8 w-auto"
                    />
                    <span className="font-bold text-indigo-600">InterviewAI</span>
                  </a>
                  <button
                    type="button"
                    command="close"
                    commandfor="mobile-menu"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                      className="size-6"
                    >
                      <path
                        d="M6 18 18 6M6 6l12 12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="space-y-2 py-6">
                      <a
                        href="#features"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Features
                      </a>
                      <a
                        href="#dashboard"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        FAQs
                      </a>
                      <a
                        href="#faq"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Testimonials
                      </a>
                      <a
                        href="#testimonial"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        Contact
                      </a>
                    </div>
                    <div className="contact">
                      <a
                        href="/interviewee"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-indigo-600 hover:bg-gray-50"
                      >
                        Start Interview →
                      </a>
                    </div>
                  </div>
                </div>
              </el-dialog-panel>
            </div>
          </dialog>
        </el-dialog>
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Smarter AI-powered interviews
            </h1>
            <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
              Upload resumes, generate tailored questions, and let AI evaluate answers.  
              Save time, reduce bias, and make hiring effortless.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/interviewer"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
              >
                Start Interview
              </a>
              <a href="#features" className="text-sm font-semibold text-gray-900">
                Demo Video <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
