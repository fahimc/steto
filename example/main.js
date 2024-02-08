import "./style.css";
import "./steto.ts";
import { useHTML, useState } from "./state-manager.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
    
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
     
    </a>
    <h1>Vite + TypeScript</h1>
    <div state-key="message" class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <div state-html="footer"></div>
  </div>
`;
setTimeout(() => {
  const [message, setMessage] = useState("message", "Hello, World!");
  const [footer, setFooter] = useHTML("footer", "<h1>hello</h1>");
  setTimeout(() => {
    setMessage("changed");
    setFooter("<p>changed hello</p>");
    console.log(message, footer);
  }, 3000);
}, 300);
