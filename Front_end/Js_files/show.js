// Front_end\Js_files\show.js
const storiesList = document.getElementById('storiesList');
const contributeButton = document.getElementById('contributeButton');
const mongoUrl = 'mongodb://localhost:27017/ACT4CLIMATE';

const fetchData = async () => {
    try {
        const response = await fetch(mongoUrl + '/stories');
        const data = await response.json();
        const stories = data.map(({ name, email, story }) => `<li><h3>${name}</h3><p>${story}</p><p><small>Submitted by <a href="mailto:${email}">${email}</a></small></li>`);
        storiesList.innerHTML = stories.join('');
    } catch (error) {
        console.error(error);
    }
};
