"use client";
import Image from "next/image";
import { useState } from "react";
import FolderTab from "../components/FolderTab";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  details: React.ReactNode;
}

const projects: Project[] = [
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
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = (title: string): void => {
    if (activeTab === title) {
      setActiveTab(null); // Close if clicking the same tab
    } else {
      setActiveTab(title); // Open the new tab
    }
  };
  return (
    <>
      <div>
        <header className="fixed top-0 left-0 right-0 bg-opacity-50 backdrop-blur-md p-1 flex justify-center space-x-8 font-header transition-all duration-300 z-10">
          <a href="#projects" className=" text-blue hover:underline">
            <Button size={"lg"} variant={"outline"}>
              Projects
            </Button>
          </a>
          <a href="#about" className="hover:underline">
            <Button size={"lg"} variant={"outline"}>
              About
            </Button>
          </a>
          <a href="#contact" className="hover:underline">
            <Button size={"lg"} variant={"outline"}>
              Contact
            </Button>
          </a>
        </header>

        <main className="pt-24 px-4 max-w-7xl mx-auto">
          <section id="projects">
            <h2 className="text-3xl mb-4 font-header">Projects</h2>
            <div className="shelf p-4 rounded-md outline-black outline-4">
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
              <p className="text-center p-2 max-w-xl bg-white bg-opacity-55 rounded-3xl">
                Current computer programming student with practical experience
                in front-end development using React, Python, and Java. I enjoy
                solving real problems and take pride in building things from the
                ground up. Quick to learn, focused on efficiency, and most
                motivated when tackling challenges I genuinely care about.
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
    </>
  );
}
