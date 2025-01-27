class FooterComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        fetch("/componentes/footer/footer.css")
            .then(response => response.text())
            .then(css => style.textContent = css);
        const template = document.createElement("template");
        fetch("/componentes/footer/footer.html")
            .then(response => response.text())
            .then(html => {
                template.innerHTML = html;
                shadow.appendChild(style);
                shadow.appendChild(template.content.cloneNode(true));
                const yearElement = shadow.querySelector("#currentYear");
                if (yearElement) {
                    yearElement.textContent = new Date().getFullYear();
                }
            });
    }
}
customElements.define("custom-footer", FooterComponent);