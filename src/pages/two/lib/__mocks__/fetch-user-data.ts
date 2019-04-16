const user = {
    id: 1,
    name: 'Billy Bobcat',
    bio: 'Web developer'
};

const repos = ['test repo 1', 'test repo 2'];

export const fetchUserData = jest.fn(async () => new Promise(resolve => resolve(user)));
export const fetchUserRepos = jest.fn(async () => new Promise(resolve => resolve(repos)));
