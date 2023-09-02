class Header extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
        this.innerHTML = `
         
          <header>
        <a href="./index.html">Books Trading Club</a>
        <a href="./books.html">Books</a>
        <a href="./request.html" >Request</a>
        <a href="./trades.html" >Trades</a>
        <a href="./users.html" >Users</a>
        <a href="./login.html" >Login</a>
        </header>
        `;
    }
  }
  
  customElements.define('header-component', Header);