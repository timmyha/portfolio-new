import styled from "styled-components";
import { useSnapshot } from "valtio";
import { store } from "./store";
import { useRef, ChangeEvent, FormEvent } from "react";
import parse, { Element } from "html-react-parser";
import "./terminal.css";
import Modal from "./components/Modal";
import { Nyc } from "./assets/Nyc";

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const snap = useSnapshot(store);

  const terminal = snap.terminal.map((line) => {
    return (
      <span className="terminal" key={line}>
        {parse(line, {
          replace: (domNode) => {
            const domElement: Element = domNode as Element;
            if (domElement.attribs && domElement.attribs.id === "nyc") {
              return <Modal link="New York City???" content={<Nyc />} />;
            }
          },
        })}
      </span>
    );
  });

  const onPromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    store.prompt = e.target.value;
  };

  enum Commands {
    ABOUT = "about",
    PORTFOLIO = "portfolio",
    GAME = "game",
    CLEAR = "clear",
  }

  const enumMatch = Object.values(Commands).includes(store.prompt as Commands);

  const enterCommand = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.terminal.push("<span>&gt;&nbsp;</span>" + store.prompt);
    if (store.prompt === Commands.CLEAR) store.terminal = [];
    if (store.prompt === Commands.ABOUT) {
      store.terminal.push(
        `&nbsp;&nbsp;Timothy Hansher is a software engineer based in<a id="nyc" href="#">New York City</a>.`
      );
    }
    if (store.prompt === Commands.PORTFOLIO) {
      store.terminal.push("Here are a few projects I've been working on:");
      store.terminal.push('&nbsp;&nbsp;&nbsp;<a href="#">screenburn</a>');
      store.terminal.push('&nbsp;&nbsp;&nbsp;<a href="#">crashpad</a>');
    }
    if (store.prompt === Commands.GAME) {
      store.terminal.push("You're in a dark alleyway..");
    }
    if (!enumMatch) store.terminal.push(`Command not found: ${store.prompt}`);
    store.prompt = "";
  };

  return (
    <>
      <Container onClick={() => inputRef.current?.focus()}>
        <Terminal>{terminal}</Terminal>
        <form onSubmit={(e) => enterCommand(e)}>
          <CommandLine>
            <CommandArrow>&gt;</CommandArrow>
            <CommandPrompt
              ref={inputRef}
              value={snap.prompt}
              onChange={(e) => onPromptChange(e)}
              placeholder="Please enter a command"
              autoFocus
            />
          </CommandLine>
        </form>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-beginning;
  height: 100vh;
  background-color: #1f242c;
  color: #f0f0f0;
  font-family: BlexMono Nerd Font;
`;

const CommandLine = styled.div`
  display: flex;
  flex-direction: row;
`;

const CommandArrow = styled.span`
  display: flex;
  padding-left: 10px;
  color: #86f0d1;
  margin-top: 2px;
  font-family: IBM Plex Mono;
  font-weight: 700;
`;

const CommandPrompt = styled.input`
  display: flex;
  width: 80vw;
  background-color: transparent;
  outline: 0px;
  border: 0px;
  background-color: #1f242c;
  color: #f0f0f0;
  font-family: BlexMono Nerd Font;
  font-size: 1rem;
  padding-left: 10px;
  padding-top: 5px;
  z-index: 100;
`;

const Terminal = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;
