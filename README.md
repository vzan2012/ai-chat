# OpenAI - Chat Completions

Developed a User Interface where user can able to enter prompt and get the results generated by OpenAI API Completions.

## Description

This codebase is developed using Vite, JavaScript and Tailwind CSS has been used. It has the UI and OpenAPI scripts integrated. When the user sends prompt as input, the OpenAI API generates the results and displayed in the UI to the user.

## Getting Started

### Dependencies

- To run this application in your local. You need NodeJS installed in your local machine.

### Installing

- Download the zip file from the releases or pull the code
- After extracting the files to your local machine. Inside the project folder.
- Execute the command

  `npm install`

- Inside the project folder, you can find the file **.env.sample** file, copy or rename this file **.env** file.
- You need to provide OpenAI API Key (to get the key you need to register with [OpenAI Platform](https://platform.openai.com/))

- ```
  VITE_API_KEY = "<< Your Key from OpenAI >>"
  VITE_API_URL = "https://api.openai.com/v1/chat/completions"
  ```

- You can find the API URL in [OpenAI API Reference](https://platform.openai.com/docs/api-reference/making-requests)

### Executing program

- How to run the program
- Execute the command in your terminal

  `npm run dev`

- Open the browser and access url generated from the terminal (Example: http://localhost:5173)

### Screenshots
![image](https://user-images.githubusercontent.com/13725828/236230933-f4b42f6c-ce76-4a32-939b-ef5503bd5740.png)

![image](https://user-images.githubusercontent.com/13725828/236231867-ae41653c-310c-47ea-8a2b-7f0994707699.png)



## Author

Deepak Guptha Sitharaman

## License

This project is open source licensed - see the LICENSE.md file for details
