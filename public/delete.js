document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.deleteBtn');
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const confirmBtn = document.getElementById('confirmBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    let currentForm = null;

    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            overlay.style.display = 'block';
            popup.style.display = 'block';
            currentForm = event.target.closest('.delete-form');
        });
    });

    cancelBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        popup.style.display = 'none';
        currentForm = null;
    });

    confirmBtn.addEventListener('click', () => {
        if (currentForm) {
            currentForm.submit();
        }
        overlay.style.display = 'none';
        popup.style.display = 'none';
    });
});
