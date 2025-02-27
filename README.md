# Skycast ☁️

A modern weather application that provides real-time weather information and forecasts, implemented in three different versions.

## Project Structure

The project contains three different implementations:

- `skycast_vanilla/` - Vanilla implementation
- `skycast_angular/` - Angular.js implementation
- `skycast_swift/` - Swift implementation

Each implementation has its own configuration and setup.

## Features

- Real-time weather data
- 5-day weather forecast
- Location-based weather information
- Temperature, humidity, wind speed, and precipitation data
- Clean and intuitive user interface
- Responsive design for all devices

## Getting Started

### Prerequisites

For Vanilla implementation:

- Python 3.x
- pip

For Angular implementation:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Angular CLI

For Swift implementation:

- Xcode

### Installation

1. Clone the repository

```bash
[git clone https://github.com/yourusername/skycast.git](https://github.com/xxxLEVIxxx/SkyCast.git)
```

2. Navigate to the desired implementation directory

```bash
cd skycast/skycast_vanilla    # For vanilla implementation
# OR
cd skycast/skycast_angular    # For Angular implementation
# OR
cd skycast/skycast_swift      # For Swift implementation
```

3. Create a `.env` file in the backend directory and add your API keys:

```bash
WEATHER_API_KEY=your_api_key_here
GOOGLE_API_KEY=your_api_key_here
IPINFO_API_KEY=your_api_key_here
MONGODB_URI=your_api_key_here 
```

4. Follow the specific setup instructions for each implementation:

#### Backend

```bash
cd skycast/backend
npm start
```

#### Angular Implementation

```bash
npm install
ng serve
```


## Usage

1. Allow location access when prompted or manually enter a location
2. View current weather conditions
3. Scroll down to see the detailed forecast
4. Toggle between Celsius and Fahrenheit using the temperature unit switch

## Technologies Used

- node.js
- Angular.js
- Weather.io API
- CSS/SCSS
- JavaScript/TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Acknowledgments

- Weather data provided by Weather.io
- Icons by [Icon Provider]
- Special thanks to all contributors
