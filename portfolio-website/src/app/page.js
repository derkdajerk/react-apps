"use client";
import { useState } from "react";
import FolderTab from "../components/FolderTab";
import Image from "next/image";

const projects = [
  {
    title: "ClassConnect",
    details: (
      <div>
        <p>
          <strong>Tech Stack:</strong> React, Supabase, Python, Selenium,
          Tailwind CSS
        </p>
        <p>
          <strong>Date:</strong> April 2025
        </p>
        <p>
          Aggregates 400+ fitness class schedules with real-time search and
          personalized filters.
        </p>
        <a href="#" className="text-blue-600 underline">
          GitHub
        </a>
      </div>
    ),
  },
  {
    title: "Movie App Tutorial",
    details: (
      <div>
        <p>
          <strong>Tech Stack:</strong> JavaScript, HTML, CSS
        </p>
        <p>
          <strong>Date:</strong> Placeholder
        </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <a href="#" className="text-blue-600 underline">
          GitHub
        </a>
      </div>
    ),
  },
  {
    title: "Static Bookkeeping Site",
    details: (
      <div>
        <p>
          <strong>Tech Stack:</strong> Next.js, Tailwind CSS
        </p>
        <p>
          <strong>Date:</strong> Placeholder
        </p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        <a href="#" className="text-blue-600 underline">
          GitHub
        </a>
      </div>
    ),
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (title) => {
    if (activeTab === title) {
      setActiveTab(null); // Close if clicking the same tab
    } else {
      setActiveTab(title); // Open the new tab
    }
  };

  return (
    <div>
      <header className="fixed top-0 left-0 w-full bg-re bg-red-500 bg-opacity-50 backdrop-blur-md p-4 flex justify-center space-x-8 font-header transition-all duration-300 z-10">
        <a href="#projects" className=" text-blue hover:underline">
          Projectsasd
        </a>
        <a href="#about" className="hover:underline">
          About
        </a>
        <a href="#contact" className="hover:underline">
          Contact
        </a>
      </header>

      <main className="pt-24 px-4 max-w-7xl mx-auto">
        <section id="projects">
          <h2 className="text-3xl mb-4 font-header">Projects</h2>
          <div className="shelf p-4 rounded-md">
            <div className="relative">
              <div className="flex flex-row space-x-[-5px]">
                {projects.map((p) => (
                  <FolderTab
                    key={p.title}
                    title={p.title}
                    details={p.details}
                    isActive={activeTab === p.title}
                    onSelect={() => handleTabClick(p.title)}
                  />
                ))}
              </div>
              <div className="mt-0 relative">
                {activeTab && (
                  <div className="bg-white p-4 rounded-b-md shadow w-full">
                    {projects.find((p) => p.title === activeTab)?.details}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="mt-12">
          <h2 className="text-3xl mb-4 font-header">About Me</h2>
          <div className="flex items-center space-x-4">
            <Image
              src="/placeholder.svg"
              width={20}
              height={20}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <p className="max-w-xl bg-red-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </div>
        </section>

        <section id="contact" className="mt-12 mb-12">
          <h2 className="text-3xl mb-4 font-header">Contact</h2>
          <ul className="space-y-2">
            <li>
              <a href="/resume.pdf" download className="underline">
                Download Resume
              </a>
            </li>
            <li>
              <a href="#" className="underline">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="underline">
                GitHub
              </a>
            </li>
            <li>
              <a href="mailto:you@example.com" className="underline">
                you@example.com
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
