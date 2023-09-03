class Header extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
        this.innerHTML = `
         
  <header>
      <a href="./index.html">Books Trading Club</a>
        <input type="checkbox" id="toggle">
        <label for="toggle">&#9776;</label>
        <nav>
            <ul>
                <li><a href="./books.html">Books</a></li>
                <li><a href="./request.html">Request</a></li>
                <li><a href="./trades.html">Trades</a></li>
                <li><a href="./users.html">Users</a></li>
                <li><a href="./login.html" id="username"></a>
                <ul id="dropDown" ></ul>
                </li>
            </ul>
        </nav>
    </header>
        `;
    }
  }

  async function checkAuthentication() {
    try {
      const response = await fetch('/check-auth'); // Send a request to the server to check if the user is authenticated.
      if (response.status === 200) {
        // User is authenticated, fetch the username.
        const userData = await fetch('/user');
        const data = await userData.json();
        const username = data.username;
        displayUsername(username);
      } else {
        // User is not authenticated, show login form or redirect to the login page.
        let username = "login"
        displayUsername(username);
       
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  function displayUsername(username) {
    const usernameElement = document.getElementById('username');
    const dropDownElement = document.getElementById('dropDown');
    if (usernameElement) {
      usernameElement.textContent = username;
      dropDownElement.appendChild('li') = showDropDown;
    }else{
      usernameElement.textContent = "login"
    }
  }
  
  function showDropDown() {
    // Implement your logic to display the login form or redirect to the login page.
    // This might involve manipulating the DOM or changing the current URL.
   const innerHTML = `
        <ul>
            <li> <a href="#">Profile</a></li>
            <li> <a href="#">Edit profile</a></li>
            <li> <a href="#">My Books</a></li>
            <li> <a href="#">Log out</a></li>
        </ul>
    `
    return innerHTML;
  }
  
  // Call the function to check authentication when the page loads.
  window.addEventListener('load', checkAuthentication);
  
  
  customElements.define('header-component', Header);