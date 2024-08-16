"use client";

import { api } from "@/libs/axios";
import { FormEvent, useState } from "react";

interface CsrfTestsProps {
  changeText: (text: string) => void;
}

export function CsrfTests({ changeText }: CsrfTestsProps) {
  const [cookie, setCookie] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    const { data } = await api.post("/contact", {
      message,
    });

    setMessage("");
    setCookie(document.cookie);
    changeText(data);
  }

  async function handleAnimalSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    let text = "";
    try {
      const { data } = await api.post("/animals", {
        name,
      });

      text = "animal crated with name: " + data.name;
    } catch (e) {
      text = "error";
    } finally {
      setName("");
      setCookie(document.cookie);
      changeText(text);
    }
  }

  function handleCookieReset() {
    var Cookies = document.cookie.split(";");
    for (var i = 0; i < Cookies.length; i++) {
      console.log(Cookies);
      document.cookie = Cookies[i] + "=; expires=" + new Date(0).toUTCString();
    }
    setCookie(document.cookie);
  }

  return (
    <div className="flex flex-col border rounded-md py-3 px-4 gap-4">
      <div className="flex flex-row justify-between items-center">
        <h2>
          CSRF TESTS:{" "}
          {cookie ? (
            <span className="text-green-700">COOKIE SETADO</span>
          ) : (
            <span className="text-red-700">SEM COOKIE</span>
          )}
        </h2>
        {cookie && (
          <button
            onClick={handleCookieReset}
            className="py-2 px-4 bg-red-400 rounded-md hover:bg-red-500"
          >
            RESET COOKIES
          </button>
        )}
      </div>
      <div className="flex flex-row gap-2">
        <form
          onSubmit={handleContactSubmit}
          className="flex flex-col border px-2 py-4 rounded-md gap-4"
        >
          <h3>CONTACT FORM (NOT PROTECTED)</h3>
          <div className="flex flex-col">
            <label htmlFor="message">contact message</label>
            <input
              onChange={(event) => setMessage(event.target.value)}
              type="text"
              name="message"
              id="message"
              placeholder="message here"
              className="border rounded-md text-base px-2 py-1"
              value={message}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-300 hover:bg-blue-400 rounded-md py-2 px-4 self-center"
          >
            Enviar
          </button>
        </form>
        <form
          onSubmit={handleAnimalSubmit}
          className="flex flex-col border px-2 py-4 rounded-md gap-4"
        >
          <h3>ANIMAL FORM (PROTECTED)</h3>
          <div className="flex flex-col">
            <label htmlFor="name">animal name</label>
            <input
              onChange={(event) => setName(event.target.value)}
              type="text"
              name="name"
              id="name"
              placeholder="name here"
              className="border rounded-md text-base px-2 py-1"
              value={name}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-300 hover:bg-blue-400 rounded-md py-2 px-4 self-center"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
