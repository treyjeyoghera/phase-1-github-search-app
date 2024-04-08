document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchInput = document.getElementById('search').value;
      if (!searchInput) return;
  
      try {
        const userData = await searchGithubUsers(searchInput);
        displayUserList(userData.items);
      } catch (error) {
        console.error('Error fetching GitHub users:', error);
      }
    });
  
    async function searchGithubUsers(query) {
      const url = `https://api.github.com/search/users?q=${query}`;
      const response = await fetch(url);
      return response.json();
    }
  
    function displayUserList(users) {
      userList.innerHTML = '';
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.login;
        listItem.addEventListener('click', () => {
          fetchUserRepos(user.login);
        });
        userList.appendChild(listItem);
      });
    }
  
    async function fetchUserRepos(username) {
      const url = `https://api.github.com/users/${username}/repos`;
      const response = await fetch(url);
      const reposData = await response.json();
      displayReposList(reposData);
    }
  
    function displayReposList(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.textContent = repo.name;
        reposList.appendChild(listItem);
      });
    }
  });
  