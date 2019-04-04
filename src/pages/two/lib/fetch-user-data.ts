import fetch from 'lib/fetch';

export const fetchUserData = async user => fetch(`https://api.github.com/users/${user}`);
export const fetchUserRepos = async user => fetch(`https://api.github.com/users/${user}/repos`);
