import React from "react";

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section header */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold text-indigo-600">Smarter Hiring</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Everything you need for AI-powered interviews
          </p>
          <p className="mt-6 text-lg text-gray-700">
            Automate interviews, evaluate candidates fairly, and save hours of manual screening.  
            Our platform makes the entire interview process faster, smarter, and more reliable.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            
            {/* Feature 1 */}
            <div className="relative pl-16">
              <dt className="text-base font-semibold text-gray-900">
                <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                  {/* Icon */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="size-6 text-white"
                  >
                    <path
                      d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                AI-Generated Questions
              </dt>
              <dd className="mt-2 text-base text-gray-600">
                Automatically generate technical questions tailored to each candidate’s resume and role, ensuring personalized and relevant interviews every time.
              </dd>
            </div>

            {/* Feature 2 */}
            <div className="relative pl-16">
              <dt className="text-base font-semibold text-gray-900">
                <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="size-6 text-white"
                  >
                    <path
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                Automated Scoring
              </dt>
              <dd className="mt-2 text-base text-gray-600">
                Every answer is instantly scored and summarized by AI, giving interviewers clear insights and helping reduce human bias.
              </dd>
            </div>

            {/* Feature 3 */}
            <div className="relative pl-16">
              <dt className="text-base font-semibold text-gray-900">
                <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="size-6 text-white"
                  >
                    <path
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                Resume Parsing
              </dt>
              <dd className="mt-2 text-base text-gray-600">
                Upload resumes in PDF/DOCX and automatically extract key details like name, email, and phone before starting the interview.
              </dd>
            </div>

            {/* Feature 4 */}
            <div className="relative pl-16">
              <dt className="text-base font-semibold text-gray-900">
                <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="size-6 text-white"
                  >
                    <path
                      d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                Dashboard & Analytics
              </dt>
              <dd className="mt-2 text-base text-gray-600">
                Interviewer dashboard with candidate list, scores, and summaries — plus search & sort to speed up hiring decisions.
              </dd>
            </div>

          </dl>
        </div>
      </div>
    </div>
  );
}
