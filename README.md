# Chrome Extension: WebPageBrief

[Frontend Documentation](/extension-frontend/readme.md)
[Backend Documentation](/backend/Readme.md)


## Overview

**Save time when reading long webpages and articles**
    *Use webPageBrief Extension and save Time*
    
1. Welcome to the WebPageBrief Chrome extension! This extension allows you to generate summaries and major points from websites using the power of OpenAI. Simplify your reading and research with just a click!

### Installation

## Extension (Frontend)
1. **Open Google Chrome**.
2. Navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click on "Load unpacked" and select the root directory of the extension-frontend (This) repository (the directory that contains your extension files).

Your Chrome extension should now be loaded and ready to use.

## Backend Server Setup
1. **Navigate to the 'backend' directory** containing the `package.json` file for the backend (usually the root directory of your project).
2. Open a terminal or command prompt and run the following commands to set up the backend server:

3. ```bash

    cd backend
    npm install    # Install project dependencies
    npm start      # Start the project



        ---The backend server should now be running on `http://localhost:8000`.---



## Usage
1. **Activate the Extension:**
- Click on the WebPageBrief icon in your Chrome toolbar.

2. **Generate Summaries:**
    - While on any webpage, click the extension icon and click 
    on Get summary button and get the summary of page's content.

3. **Generate Major points:**
    - While on any webpage, click the extension icon and click 
    on Get major points button and get the main points of page's content.


# Features
    - Summarize webpages with a single click.
    - Get main points of the webpage with a single click


## OpenAI API Integration
    This extension leverages the OpenAI API for text summarization.
    To enable this functionality: