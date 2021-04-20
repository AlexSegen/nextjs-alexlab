const apiURL = 'https://pixelagil.herokuapp.com/api';

export const sendMessage = async (payload) =>  {
    payload.notify = true;
    try {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          }

        const response = await fetch(apiURL + '/leads/set', options);
        const data = await response.json();

        return data;
        
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getProjects = async () => {
  try {
    const response = await fetch(apiURL + '/projects/get');
    const data = await response.json();

    return data;
    
  } catch (error) {
      throw new Error(error.message);
  }
}

export const getRepos = async () => {
  try {
    const response = await fetch('https://api.github.com/users/alexsegen/repos?per_page=100');
    const data = await response.json();

    return data;
    
  } catch (error) {
      throw new Error(error.message);
  }
}