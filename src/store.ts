import { proxy } from "valtio";

interface StoreTypes {
  terminal: string[]
  prompt: string
  page: string
}

export const store: StoreTypes = proxy({
  terminal: ['<span className="terminal">welcome to timothy\'s program!</span>',
    `<span>hello</span>`,
    '<span className="terminal">please select one of the following options to navigate:</span>',
    '<span className="terminal">&nbsp;&nbsp;about</span>',
    '<span className="terminal">&nbsp;&nbsp;portfolio</span>',
    '<span className="terminal">&nbsp;&nbsp;game</span>',],
  prompt: "",
  page: ""
})
