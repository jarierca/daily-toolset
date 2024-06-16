
# Daily Toolset

The Daily Toolset project is a web application built with React that helps users perform various daily tasks efficiently. The application offers an intuitive and organized interface, providing a wide range of tools to facilitate day-to-day activities.

## Key Features

### Text Manipulation
- **Text Comparator**: Compare two pieces of text.
- **Character Counter**: Count characters in a text.
- **Text Converter**: Convert text to different formats.
- **Find & Replace**: Find and replace text within a document.
- **Code Generator**: Generate code snippets.
- **Emoji List**: Browse and copy emojis.
- **Lorem Ipsum Text**: Generate placeholder text.

### Data Validation
- **XML Validation**: Validate XML data.
- **JSON Validation**: Validate JSON data.

### Security
- **Password Generator**: Generate strong and secure passwords.

### Encode/Decode
- **Base64**: Encode and decode Base64 data.
- **URL**: Encode and decode URL data.
- **XML**: Encode and decode XML data.

### Raffle
- **Coin Flip**: Simulate a coin flip.
- **Random Draw**: Perform a random draw.

### Identity
- **Identity Generator**: Generate random identity data.

### Keyboard
- **Keyboard Test**: Test keyboard functionality.
- **Typing Test**: Test and improve typing speed.

### Task Center
- **To Do List**: Manage daily tasks.
- **Notes**: Create and manage notes.
- **Calendar**: Keep track of important dates and events.

### Miscellaneous
- **Paint**: Draw and create art.

## Technologies Used

The Daily Toolset project has been developed using the following technologies:

- **React**: For building the user interface and managing the application state.
- **CSS3**: For the design and styling of the user interface.
- **JavaScript (ES6+)**: For the application logic and interactivity.
- **HTML5**: For the structure and content of the web page.
- **Git**: For version control of the source code.
- **GitHub**: For hosting the project repository and facilitating collaboration with other developers.

## Usage Instructions

1. Clone the project repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies using `npm install`.
4. Start the development server using `npm start`.
5. Open the application in your web browser at `http://localhost:3000`.

## Run Project Dev Container

To run the project using a Docker container, follow these steps:

1. Build the Docker image:
   ```sh
   docker build -t daily-toolset .
   ```

2. Run the Docker container:
   ```sh
   docker run -dp 127.0.0.1:3000:3000 daily-toolset
   ```

3. For a development container that auto-updates on changes, use:
   ```sh
   docker run -it --rm -v ~/daily-toolset:/app -p 3000:3000 daily-toolset
   ```

## Contribution

If you wish to contribute to the To-Do List project, follow these steps:

1. Fork the repository on GitHub.
2. Clone your fork to your local machine.
3. Create a new branch for your contribution: `git checkout -b new-feature`.
4. Make the necessary changes and commit them with descriptive messages.
5. Push the changes to your GitHub repository: `git push origin new-feature`.
6. Create a pull request in the original repository for your changes to be reviewed.

## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0). See the [LICENSE](LICENSE) file for more details.

## Privacy

The To-Do List application respects your privacy and does not collect any user data. The application solely utilizes the browser's local storage functionality to store tasks and lists locally on your device for your convenience. We are committed to maintaining your privacy and ensuring a secure and transparent user experience.

### Open Source and Freedom

To-Do List is an open-source project distributed under the GNU General Public License v3.0 (GPL-3.0). This means that the source code is freely available for anyone to view, modify, and distribute. We believe in the principles of freedom and transparency, and we welcome contributions from the community to improve and enhance the application.

### FLOSS (Free/Libre and Open Source Software)

To-Do List is part of the FLOSS movement, promoting the use of software that gives users the freedom to run, study, share, and modify it according to their needs. We advocate for open standards, interoperability, and user empowerment, and we invite users to join us in embracing and supporting FLOSS projects.

---

The To-Do List project simplifies the management of your daily tasks. If you have any questions or suggestions, feel free to contact us. Thank you for using our application!

