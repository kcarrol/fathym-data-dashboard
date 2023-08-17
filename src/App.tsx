import React, { ChangeEvent } from 'react';
import Charts, { ChartState } from './Controls/Charts';
import LCUState from './lcuState';
import CurrentVals, { CurrentValState } from './Controls/Currentval';
import { HeroValState } from './Controls/Hero';
import HeroDataVals, { HeroDataValState } from './Controls/HeroData';
import HeroShellVals, { HeroShellValState } from './Controls/HeroShell';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Card, Link } from '@mui/material';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import ResponsiveNavBar from './Components/ResponsiveNavBar';
import _ from "lodash";
import FathymLogo, { FathymLogoMad, FathymLogoSad } from './Components/FathymLogo';
import { convertUnitsTo } from './Controls/Convert';
import Footer from './Components/Footer';


class AppProperties { }

class AppState {

  public ChartStates: { [lookup: string]: ChartState }; 

  public CurrentDevice?: string; 

  public DeviceChartStates: { [lookup: string]: ChartState };

  public HeroVals: { [lookup: string]: HeroValState };

  public HeroDataVals: { [lookup: string]: HeroDataValState };

  public HeroShellVals: { [lookup: string]: HeroShellValState };

  public CurrentVals: { [lookup: string]: CurrentValState };

  public DeviceCurrentVals: { [lookup: string]: CurrentValState };

  public Error?: string;

  public GeocodioAPIState?: number;

  public HabistackAPIState?: number;

  public IoTEnsembleAPIState?: number;

  public Location: {
    Data: any;
    Latitude: number;
    Longitude: number;
    Name: string;
    Timezone: number;
    DaylightSavings: boolean,
  };

  public SelectedVariables: string[];

  public IsDark: boolean;

  public DisplayHero: string;

  public DefaultChartPrefs: { [name: string]: any };

  public ChartPrefs: { [name: string]: any };

  public Variables: { [name: string]: any };

  constructor() {
    this.ChartStates = {};

    this.DeviceChartStates = {};

    this.HeroVals = {};

    this.HeroDataVals = {};

    this.HeroShellVals = {};

    this.CurrentVals = {};

    this.DeviceCurrentVals = {};

    this.Location = {
      Data: {},
      Latitude: 0,
      Longitude: 0,
      Name: 'Denver, CO',
      Timezone: -7,
      DaylightSavings: true,
    };

    this.SelectedVariables = [];

    this.DisplayHero = 'none';

    this.IsDark = false;

    this.DefaultChartPrefs = {};

    this.ChartPrefs = {};

    this.Variables = {};
  }
}

export default class App extends React.Component<AppProperties, AppState> {
  //#region Constants
  //#endregion

  //#region Fields
  protected geocodioSvcUrl: string;

  protected geocodioQuery: string;

  protected habistackSvcUrl: string;

  protected iotSvcUrl: string;

  protected iotSvcQuery: string;

  protected iotEmulated: string;

  protected iotPages: string;

  protected pointsSvcQuery: string;

  protected refreshRate: number;

  protected refreshTimer: any;

  protected variablesSvcQuery: string;
  //#endregion

  //#region Properties
  //#endregion

  //#region Constructors
  constructor(props: AppProperties) {
    super(props);

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      BarElement,
      Title,
      Tooltip,
      Legend
    );

    this.geocodioQuery = LCUState.GeocodioQuery;

    this.geocodioSvcUrl = LCUState.GeocodioAPIRoot;

    this.habistackSvcUrl = LCUState.HabistackAPIRoot;

    this.iotSvcQuery = LCUState.IoTAPIQuery;

    this.iotEmulated = LCUState.IoTEmulated;

    this.iotPages = LCUState.IoTPages;

    this.iotSvcUrl = LCUState.IoTAPIRoot;

    const defaultLocation = LCUState.Location;

    this.refreshRate = LCUState.RefreshRate || 30000;

    this.pointsSvcQuery = LCUState.PointAPIQuery;

    this.variablesSvcQuery = LCUState.VariablesAPIQuery;

    const selectedVars = LCUState.SelectedVariables || [
      'WindGust_Surface',
      'WindSpeed_10Meters',
      'WindDirection_10Meters',
      'PrecipitationRate_Surface',
      'TotalPrecipitation_Surface',
      'Temperature_Surface'
    ];

    const isDark = LCUState.IsDark;

    const displayHero = LCUState.DisplayHero;

    const defaultChartPrefs = LCUState.DefaultChartPrefs;

    const chartPrefs = LCUState.ChartPrefs;

    this.state = {
      ...new AppState(),
      SelectedVariables: selectedVars,
      IsDark: isDark,
      DisplayHero: displayHero,
      DefaultChartPrefs: defaultChartPrefs,
      ChartPrefs: chartPrefs,
      Location: {
        Data: {},
        Latitude: 0,
        Longitude: 0,
        Name: defaultLocation,
        Timezone: 0,
        DaylightSavings: false,
      },
    };
  }
  //#endregion

  //#region Life Cycle
  public componentDidMount() {
    this.appDark();

    if (!this.refreshTimer) {
      this.loadVariablesData();
      this.loadIoTData();

      this.refreshTimer = setInterval(() => {
        this.loadCharts();
        this.loadIoTData();
      }, this.refreshRate);
    }
  }

  public render() {

    const variableKeys = Object.keys(this.state.Variables);

    const variableOptions = variableKeys.map((key) => {
      const variable = this.state.Variables[key];

      return (
        <MenuItem key={key} value={key} title={variable.doc}>
          {variable.name} ({variable.level})
        </MenuItem>
      );
    });

    return (
      <div>
        <ResponsiveNavBar />
        
        {variableOptions?.length > 0 ? (
          <div>
            <div>
              {!this.state.GeocodioAPIState ? (
                <Box sx={{ m: 2, mt: 11 }} >
                  <TextField id="outlined-basic" label="Location" variant="outlined" sx={{ mr: 1, width: { xs: '100%', md: '30%' } }}
                    value={this.state.Location.Name}
                    onChange={(e) => this.onLocationChange(e)} onKeyDown={e => e.key === 'Enter' ? this.geocode() : ''} />
                </Box>
              ) : (
                <Box sx={{ m: 2 }} >
                  this.addAPIErrors(
                  this.state.GeocodioAPIState,
                  'Geocodio',
                  '/docs'
                  )
                </Box>
              )}
            </div>
            <Box sx={{ m: 2 }} >
              <Select<string[]>
                multiple
                value={this.state.SelectedVariables}
                label="Variables"
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                MenuProps={{ PaperProps: { style: { maxHeight: '50%' } } }}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value: any) => (
                      <Chip
                        key={value}
                        label={`${this.state.Variables[value].name} (${this.state.Variables[value].level})`}
                      />
                    ))}
                  </Box>
                )}
                onChange={(e) => this.onVariableChange(e)}
              >
                {variableOptions}
              </Select>

              <Button onClick={(e) => this.geocode()} sx={{ mt: { xs: 2, md: 0 }, ml: { md: 2 } }} >Load Forecast</Button>
            </Box>
            <Box sx={{ m: 2 }} >
              <HeroShellVals currentHero={this.state.DisplayHero}>
                <HeroDataVals herovals={this.state.HeroVals} currentHero={this.state.DisplayHero} />
              </HeroShellVals>
            </Box>
            <Box sx={{ m: 2 }} >
              <CurrentVals currentvals={this.state.CurrentVals}></CurrentVals>
            </Box>
            <Box sx={{ m: 2 }} >
              <Charts charts={this.state.ChartStates}>
                {this.addAPIErrors(
                  this.state.HabistackAPIState,
                  'Habistack',
                  '/docs'
                )}
              </Charts>
            </Box>
          </div>
        ) : (
          <Box sx={{ m: 2 }} >
            this.addAPIErrors(this.state.HabistackAPIState, 'Habistack', '/docs')
          </Box>
        )}

        <div>
          <Box sx={{ m: 2 }} >
            <CurrentVals currentvals={this.state.DeviceCurrentVals}></CurrentVals>
          </Box>
          <Box sx={{ m: 2 }} >
            <Charts charts={this.state.DeviceChartStates}>
              {this.addAPIErrors(
                this.state.IoTEnsembleAPIState,
                'IoT Ensemble',
                '/docs'
              )}
            </Charts>
          </Box>
        </div>
        <Footer />
        {/* <div>{JSON.stringify(this.state.Error, null, 4)}</div> */}

      </div>
    );
  }
  //#endregion

  protected addAPIErrors(
    apiState: number | undefined,
    apiName: string,
    docsLink: string
  ) {
    return (
      <Box
        sx={{ mt: 12 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width='100%'
      ><Card sx={{ p: 3, width: '100%' }} >
          {apiState === 401 ? (
            <>
              <FathymLogoSad sx={{ color: "blue", fontSize: 50 }} />
              <h3>The security key for the {apiName} API is not configured correctly.</h3>
            </>
          ) : apiState === 404 ? (
            <>
              <FathymLogoSad sx={{ color: "blue", fontSize: 50 }} />
              <h3>The {apiName} API is not configured correctly.</h3>
            </>
          ) : apiState === 500 ? (
            <>
              <FathymLogoMad sx={{ color: "red", fontSize: 50 }} />
              <h3>There was an error calling the {apiName} API.</h3>
            </>
          ) : apiState === 503 ? (
            <>
              <FathymLogoMad sx={{ color: "red", fontSize: 50 }} />
              <h3>There was an error calling the {apiName} API.</h3>
            </>
          ) : (
            <>
              <FathymLogo color="primary" sx={{ fontSize: 50 }} />
              <h3>Loading {apiName}... {apiState}</h3>
            </>
          )}
          <Link href={docsLink} rel="noreferrer" target="_blank" >Check out our docs.</Link>
        </Card>
      </Box>
    );
  }

  //#region API Methods
  //#endregion

  //#region Helpers
  protected appDark(): void {

    var darkness = false;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    mql.matches ? darkness = true : darkness = false;
    this.setState({ IsDark: darkness });

    mql.addEventListener("change", (event) => {
      mql.matches ? darkness = true : darkness = false;
      this.setState({ IsDark: darkness })
    });
  }

  public setAppDark(darkness: boolean) {
    this.setState({ IsDark: darkness })
  }

  protected addChartPref(chartState: ChartState): void {
    var currentDefaultChartPref: any = {};

    this.state.IsDark && currentDefaultChartPref !== undefined ?
      currentDefaultChartPref = this.state.DefaultChartPrefs.find((e: any) => e.Mode === "Dark")
      : currentDefaultChartPref = this.state.DefaultChartPrefs.find((e: any) => e.Mode === "Light")

    const currentChartPref = this.state.ChartPrefs.find(
      (e: any) => e.Name === chartState.Datasets[0].label
    );

    if (currentDefaultChartPref !== undefined) {
      Object.keys(currentDefaultChartPref).forEach((key) => {
        // Chartjs properties must have a lower case initial letter
        const fixedKey =
          key.toString().charAt(0).toLowerCase() + key.substring(1);
        chartState.Datasets[0][fixedKey] = currentDefaultChartPref[key];

        // Pass Options
        chartState.Datasets[0].options = currentDefaultChartPref?.Options;
      });

      if (currentChartPref !== undefined) {
        const currentCombined = { ...currentDefaultChartPref, ...currentChartPref }
        const defaultOptions = currentDefaultChartPref["Options"];
        const chartOptions = currentChartPref["Options"];

        const currentCombinedOptions = _.merge(chartOptions, defaultOptions);

        Object.keys(currentCombined).forEach(key => {

          // Chartjs properties must have a lower case initial letter
          const fixedKey = key.toString().charAt(0).toLowerCase() + key.substring(1);
          chartState.Datasets[0][fixedKey] = currentCombined[key];

          // Pass Options
          chartState.Datasets[0].options = currentCombinedOptions;

        });
      }
    }
  }

  protected convertUnits(chartState: ChartState): void {
    const currentChartPref = this.state.ChartPrefs.find(
      (pref: any) => pref.Name === chartState.Datasets[0].label
    );

    var currentConvertUnits: any = {};

    currentConvertUnits = currentChartPref?.ConvertUnits;

    if (currentConvertUnits !== undefined) {
      const currentUnitChartPref: keyof typeof convertUnitsTo = currentChartPref.ConvertUnits;
      const data = chartState.Datasets[0].data;

      Object.values(data).forEach((dataPoint: any) => {
        dataPoint.y = convertUnitsTo[currentUnitChartPref](dataPoint.y);
      });
    }
  }


  protected geocode(): void {
    const location = encodeURIComponent(this.state.Location.Name);

    const geocodeApi = `${this.geocodioSvcUrl}${this.geocodioQuery}?q=${location}&fields=timezone`;

    fetch(geocodeApi)
      .then((res) => this.handleApiResponse(res))
      .then(
        (result) => {
          this.setState(
            {
              Location: {
                Data: result,
                Name: result.results[0].formatted_address,
                Latitude: result.results[0].location.lat,
                Longitude: result.results[0].location.lng,
                Timezone: result.results[0].fields.timezone.utc_offset,
                DaylightSavings: result.results[0].fields.timezone.observes_dst,
              },
              Error: undefined,
              GeocodioAPIState: undefined
            },
            () => {
              this.loadCharts();
            }
          );
        },
        (error) => {
          console.log(error);

          var resp = error.message.startsWith('{')
            ? JSON.parse(error.message)
            : {};

          this.setState({
            Error: error.message,
            GeocodioAPIState: resp.Status,
          });
        }
      );
  }

  protected handleApiResponse(res: Response) {
    if (res.ok === false) {
      throw new Error(
        JSON.stringify({
          Status: res.status,
          Text: res.statusText,
        })
      );
    } else {
      return res.json();
    }
  }

  protected loadCharts(): void {
    const variables: any[] = this.state.SelectedVariables.map((sv) => {
      const variable = this.state.Variables[sv];

      return {
        name: variable.name,
        level: variable.level,
      };
    });

    const hourSeconds = 3600;

    const hours = 24;

    let pointSeconds = Array.apply(null, Array(hours));

    pointSeconds = pointSeconds.map((v, i) => {
      return hourSeconds * i;
    });

    console.log(pointSeconds);

    const points: any[] = pointSeconds.map((ps) => {
      return {
        lat: this.state.Location.Latitude,
        lng: this.state.Location.Longitude,
        'relative-seconds': ps,
      };
    });

    this.loadPointsData(variables, points);
  }

  protected loadIoTData(): void {
    const iotApi = `${this.iotSvcUrl}${this.iotSvcQuery}includeEmulated=${this.iotEmulated}${this.iotPages}`;

    fetch(iotApi)
      .then((res) => this.handleApiResponse(res))
      .then(
        (result) => {
          const payloads = result.Payloads as any[];

          const devicesReadingcharts = payloads.reduce((dr, payload, i) => {
            const newDr = {
              ...dr,
            };

            if (!newDr[payload.DeviceID]) {
              newDr[payload.DeviceID] = {};
            }

            const sensorReadings = Object.keys(payload?.SensorReadings || {});

            sensorReadings.forEach((srKey) => {
              if (!newDr[payload.DeviceID][srKey]) {
                newDr[payload.DeviceID][srKey] = new ChartState();

                newDr[payload.DeviceID][srKey].Datasets = [
                  {
                    id: 1,
                    label: srKey,
                    data: [],
                  },
                ];
              }

              const date = new Date(Date.parse(payload?.EventProcessedUtcTime));
              // const date = new Date(Date.parse(payload?.Timestamp));

              newDr[payload.DeviceID][srKey].Datasets[0].data.unshift({
                x: date.toLocaleString(),
                y: payload?.SensorReadings[srKey],
              });

              // Set Chart Preferences
              this.addChartPref(newDr[payload.DeviceID][srKey]);
              this.convertUnits(newDr[payload.DeviceID][srKey]);

            });

            return newDr;
          }, {});

          const deviceIds = Object.keys(devicesReadingcharts);

          const curDevice = deviceIds[0];

          this.setState({
            CurrentDevice: curDevice,
            DeviceChartStates: devicesReadingcharts[curDevice],
            DeviceCurrentVals: devicesReadingcharts[curDevice],
            Error: undefined,
            IoTEnsembleAPIState: undefined
          });
        },
        (error) => {
          console.log(error);

          var resp = error.message.startsWith('{')
            ? JSON.parse(error.message)
            : {};

          this.setState({
            Error: error.message,
            IoTEnsembleAPIState: resp.Status,
          });
        }
      );
  }

  protected loadPointsData(variables: any[], points: any[]): void {
    const pointsApi = `${this.habistackSvcUrl}${this.pointsSvcQuery}`;

    fetch(pointsApi, {
      method: 'POST',
      body: JSON.stringify({
        variables: variables,
        points: points,
      }),
    })
      .then((res) => this.handleApiResponse(res))
      .then(
        (result) => {
          const variableResults = result as any[];

          const variableCharts = variableResults.reduce(
            (vc, variableResult, i) => {
              const newVc = {
                ...vc,
              };

              const variableKey = `${variableResult.name}_${variableResult.level}`;

              if (!newVc[variableKey]) {
                newVc[variableKey] = new ChartState();
              }

              newVc[variableKey].Datasets = [
                {
                  id: 1,
                  label: `${variableResult.name} (${variableResult.level})`,
                  data: variableResult.values.map((value: any, i: number) => {
                    var currentDate = new Date()
                    var currentHours = (currentDate.getUTCHours() + this.state.Location.Timezone)
                    if(this.state.Location.DaylightSavings) {
                      currentHours += 1
                    }
                    var currentMins = (currentDate.getMinutes() < 10) ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
                    var completeTime = ""
                    if((currentHours + i < 24)) {
                     completeTime = (currentHours + i) + ":" + currentMins
                    } else {
                     completeTime = (currentHours + i -24) + ":" + currentMins
                    }
                    return {
                      /* x: i > 0 ? `${i}hr` : 'Now', */
                      x: i > 0 ? `${completeTime}` : 'Now',
                      y: value,
                    };
                  }),
                },
              ];

              // Set Chart Preferences
              this.addChartPref(newVc[variableKey]);
              this.convertUnits(newVc[variableKey]);

              return newVc;
            },
            {});

          this.setState({
            ChartStates: variableCharts,
            CurrentVals: variableCharts,
            HeroVals: variableCharts,
            Error: undefined,
            HabistackAPIState: undefined,
          });
        },
        (error) => {
          console.log(error);

          var resp = error.message.startsWith('{')
            ? JSON.parse(error.message)
            : {};

          this.setState({
            Error: error.message,
            HabistackAPIState: resp.Status,
          });
        }
      );
  }

  protected loadVariablesData(): void {
    const variablesApi = `${this.habistackSvcUrl}${this.variablesSvcQuery}`;

    fetch(variablesApi)
      .then((res) => this.handleApiResponse(res))
      .then(
        (result) => {
          const variables = result as any[];

          const variableOptions = variables.reduce((vars, variable, i) => {
            const newVar: any = {
              ...vars,
            };

            const variableKey: string = `${variable.name}_${variable.level}`;

            if (!newVar[variableKey]) {
              newVar[variableKey] = {};
            }

            newVar[variableKey].name = variable.name;

            newVar[variableKey].doc = variable.doc;

            newVar[variableKey].level = variable.level;

            newVar[variableKey].units = variable.units;

            return newVar;
          }, {});

          this.setState(
            {
              // CurrentDevice: curDevice,
              Variables: variableOptions,
              Error: undefined,
              HabistackAPIState: undefined,
            },
            () => {
              this.geocode();
            }
          );
        },
        (error: Error) => {
          console.log(error);

          var resp = error.message.startsWith('{')
            ? JSON.parse(error.message)
            : {};

          this.setState({
            Error: error.message,
            HabistackAPIState: resp.Status,
          });
        }
      );
  }

  protected onLocationChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    this.setState({
      Location: {
        ...this.state.Location,
        Name: event.target.value,
      },
    });
  }

  protected onVariableChange(event: SelectChangeEvent<string[]>): void {
    const selectedVariables = event.target.value as string[];

    this.setState({
      SelectedVariables: selectedVariables,
    });

  }
  //#endregion

}
