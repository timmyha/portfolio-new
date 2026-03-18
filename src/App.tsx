import styled from "styled-components";
import { useSnapshot } from "valtio";
import { store } from "./store";
import { useRef, ChangeEvent, FormEvent, useState } from "react";
import parse, { Element } from "html-react-parser";
import "./terminal.css";
import Modal from "./components/Modal";
import { Video } from "./assets/Video";
import { nanoid } from "nanoid";
import DialogModal from "./components/DialogModal";
import resumePdf from "./assets/timothyresume.pdf";

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const snap = useSnapshot(store);
  const [resumeOpen, setResumeOpen] = useState(false);

  const terminal = snap.terminal.map((line) => {
    return (
      <span className="terminal" key={nanoid()}>
        {parse(line, {
          replace: (domNode) => {
            const domElement: Element = domNode as Element;
            if (domElement.attribs && domElement.attribs.id === "nyc") {
              return <Modal link="New York City???" content={<Video src="https://www.youtube.com/embed/1S828Y7Eais?si=vBeM8EhAEFikjkrE&amp;controls=0&autoplay=1" />} />;
            }
            if (domElement.attribs && domElement.attribs.id === "efc") {
              return <Modal link="Everton Football Club" content={<Video src="https://www.youtube.com/embed/KHDEiu3ViCI?si=MvtiiO02RMPA3n3K&amp;controls=0&autoplay=1" />} />;
            }
            if (domElement.attribs && domElement.attribs.id === "resume") {
              return (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setResumeOpen(true);
                  }}
                >
                  Resume
                </a>
              );
            }
            if (
              domElement.name === "a" &&
              domElement.attribs &&
              typeof domElement.attribs.id === "string" &&
              domElement.attribs.id.startsWith("cmd-")
            ) {
              const cmd = domElement.attribs.id.replace("cmd-", "");
              return (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    runCommand(cmd);
                  }}
                >
                  {cmd}
                </a>
              );
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
    WORK = "work",
    PORTFOLIO = "portfolio",
    HELP = "help",
    CLEAR = "clear",
    RESET = "reset",
  }

  function runCommand(raw: string) {
    const cmd = raw.toLowerCase().trim();
    store.terminal.push("<span>&gt;&nbsp;</span>" + cmd);

    if (cmd === Commands.CLEAR) {
      store.terminal = [];
      return;
    }

    if (cmd === Commands.ABOUT) {
      store.terminal.push(
        `&nbsp;&nbsp;`
      );
      store.terminal.push(
        `&nbsp;&nbsp;I am a software engineer based in<a id="nyc" href="#">New York City</a>.`
      );
      store.terminal.push(
        `&nbsp;&nbsp;`
      );
      store.terminal.push(
        `&nbsp;&nbsp;In my free time, you may find me rating <a href="https://letterboxd.com/film/howards-end/">&nbsp;period dramas&nbsp;</a> on Letterboxd,`
      );
      store.terminal.push(
        `&nbsp&nbspdreaming about <a href="https://www.riversidethaicooking.com/north-eastern-cuisine/lao-style-mushroom-soup/">&nbspsoup</a>, complaining about <a id="efc" href="">&nbspEverton Football Club</a>, or planning`
       );
      store.terminal.push(
        `&nbsp&nbspmy next <a href="https://en.wikipedia.org/wiki/Ho_Chi_Minh_City">&nbspvacation</a>.`
       );
       store.terminal.push(
         `&nbsp;&nbsp;`
       );
    }

    if (cmd === Commands.WORK) {
      store.terminal.push(
        `&nbsp;&nbsp;`
      );
      store.terminal.push(
        '&nbsp;&nbsp;Formerly of <a href="https://nooklyn.com">&nbspNooklyn&nbsp</a> and <a href="www.ryder.com">&nbspRyder</a>, currently seeking new opportunities.'
      );
      store.terminal.push(
        `&nbsp;&nbsp;`
      );
      store.terminal.push(
        '&nbsp;&nbsp;View my&nbsp<a id="resume" href="#">Resume</a>.'
      );
      store.terminal.push(
        '&nbsp;&nbsp;View my <a href="https://github.com/timmyha">&nbspGitHub</a>.'
      );
      store.terminal.push(
        `&nbsp;&nbsp;`
      );
    }

    if (cmd === Commands.PORTFOLIO) {
      store.terminal.push(
        `&nbsp;&nbsp;`
      );
      store.terminal.push(
        "&nbsp;&nbsp;Some projects I've worked on:"
      );
      store.terminal.push(
        '&nbsp;&nbsp;&nbsp;<a href="https://crashpad.vercel.app/">crashpad</a>, a tongue-in-cheek AirBnb-esque experience.'
      );
      store.terminal.push(
        '&nbsp;&nbsp;&nbsp;<a href="https://prefix.timmy.gg/">prefix</a>, a web browser new-tab start page with shortcuts, widgets, and smart searching.'
      );
      store.terminal.push(
        `&nbsp;&nbsp;`
      );
    }

    if (cmd === Commands.HELP) {
      store.terminal.push(
        `&nbsp;&nbsp;`
      );
      store.terminal.push(
        "&nbsp;&nbsp;Available commands:"
      );
      store.terminal.push(
        '&nbsp;&nbsp;&nbsp;<a id="cmd-about" href="#">about</a>, show about information.'
      );
      store.terminal.push(
        '&nbsp;&nbsp;&nbsp;<a id="cmd-work" href="#">work</a>, show work experience.'
      );
      store.terminal.push(
        '&nbsp;&nbsp;&nbsp;<a id="cmd-portfolio" href="#">portfolio</a>, show projects.'
      );
      store.terminal.push(
        '&nbsp;&nbsp;&nbsp;<a id="cmd-clear" href="#">clear</a>, clear the terminal.'
      );
      store.terminal.push(
        '&nbsp;&nbsp;&nbsp;<a id="cmd-reset" href="#">reset</a>, reload the page.'
      );
      store.terminal.push(
        `&nbsp;&nbsp;`
      );
    }

    if (cmd === Commands.RESET) {
      window.location.reload();
      return;
    }

    if (!Object.values(Commands).includes(cmd as Commands)) {
      store.terminal.push(`Command not found: ${cmd}`);
    }
  }

  const enterCommand = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    runCommand(store.prompt);
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
              value={snap.prompt.toLowerCase()}
              onChange={(e) => onPromptChange(e)}
              placeholder="Please enter a command, or type 'help' for a list of commands"
              autoFocus
            />
          </CommandLine>
        </form>
      </Container>
      <DialogModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        title="Resume"
        fullBleed
      >
        <iframe src={resumePdf} title="Resume PDF" />
      </DialogModal>
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
  font-family: "IBM Plex Mono", monospace;
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
  font-family: "IBM Plex Mono", monospace;
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
  font-family: "IBM Plex Mono", monospace;
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
