import React from "react";

export default function Testimonial() {
  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
      {/* Background accents */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-100),white)] opacity-20"></div>
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>

      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        {/* Logo */}
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/workcation-logo-indigo-600.svg"
          alt="Swipe Logo"
          className="mx-auto h-12"
        />

        <figure className="mt-10">
          {/* Testimonial text */}
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              “Swipe’s AI Interview Assistant completely transformed how we
              conduct technical interviews. Candidates love the real-time
              feedback, and our hiring team saves hours each week. It feels like
              the future of recruitment.”
            </p>
          </blockquote>

          {/* Person info */}
          <figcaption className="mt-10">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User"
              className="mx-auto h-10 w-10 rounded-full"
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="font-semibold text-gray-900">Sarah Johnson</div>
              <svg
                viewBox="0 0 2 2"
                width="3"
                height="3"
                aria-hidden="true"
                className="fill-gray-900"
              >
                <circle r="1" cx="1" cy="1" />
              </svg>
              <div className="text-gray-600">Talent Lead at TechNova</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
