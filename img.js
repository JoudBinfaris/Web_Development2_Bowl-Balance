

// Ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('profile-img');
    const fileDisplay = document.getElementById('file-upload');
    const fileUploadLabel = document.getElementById('file-upload-label');
    var isValid = true; 

    if (fileInput && fileDisplay) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                const file = this.files[0];
                fileDisplay.value = file.name;

                if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/webp') {
                    const reader = new FileReader();
                    isValid = true;

                    reader.onload = function(e) {
                        fileUploadLabel.innerHTML = '<img src="' + e.target.result + '" alt="Preview" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">';
                        
                        fileUploadLabel.style.border = '';
                    };

                    reader.readAsDataURL(file);
                } else {
                    // Invalid file type
                    isValid = false;
                    fileUploadLabel.innerHTML = `
                        <span class="icon-wrapper" style="color: red;">
                            <i class="fas fa-image main-icon"></i>
                            <i class="fas fa-plus badge-icon"></i>
                        </span>
                    `;

                    fileUploadLabel.style.border = '2px solid red';
                    
                    alert('Photo field accepts only image files');
                    
                    // Clear the file input
                    this.value = '';
                    fileDisplay.value = '';
                }
            } else {
                fileDisplay.value = '';
                isValid = true; 
                fileUploadLabel.style.border = '';
                fileUploadLabel.innerHTML = `
                    <span class="icon-wrapper">
                        <i class="fas fa-image main-icon"></i>
                        <i class="fas fa-plus badge-icon"></i>
                    </span>
                `;
            }
        });
    }

    const signSubmitBtn = document.getElementById('sign-submit');
    const signUpForm = document.getElementById('signup-form');

    signSubmitBtn.addEventListener('click', (event) => {
        if (!isValid) {
            event.preventDefault();
            alert('Photo field accepts only image files');
        } else if (signUpForm.checkValidity()) {
            event.preventDefault();
            window.location.href = 'UserPage.html';
        } else {
            signUpForm.reportValidity();
        }
    });
});
