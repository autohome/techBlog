const newFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#add-comment').value.trim();
    const postId = parseInt(window.location.pathname.split('/').pop());

    if (comment) {
        const requestBody = { contents: comment, post_id: postId };
        console.log(requestBody); // Log request body

        const response = await fetch(`/api/comments/`, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/post/' + postId);
        } else {
            alert('Failed to create post');
        }
    }
};


const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);


