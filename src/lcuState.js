import _ from 'lodash';

const lcuState = window.LCU?.State || {};

const lcuStateDefaults = {
    Location: 'Charleston, SC 29412',
    RefreshRate: 30000,
    IsDark: false,
    PointAPIQuery: '/api/v0/point-query',
    VariablesAPIQuery: '/api/v0/api-variables',
    HabistackAPIRoot: '/api/habistack',
    GeocodioAPIRoot: '/api/geocodio',
    GeocodioQuery: '/geocode',
    IoTAPIQuery: '/WarmQuery?includeEmulated=true&page=1&pageSize=100',
    IoTAPIRoot: '/api/iot',
    SelectedVariables: [
        'Temperature_Surface',
        'Temperature_2Meters',
        'PrecipitationRateMillisHr_Surface',
        'PrecipitationRate_Surface',
        'TotalPrecipitation_Surface',
        'WindGust_Surface',
        'WindSpeed_10Meters',
        'WindDirection_10Meters',
        'ShortWaveRadiation_Surface',
        'LongWaveRadiation_Surface',
        'DewPoint_2Meters',
        'Pressure_Surface',
        'Visibility_Surface',
        'CloudCover_EntireAtmosphere'
    ],
    DefaultChartPrefs: [
        {
            Mode: 'Light',
            ChartType: 'Line',
            BackgroundColor: 'rgb(0, 0, 0, 0.4)',
            BorderColor: 'rgb(0, 0, 0, 0.4)',
            Options: { scales: { y: { grid: { color: 'rgb(0, 0, 0, 0.1)' } }, x: { grid: { color: 'rgb(0, 0, 0, 0.1)' } } } }
        },
        {
            Mode: 'Dark',
            ChartType: 'Line',
            BackgroundColor: 'rgb(255, 255, 255, 0.4)',
            BorderColor: 'rgb(255, 255, 255, 0.4)',
            Options: { scales: { y: { grid: { color: 'rgb(255, 255, 255, 0.1)' } }, x: { grid: { color: 'rgb(255, 255, 255, 0.1)' } } } }
        },
        {
            Mode: 'Light',
            ChartType: 'Bar',
            BackgroundColor: 'rgb(0, 0, 0, 0.4)',
            BorderColor: 'rgb(0, 0, 0, 0.4)',
            Options: { scales: { y: { grid: { color: 'rgb(0, 0, 0, 0.1)' } }, x: { grid: { color: 'rgb(0, 0, 0, 0.1)' } } } }
        },
        {
            Mode: 'Dark',
            ChartType: 'Bar',
            BackgroundColor: 'rgb(255, 255, 255, 0.4)',
            BorderColor: 'rgb(255, 255, 255, 0.4)',
            Options: { scales: { y: { grid: { color: 'rgb(255, 255, 255, 0.1)' } }, x: { grid: { color: 'rgb(255, 255, 255, 0.1)' } } } }
        }
    ],
    ChartPrefs: [
        {
            Name: 'Temperature (Surface)',
            ConvertUnits: 'kelvinToFahrenheit',
            DisplayUnits: '°F',
            DisplayCurrent: true,
            Icons: ['temperature'],
            IconColors: ['blue', 'yellow', 'red'],
            IconSize: ['3em'],
            IconValues: [80, 88, 100],
            ChartType: 'Line',
            BackgroundColor: 'rgb(255, 0, 30)',
            BorderColor: 'rgb(240, 0, 30)',
            Options: { scales: { y: { beginAtZero: false } } }
        },
        {
            Name: 'Temperature (2Meters)',
            ConvertUnits: 'kelvinToFahrenheit',
            DisplayUnits: '°F',
            DisplayCurrent: true,
            Icons: ['emptytemperature', 'temperature', 'temperature'],
            IconColors: ['blue', 'yellow', 'red'],
            IconSize: ['3em'],
            IconValues: [80, 90, 100],
            ChartType: 'Line',
            BackgroundColor: 'rgb(255, 0, 30)',
            BorderColor: 'rgb(240, 0, 30)',
            Options: { scales: { y: { beginAtZero: false } } }
        },
        {
            Name: 'PrecipitationRateMillisHr (Surface)',
            DisplayUnits: 'mm/hr',
            ConvertUnits: 'roundToHundThou',
            ChartType: 'Bar',
            DisplayCurrent: true,
            Icons: ['showers', 'warning'],
            IconColors: ['lightblue', 'red'],
            IconSize: ['3em'],
            IconValues: [0, 5],
            BackgroundColor: 'rgb(0, 0, 240)',
            BorderColor: 'rgb(0, 0, 210)',
            Options: { scales: { y: { beginAtZero: true } } }
        },
        {
            Name: 'PrecipitationRate (Surface)',
            DisplayUnits: 'kg/m²/s',
            ConvertUnits: 'roundToHundThou',
            ChartType: 'Bar',
            DisplayCurrent: true,
            Icons: ['showers', 'warning'],
            IconColors: ['lightblue', 'red'],
            IconSize: ['3em'],
            IconValues: [0, 5],
            BackgroundColor: 'rgb(0, 0, 240)',
            BorderColor: 'rgb(0, 0, 210)',
            Options: { scales: { y: { beginAtZero: true } } }
        },
        {
            Name: 'TotalPrecipitation (Surface)',
            DisplayUnits: 'kg/m²/s',
            ConvertUnits: 'roundToHundThou',
            ChartType: 'Bar',
            DisplayCurrent: true,
            Icons: ['rain', 'warning'],
            IconColors: ['lightblue', 'red'],
            IconSize: ['3em'],
            IconValues: [0, 10],
            BackgroundColor: 'rgb(0, 0, 240)',
            BorderColor: 'rgb(0, 0, 210)',
            Options: { scales: { y: { beginAtZero: true } } }
        },
        {
            Name: 'WindSpeed (10Meters)',
            DisplayUnits: 'MPH',
            ConvertUnits: 'mSecToMPH',
            ChartType: 'Line',
            DisplayCurrent: true,
            Icons: ['wind', 'warning'],
            IconColors: ['green', 'red'],
            IconSize: ['3em'],
            IconValues: [20, 35],
            BackgroundColor: 'rgb(0, 255, 0)',
            BorderColor: 'rgb(0, 220, 0)',
            Options: { scales: { y: { beginAtZero: true } } }
        },
        {
            Name: 'WindGust (Surface)',
            DisplayUnits: 'MPH',
            ConvertUnits: 'mSecToMPH',
            ChartType: 'Line',
            DisplayCurrent: true,
            Icons: ['gusts', 'warning'],
            IconColors: ['green', 'red'],
            IconSize: ['3em'],
            IconValues: [30, 50],
            BackgroundColor: 'rgb(0, 230, 0)',
            BorderColor: 'rgb(0, 200, 0)',
            Options: { scales: { y: { beginAtZero: true } } }
        },
        {
            Name: 'WindDirection (10Meters)',
            DisplayUnits: '°DEG',
            ConvertUnits: 'roundToTens',
            ChartType: 'Line',
            DisplayCurrent: true,
            Icons: ['arrowup', 'arrowupright', 'arrowright', 'arrowdownright', 'arrowdown', 'arrowdownleft', 'arrowleft', 'arrowupleft', 'arrowup'],
            IconColors: ['green'],
            IconSize: ['2.5em'],
            IconValues: [0, 30, 75, 120, 165, 210, 255, 300, 345, 360],
            BackgroundColor: 'rgb(0, 220, 0)',
            BorderColor: 'rgb(0, 200, 0)',
            Options: { scales: { y: { beginAtZero: true } } }
        },
        {
            Name: 'ShortWaveRadiation (Surface)',
            DisplayUnits: 'W/m²',
            ConvertUnits: 'roundToTens',
            DisplayCurrent: true,
            Icons: ['sun', 'warning'],
            IconColors: ['yellow', 'red'],
            IconSize: ['3em'],
            IconValues: [100, 200],
            ChartType: 'Line',
            BackgroundColor: 'rgb(255, 255, 30)',
            BorderColor: 'rgb(240, 240, 30)',
            Options: { scales: { y: { beginAtZero: true } } }
        },
        {
            Name: 'LongWaveRadiation (Surface)',
            DisplayUnits: 'W/m²',
            ConvertUnits: 'roundToTens',
            DisplayCurrent: true,
            Icons: ['sunheat', 'warning'],
            IconColors: ['orange', 'red'],
            IconSize: ['3em'],
            IconValues: [100, 400],
            ChartType: 'Line',
            BackgroundColor: 'rgb(255, 255, 30)',
            BorderColor: 'rgb(240, 240, 30)',
            Options: { scales: { y: { beginAtZero: true } } }
        },
        {
            Name: 'DewPoint (2Meters)',
            ConvertUnits: 'kelvinToFahrenheit',
            DisplayUnits: '°F',
            DisplayCurrent: true,
            Icons: ['water'],
            IconColors: ['lightblue'],
            IconSize: ['3em'],
            IconValues: [80],
            ChartType: 'Line',
            BackgroundColor: 'rgb(55, 100, 250)',
            BorderColor: 'rgb(40, 100, 220)',
            Options: { scales: { y: { beginAtZero: false } } }
        },
        {
            Name: 'Pressure (Surface)',
            ConvertUnits: 'kelvinToFahrenheit',
            DisplayUnits: 'Pa',
            DisplayCurrent: true,
            Icons: ['gauge'],
            IconColors: ['lightblue'],
            IconSize: ['2.5em'],
            IconValues: [80],
            ChartType: 'Line',
            BackgroundColor: 'rgb(55, 100, 240)',
            BorderColor: 'rgb(40, 100, 210)',
            Options: { scales: { y: { beginAtZero: false } } }
        },
        {
            Name: 'Visibility (Surface)',
            DisplayUnits: 'miles',
            ConvertUnits: 'metersToMiles',
            ChartType: 'Line',
            DisplayCurrent: true,
            Icons: ['invisible', 'visible'],
            IconColors: ['red', 'lightgrey'],
            IconSize: ['2.5em'],
            IconValues: [0, 3],
            BackgroundColor: 'rgb(120, 120, 200)',
            BorderColor: 'rgb(120, 120, 210)',
            Options: { scales: { y: { beginAtZero: true } } }
        },
        {
            Name: 'CloudCover (EntireAtmosphere)',
            DisplayUnits: '%',
            ConvertUnits: 'roundToTens',
            ChartType: 'Line',
            DisplayCurrent: true,
            Icons: ['cloud'],
            IconColors: ['lightgrey'],
            IconSize: ['3em'],
            IconValues: [100],
            BackgroundColor: 'rgb(120, 120, 200)',
            BorderColor: 'rgb(120, 120, 210)',
            Options: { scales: { y: { beginAtZero: true } } }
        },
        {
            Name: 'Temperature',
            ChartType: 'Line',
            DisplayUnits: '°F',
            DisplayCurrent: true,
            Icons: ['emptytemperature', 'temperature', 'temperature'],
            IconColors: ['blue', 'yellow', 'red'],
            IconSize: ['3em'],
            IconValues: [80, 90, 100],
            ChartType: 'Line',
            BackgroundColor: 'rgb(255, 0, 30)',
            BorderColor: 'rgb(240, 0, 30)',
            Options: { scales: { y: { beginAtZero: false } } }
        },
        {
            Name: 'Humidity',
            ChartType: 'Bar',
            DisplayUnits: '%',
            DisplayCurrent: true,
            Icons: ['water'],
            IconColors: ['blue', 'blue', 'lightblue'],
            IconSize: ['3em'],
            IconValues: [25, 50, 75],
            BackgroundColor: 'rgb(0, 0, 255)',
            BorderColor: 'rgb(0, 0, 200)',
            Options: { scales: { y: { beginAtZero: true } } }
        },
        {
            Name: 'motion',
            ChartType: 'Building',
            BackgroundColor: 'rgb(255, 0, 0)',
            BorderColor: 'rgb(0, 0, 255)'
        },
        {
            Name: 'magnet',
            ChartType: 'Bar',
            BackgroundColor: 'rgb(255, 0, 0)',
            BorderColor: 'rgb(0, 0, 255)',
        },
        {
            Name: 'o_humidity',
            ChartType: 'Bar',
            BackgroundColor: 'rgb(0, 180, 40)',
            BorderColor: 'rgb(0, 0, 255)'
        },
        {
            Name: 'o_tempf',
            ChartType: 'Line',
            BackgroundColor: 'rgb(255, 0, 255)',
            BorderColor: 'rgb(0, 0, 255)'
        },
        {
            Name: 'petentiometer',
            ChartType: 'Line',
            BackgroundColor: 'rgb(125, 0, 255)',
            BorderColor: 'rgb(0, 0, 255)',
            BorderWidth: '5'
        },
        {
            Name: 'photoresistor',
            ChartType: 'Line',
            BackgroundColor: 'rgb(125, 0, 200)',
            BorderColor: 'rgb(0, 0, 255)',
            BorderJoinStyle: 'bevel',
            BorderWidth: '5'
        },
        {
            Name: 'rangecm',
            ChartType: 'Line',
            BackgroundColor: 'rgb(125, 80, 0)',
            BorderColor: 'rgb(0, 0, 255)'
        }
    ]
};

// const LCUState = lcuState || lcuStateDefaults;
const LCUState = {
    ...lcuStateDefaults,
    ...(lcuState || {})
};

export default { LCUState }; 