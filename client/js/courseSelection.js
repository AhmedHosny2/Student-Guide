const semesterInput = document.getElementById('semester');
const courseSelect = document.getElementById('course');
const contentDisplay = document.getElementById('content');
const courseForm = document.getElementById('course-form');

// Define a dictionary of course names for each semester
const courseData = {
    1: ['Math 1', 'Physics', 'Techn', 'CS 1'],
    2: ['Math 2', 'OOP', 'Network', 'Micro', 'Theo'],
    3: ['CPP', 'OS', 'DSA', 'DB', 'Math 3'],
    4: ['SE', 'DS', 'IT', 'DIS', 'Media', 'Math 4'],
};

// Populate the course dropdown based on the selected semester
semesterInput.addEventListener('change', () => {
    const selectedSemester = semesterInput.value;
    const courses = courseData[selectedSemester] || [];

    // Clear previous options
    courseSelect.innerHTML = '<option value="" disabled selected>Select a Course</option>';

    // Add new options
    courses.forEach((courseName) => {
        const option = document.createElement('option');
        option.value = courseName;
        option.textContent = courseName;
        courseSelect.appendChild(option);
    });
});

// Handle form submission
courseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedSemester = semesterInput.value;
    const selectedCourse = courseSelect.value;

    if (selectedSemester && selectedCourse) {
        // Construct the URL with the course name as a query parameter
        const url = `/get-content?course=${encodeURIComponent(selectedCourse)}`;
console.log(url);
        // Send a GET request to the backend using the constructed URL
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // Display the received content in the paragraph
            contentDisplay.textContent = data.content;
        })
        .catch((error) => {
            console.error('Error:', error);
            contentDisplay.textContent = 'An error occurred while fetching content.';
        });
    }
});
