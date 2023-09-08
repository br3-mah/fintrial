function redirectTo(pageName) {
    // Use the History API to change the URL without reloading
    history.pushState({}, '', `${pageName}.html`);

    // Now you can load the content of the page using AJAX or any other method
    // For simplicity, let's just reload the whole page
    location.reload();
}