import { useState } from "react";
import "./App.css";
import ImageGallery from "./ImageGallery/ImageGallery";
import clsx from "clsx";
import { css } from "@emotion/css";
import UserForm from "./UserForm/UserForm";

const tabClassname = css`
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  color: grey;
  cursor: pointer;
`;

const activeTabClassname = css`
  color: black;
  border-bottom-color: black;
`;

type Tab = "gallery" | "form";

export default function App() {
  const [tab, setTab] = useState<Tab>("gallery");

  return (
    <div className="app">
      <header>
        <h1>Motorway UI</h1>
        <nav className="tabs">
          <button
            className={clsx(tabClassname, {
              [activeTabClassname]: tab === "gallery",
            })}
            onClick={() => setTab("gallery")}
          >
            Image Gallery
          </button>
          <button
            className={clsx(tabClassname, {
              [activeTabClassname]: tab === "form",
            })}
            onClick={() => setTab("form")}
          >
            User Form
          </button>
        </nav>
      </header>

      <main>{tab === "gallery" ? <ImageGallery /> : <UserForm />}</main>
    </div>
  );
}
