document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

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

    const form = document.getElementById('contributionForm');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log('Form submitted');

            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                story: formData.get('story')
            };

            try {
                const response = await fetch('/submit-story', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                console.log('Response received', response);

                if (response.ok) {
                    console.log('Story submitted successfully');
                    alert('Story submitted successfully! Redirecting to home page...');

                    // Wait for 2 seconds
                    setTimeout(() => {
                        // Redirect to the homepage
                        window.location.href = '/index.html';
                    }, 2000);
                } else {
                    console.error('Failed to submit the story');
                    alert('Failed to submit your story. Please try again.');
                }
            } catch (error) {
                console.error('Error submitting the story:', error);
                alert('An error occurred while submitting your story. Please try again.');
            }
        });
    } else {
        console.error('Form not found');
    }
});
