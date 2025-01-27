class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        fetch("/componentes/header/header.css")
            .then(response => response.text())
            .then(css => style.textContent = css);
        const template = document.createElement("template");
        fetch("/componentes/header/header.html")
            .then(response => response.text())
            .then(html => {
                template.innerHTML = html;
                shadow.appendChild(style);
                shadow.appendChild(template.content.cloneNode(true));
            });
    }
}
customElements.define("custom-header", HeaderComponent);