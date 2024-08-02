document.addEventListener('DOMContentLoaded', () => {
    const storiesContainer = document.getElementById('stories-container');

    // Fetch stories from the server
    fetch('/stories')
        .then(response => response.json())
        .then(stories => {
            // Loop through each story and create an HTML element for it
            stories.forEach(story => {
                const storyElement = document.createElement('div');
                storyElement.classList.add('story');

                storyElement.innerHTML = `
                    <h3>${story.name}</h3>
                    <p>${story.story}</p>
                    <p><strong>Email:</strong> ${story.email}</p>
                `;

                storiesContainer.appendChild(storyElement);
            });
        })
        .catch(error => console.error('Error fetching stories:', error));
});
