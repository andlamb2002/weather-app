# Installation
1. **Clone the Repository**
   - Clone the 4CASTR repo using this command:
     ```bash
     git clone https://github.com/andlamb2002/weather-app.git
     ```

2. **Install Server Dependencies**
   - Navigate to the server directory and install its dependencies:
     ```bash
     cd server
     npm install
     cd ..
     ```

3. **Install Client Dependencies**
   - Before running the application, you need to set up the necessary environment variables for both the server and client. This includes API keys for external services like OpenWeatherMap and Google Places API.
      1. **Create a `.env` file in the `server` directory.**
      2. **Add the following environment variables:**
         - `WEATHER_API_KEY`: Your OpenWeatherMap API key.
         - `PLACES_API_KEY`: Your Google Places API key.
   
      Example:
      ```dotenv
      WEATHER_API_KEY=your_openweathermap_api_key_here
      PLACES_API_KEY=your_google_places_api_key_here
   - Navigate to the client directory and install its dependencies:
     ```bash
     cd client
     npm install
     cd ..
     ```

5. **Start the Application**
   - From the root of the project, start the server and client concurrently:
     ```bash
     npm start
     ```
   - The weather app will be accessible at `http://localhost:3000`.
