import { proxy } from "valtio";

interface StoreTypes {
  terminal: string[]
  prompt: string
  page: string
}

export const store: StoreTypes = proxy({
  terminal: ['<span className="terminal">welcome to Timothy Hansher\'s program!</span>',
    `<span>(╯°□°)╯︵ ┻━┻</span>`,
    '<span className="terminal">please select one of the following options to navigate:</span>',
    '<span className="termainal">&nbsp;&nbsp;</span>',
    '<span className="terminal">&nbsp;&nbsp;<a id="cmd-about" href="#">about</a></span>',
    '<span className="terminal">&nbsp;&nbsp;<a id="cmd-work" href="#">work</a></span>',
    '<span className="terminal">&nbsp;&nbsp;<a id="cmd-portfolio" href="#">portfolio</a></span>',
    '<span className="terminal">&nbsp;&nbsp;<a id="cmd-help" href="#">help</a></span>',
    '<span className="termainal">&nbsp;&nbsp;</span>',
  ],

  prompt: "",
  page: ""
})
