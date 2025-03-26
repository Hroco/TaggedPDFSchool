/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import attributes from "~/assets/attributesDB.json";
import properties from "~/assets/propertiesDB.json";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import tags from "~/assets/taggsDB";

const searchAttr = attributes.map((attr) => attr.name);
const searchTags = tags.map((tag) => tag.name);
const searchProperties = properties.map((prop) => prop.name);
const searchItems = [...searchAttr, ...searchTags, ...searchProperties];

export const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "f") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown as any);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = searchItems
        .filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
        //sort by string lenght
        .sort((a, b) => a.length - b.length)
        .slice(0, 10);
      setSearchResults(results);
      setIsDropdownVisible(true);
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  }, [searchTerm]);

  const highlightMatch = (text: string) => {
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={index} className="bg-primary text-gray-900">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </span>
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      const result = searchResults[selectedIndex];
      if (!result) return;
      let url = "/";
      //find result in attributes
      const attr = attributes.find((attr) => attr.name === result);
      if (attr) {
        url = `/attributes/${attr.name}`;
      }
      //find result in tags
      const tag = tags.find((tag) => tag.name === result);
      if (tag) {
        url = `/tags/${tag.name}`;
      }
      //find result in properties
      const prop = properties.find((prop) => prop.name === result);
      if (prop) {
        url = `/properties/${prop.name}`;
      }
      setSearchTerm("");
      setIsDropdownVisible(false);
      router.push(url);
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      setIsDropdownVisible(false);
      inputRef.current?.blur();
    }
  };

  return (
    <header className="sticky top-0 z-50 mx-auto flex flex-col-reverse items-center justify-between space-y-2 border-b border-gray-800 bg-gray-900/95 px-4 py-3 pl-5 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75 md:flex-row md:space-y-0">
      <h1 className="hidden text-2xl font-bold text-primary sm:block">
        Tagged PDF School
      </h1>
      <div className="relative mt-2 w-full sm:mt-0 sm:w-64" ref={searchRef}>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-md bg-gray-800 px-4 py-2 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        </div>
        {isDropdownVisible && searchResults.length > 0 && (
          <div className="absolute w-full">
            <ScrollArea className="mt-1 w-full rounded-md bg-gray-800 shadow-lg">
              <ul className="max-h-60 w-full py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5">
                {searchResults.map((result, index) => {
                  let url = "/";
                  let badgeValue = "";
                  //find result in attributes
                  const attr = attributes.find((attr) => attr.name === result);
                  if (attr) {
                    url = `/attributes/${attr.name}`;
                    badgeValue = "Attribute";
                  }
                  //find result in tags
                  const tag = tags.find((tag) => tag.name === result);
                  if (tag) {
                    url = `/tags/${tag.name}`;
                    badgeValue = "Tag";
                  }
                  //find result in properties
                  const prop = properties.find((prop) => prop.name === result);
                  if (prop) {
                    url = `/properties/${prop.name}`;
                    badgeValue = "Property";
                  }

                  console.log(url);

                  return (
                    <li
                      key={index}
                      className={`cursor-pointer px-4 py-2 text-white ${
                        index === selectedIndex
                          ? "bg-gray-700"
                          : "hover:bg-gray-700"
                      }`}
                      onClick={() => {
                        setSearchTerm("");
                        setIsDropdownVisible(false);
                        router.push(url);
                        inputRef.current?.blur();
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <p>{highlightMatch(result)}</p>
                        <Badge variant="secondary" className="">
                          {badgeValue}
                        </Badge>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </ScrollArea>
          </div>
        )}
      </div>
      <nav className="flex items-center space-x-4">
        <Link href="/" className="transition-colors hover:text-primary">
          Home
        </Link>
        <Link href="/tags" className="transition-colors hover:text-primary">
          Tags
        </Link>
        <Link
          href="/properties"
          className="transition-colors hover:text-primary"
        >
          Properties
        </Link>
        <Link
          href="/attributes"
          className="transition-colors hover:text-primary"
        >
          Attributes
        </Link>
        <Link
          href="/matterhorn"
          className="transition-colors hover:text-primary"
        >
          Matterhorn
        </Link>
        <Link
          href="/playground"
          className="transition-colors hover:text-primary"
        >
          Playground
        </Link>
        <Link href="/about" className="transition-colors hover:text-primary">
          About
        </Link>
      </nav>
    </header>
  );
};
