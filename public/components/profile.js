class Profile extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    try {
    //  const response = await fetch('/user');
     
  
     // const data = await response.json();
      const username = 'login';
  
      this.innerHTML = `
        <header>
          <a href="./index.html">Books Trading Club</a>
          <a href="./books.html">Books</a>
          <a href="./request.html">Request</a>
          <a href="./trades.html">Trades</a>
          <a href="./users.html">Users</a>
          <a href="#">${username}</a>
        </header>
      `;
    } catch (error) {
      console(error);
      // Handle errors if fetch or JSON parsing fails
    }
  }
  
}

customElements.define('profile-component', Profile);
