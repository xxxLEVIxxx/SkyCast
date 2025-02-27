import { RouterOutlet } from '@angular/router';

import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgForm, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import Windbarb from 'highcharts/modules/windbarb';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { OverlayModule } from '@angular/cdk/overlay';
import { map, startWith, switchMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { environment } from '../../environment';

HighchartsMore(Highcharts);
Windbarb(Highcharts);

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    HighchartsChartModule,
    GoogleMapsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    OverlayModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  nextWeek: any[] = [];
  tempRange: any[] = [];
  address: string = '';
  weatherCodes: { [key: number]: string[] | string } = {
    0: 'Unknown',
    1000: ['Clear', '/assets/weatherCode/clear_day.svg'],
    1100: ['Mostly Clear', '/assets/weatherCode/mostly_clear_day.svg'],
    1101: ['Partly Cloudy', '/assets/weatherCode/partly_cloudy_day.svg'],
    1102: ['Mostly Cloudy', '/assets/weatherCode/mostly_cloudy.svg'],
    1001: ['Cloudy', '/assets/weatherCode/cloudy.svg'],
    2000: ['Fog', '/assets/weatherCode/fog.svg'],
    2100: ['Light Fog', '/assets/weatherCode/fog_light.svg'],
    4000: ['Drizzle', '/assets/weatherCode/drizzle.svg'],
    4001: ['Rain', '/assets/weatherCode/rain.svg'],
    4200: ['Light Rain', '/assets/weatherCode/rain_light.svg'],
    4201: ['Heavy Rain', '/assets/weatherCode/rain_heavy.svg'],
    5000: ['Snow', '/assets/weatherCode/snow.svg'],
    5001: ['Flurries', '/assets/weatherCode/flurries.svg'],
    5100: ['Light Snow', '/assets/weatherCode/snow_light.svg'],
    5101: ['Heavy Snow', '/assets/weatherCode/snow_heavy.svg'],
    6000: ['Freezing Drizzle', '/assets/weatherCode/freezing_drizzle.svg'],
    6001: ['Freezing Rain', '/assets/weatherCode/freezing_rain.svg'],
    6200: [
      'Light Freezing Rain',
      '/assets/weatherCode/freezing_rain_light.svg',
    ],
    6201: [
      'Heavy Freezing Rain',
      '/assets/weatherCode/freezing_rain_heavy.svg',
    ],
    7000: ['Ice Pellets', '/assets/weatherCode/ice_pellets.svg'],
    7101: ['Heavy Ice Pellets', '/assets/weatherCode/ice_pellets_heavy.svg'],
    7102: ['Light Ice Pellets', '/assets/weatherCode/ice_pellets_light.svg'],
    8000: ['Thunderstorm', '/assets/weatherCode/tstorm.svg'],
  };
  hourly: any[] = [];
  hourlyTemp: any[] = [];
  hourlyHumidity: any[] = [];
  hourlyPressure: any[] = [];
  hourlyWindSpeed: any[] = [];
  activeIndex: number = 1;
  favoritesArr: any[] = [];
  city: string = '';
  state: string = '';
  states: Record<string, string> = {
    AL: 'Alabama',
    AK: 'Alaska',
    AZ: 'Arizona',
    AR: 'Arkansas',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    HI: 'Hawaii',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    IA: 'Iowa',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    ME: 'Maine',
    MD: 'Maryland',
    MA: 'Massachusetts',
    MI: 'Michigan',
    MN: 'Minnesota',
    MS: 'Mississippi',
    MO: 'Missouri',
    MT: 'Montana',
    NE: 'Nebraska',
    NV: 'Nevada',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NY: 'New York',
    NC: 'North Carolina',
    ND: 'North Dakota',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VT: 'Vermont',
    VA: 'Virginia',
    WA: 'Washington',
    WV: 'West Virginia',
    WI: 'Wisconsin',
    WY: 'Wyoming',
  };
  sortedStates: string[] = [];

  center = { lat: 0, lng: 0 };
  zoom: number = 14.8;
  options: google.maps.MapOptions = {};
  showMap: boolean = false;
  markers = [{ position: { lat: 0, lng: 0 } }];

  detailActiveIndex: number = 0;

  isResultsCol: boolean = true;
  showResults: boolean = false;
  getWeeklyDone: boolean = false;
  getHourlyDone: boolean = false;
  showDanger: boolean = false;
  isFavorite: boolean = false;

  testMap: boolean = false;
  isSearching: boolean = false;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions1: Highcharts.Options = {};
  chartOptions2: Highcharts.Options = {};
  @ViewChild('danger') danger!: ElementRef;
  @ViewChild('chart2') chart!: ElementRef;
  @ViewChild('state') stateInput!: ElementRef;
  @ViewChild('resultPanel') resultPanel!: ElementRef;

  storeArr: any[] = [];
  myForm!: FormGroup;
  private textOptionsSubject = new BehaviorSubject<string[]>([]);
  textOptions$ = this.textOptionsSubject.asObservable();

  ngOnInit() {
    this.getFavorites();
    this.myForm = new FormGroup({
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
    });
    this.filteredOptions = this.myForm.get('city')!.valueChanges.pipe(
      startWith(''),
      switchMap((value) =>
        this.textOptions$.pipe(
          map((textOptions) => this._filter(value || '', textOptions))
        )
      )
    );
    this.sortedStates = Object.keys(this.states)
      .sort()
      .map((code) => this.states[code]);
  }

  setActiveTab(index: number): void {
    this.activeIndex = index;
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      console.log(this.city, this.state);

      const url = 'https://csci571-436414.wl.r.appspot.com/api/data/';
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: String(this.city),
          state: String(this.state),
          address: String(this.address),
        }),
      })
        .then((response) => {
          if (response.status !== 200) {
            this.showDanger = true;
            this.danger.nativeElement.style.display = 'block';
            return Promise.reject('Non-200 status code');
          } else {
            return response.json();
          }
        })
        .then((data) => {
          this.getFavorites();
        });
    } else {
      for (let i = 0; i < this.favoritesArr.length; i++) {
        if (this.address === this.favoritesArr[i].address) {
          this.deleteFavorite(i);
        }
      }
    }
  }

  onSubmit(input: HTMLInputElement) {
    this.isSearching = true;

    if (!input.checked) {
      // console.log('Form Submitted:', form.value);
      const street = this.myForm.get('street')!.value;
      const city = this.myForm.get('city')!.value;
      const state = this.myForm.get('state')!.value;
      let lat, lon;
      const google_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${street},${city},${state}&key=${environment.GOOGLE_API_KEY}`;

      fetch(google_url)
        .then((response) => {
          if (response.status !== 200) {
            this.showDanger = true;
            this.danger.nativeElement.style.display = 'block';
            return Promise.reject('Non-200 status code');
          } else {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          if (data.status === 'ZERO_RESULTS') {
            this.showDanger = true;
            this.danger.nativeElement.style.display = 'block';
          } else {
            lat = data.results[0].geometry.location.lat;
            lon = data.results[0].geometry.location.lng;
            this.center.lat = Number(lat);
            this.center.lng = Number(lon);
            this.markers[0].position.lat = Number(lat);
            this.markers[0].position.lng = Number(lon);
            console.log(this.center);
            console.log(this.markers[0].position);
            this.showMap = true;

            const formatted_address =
              data.results[0].formatted_address.split(',');
            console.log(formatted_address);
            if (formatted_address.length === 3) {
              this.city = formatted_address[0].trim();
              this.state =
                this.states[formatted_address[1].trim().split(' ')[0]];
            } else if (formatted_address.length === 4) {
              this.city = formatted_address[1].trim();
              this.state =
                this.states[formatted_address[2].trim().split(' ')[0]];
            }
            this.address = this.city + ', ' + this.state;
            console.log(lat, lon, this.address);
            this.getNextWeek(lat, lon);
            this.getHourly(lat, lon);
            this.showElement();
            this.getFavorites();
          }
        });
      //testcode
    } else {
      const ip_url = `https://ipinfo.io/?token=${environment.IPINFO_API_KEY}`;
      let lat, lon;

      fetch(ip_url)
        .then((response) => {
          if (response.status !== 200) {
            this.showDanger = true;
            this.danger.nativeElement.style.display = 'block';
            return Promise.reject('Non-200 status code');
          } else {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          lat = data.loc.split(',')[0];
          lon = data.loc.split(',')[1];
          this.center.lat = Number(lat);
          this.center.lng = Number(lon);
          this.markers[0].position.lat = Number(lat);
          this.markers[0].position.lng = Number(lon);
          // console.log(this.center);
          // console.log(this.markers[0].position);
          this.showMap = true;
          this.address = data.city + ', ' + data.region;
          // console.log(lat, lon, this.address);
          this.city = data.city;
          this.state = data.region;
          // console.log(this.city, this.state);
          this.getNextWeek(lat, lon);
          this.getHourly(lat, lon);
          this.showElement();
          this.getFavorites();
        });
    }
    this.isFavorite = false;
  }

  onBlur(input: HTMLInputElement, div: HTMLElement) {
    if (input.value === '') {
      input.style.border = '1px solid #d00011';
      div.style.display = 'block';
    } else {
      input.style.border = '1px solid #dee2e6';
      div.style.display = 'none';
    }
  }

  onBlur2(input: HTMLInputElement) {
    if (input.value === '') {
      input.style.border = '1px solid #d00011';
    } else {
      input.style.border = '1px solid #dee2e6';
    }
  }

  onInput(input: HTMLInputElement) {
    if (input.value === '') {
      input.style.border = '1px solid red';
    } else {
      input.style.border = '1px solid #dee2e6';
    }
  }

  onCityInput(input: HTMLInputElement) {
    let url =
      'https://csci571-436414.wl.r.appspot.com/api/auto?input=' + input.value;
    fetch(url, {
      headers: {
        'x-requested-with': 'XMLHttpRequest',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          this.showDanger = true;
          this.danger.nativeElement.style.display = 'block';
          return Promise.reject('Non-200 status code');
        } else {
          return response.text();
        }
      })
      .then((data) => {
        const jsonData = JSON.parse(data);

        this.textOptions = [];
        this.storeArr = [];
        for (let i = 0; i < jsonData.predictions.length; i++) {
          // console.log(jsonData.predictions[i].description.split(',')[0]);
          let city = jsonData.predictions[i].description.split(',')[0];
          let state = jsonData.predictions[i].description.split(',')[1];
          this.storeArr.push([city, state]);
        }

        const cityCountMap: { [city: string]: number } = {};
        for (const [city] of this.storeArr) {
          cityCountMap[city] = (cityCountMap[city] || 0) + 1;
        }

        const textOptions = this.storeArr.map(([city, state]) =>
          cityCountMap[city] > 1 ? `${city}, ${state}` : city
        );
        this.textOptionsSubject.next(textOptions);
      });
  }

  onCheckboxChange(input: HTMLInputElement) {
    if (input.checked) {
      this.myForm.get('street')?.disable();
      this.myForm.get('city')?.disable();
      this.myForm.get('state')?.disable();
      // Disable validators for city, street, and state when checkbox is checked
      this.myForm.get('street')?.clearValidators();
      this.myForm.get('city')?.clearValidators();
      this.myForm.get('state')?.clearValidators();
    } else {
      this.myForm.get('street')?.enable();
      this.myForm.get('city')?.enable();
      this.myForm.get('state')?.enable();

      // Enable validators for city, street, and state when checkbox is unchecked
      this.myForm.get('street')?.setValidators(Validators.required);
      this.myForm.get('city')?.setValidators(Validators.required);
      this.myForm.get('state')?.setValidators(Validators.required);
    }
    this.myForm.get('street')?.updateValueAndValidity();
    this.myForm.get('city')?.updateValueAndValidity();
    this.myForm.get('state')?.updateValueAndValidity();
  }

  onClear(checkbox: HTMLInputElement) {
    this.myForm.reset({
      street: '',
      city: '',
      state: '',
    });
    if (checkbox.checked) {
      checkbox.checked = false;
      const event = new Event('change');
      checkbox.dispatchEvent(event);
    }
    this.showMap = false;
    this.showResults = false;
    this.getWeeklyDone = false;
    this.getHourlyDone = false;
    this.tempRange = [];
    this.hourlyTemp = [];
    this.hourlyHumidity = [];
    this.hourlyPressure = [];
    this.hourlyWindSpeed = [];
    this.chartOptions1 = {};
    this.chartOptions2 = {};
    this.address = '';
    this.showDanger = false;
    this.activeIndex = 1;
    this.detailActiveIndex = 0;
    this.testMap = false;
    this.toggleResultsCol(true);
    this.isSearching = false;
  }
  toggleResultsCol(bool: boolean) {
    if (bool) {
      this.testMap = false;
    }

    this.isResultsCol = bool;
    if (bool) {
      setTimeout(() => {
        this.onDetail(this.resultPanel.nativeElement);
      }, 500);
      setTimeout(() => {
        this.testMap = true;
      }, 1000);
    }
  }

  getNextWeek(lat: number, lon: number) {
    const weather_url =
      'https://csci571-436414.wl.r.appspot.com/api/nextweek?lat=' +
      lat +
      '&lon=' +
      lon;
    fetch(weather_url)
      .then((response) => {
        if (response.status !== 200) {
          this.showDanger = true;
          this.danger.nativeElement.style.display = 'block';
          return Promise.reject('Non-200 status code');
        }

        return response.json();
      })
      .then((data) => {
        this.nextWeek = data;
        console.log(this.nextWeek);
        for (const day of this.nextWeek) {
          this.tempRange.push([
            new Date(day.startTime).getTime(),
            day.values.temperatureMin,
            day.values.temperatureMax,
          ]);
        }
        console.log(this.tempRange);
        this.chartOptions1 = {
          chart: {
            type: 'arearange',
            zooming: {
              type: 'x',
            },
          },
          title: {
            text: 'Temperature Range(Min, Max)',
          },
          tooltip: {
            shared: true,
            valueSuffix: '°F',
            xDateFormat: '%A, %b %e',
          },
          xAxis: [
            {
              type: 'datetime',
              accessibility: {
                rangeDescription: 'Range: Jan 1st 2017 to Dec 31 2017.',
              },
            },
          ],
          yAxis: [
            {
              title: {
                text: null,
              },
            },
          ],
          credits: {
            text: 'Forecast',
            position: {
              x: -35,
            },
          },
          legend: { enabled: false },
          series: [
            {
              data: this.tempRange,
              type: 'arearange',
              color: {
                linearGradient: {
                  x1: 0,
                  x2: 0,
                  y1: 0,
                  y2: 1,
                },
                stops: [
                  [0, 'rgba(255, 165, 0, 1)'],
                  [1, 'rgba(135, 206, 250, 1)'],
                ],
              },
              lineColor: '#53B1E8',
              marker: {
                enabled: true,
                fillColor: 'rgba(44, 156, 252, 1)',
              },
              tooltip: {
                pointFormat:
                  '<span style="color:{point.color}">\u25CF</span> ' +
                  'Temperature: <b>{point.low} - {point.high}</b><br/>',
              },
            },
          ],
        };

        this.getWeeklyDone = true;
        if (this.getWeeklyDone && this.getHourlyDone) {
          this.showResults = true;
          this.isSearching = false;
        }
      });
  }

  getHourly(lat: number, lon: number) {
    const weather_url =
      'https://csci571-436414.wl.r.appspot.com/api/hourly?lat=' +
      lat +
      '&lon=' +
      lon;
    fetch(weather_url)
      .then((response) => {
        if (response.status !== 200) {
          this.showDanger = true;
          this.danger.nativeElement.style.display = 'block';

          return Promise.reject('Non-200 status code');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.hourly = data;
        // console.log(this.hourly);
        this.hourlyTemp = this.hourly.map((hour) => [
          new Date(hour.startTime).getTime(),
          hour.values.temperature,
        ]);
        // console.log(this.hourlyTemp);
        this.hourlyHumidity = this.hourly.map((hour) => [
          new Date(hour.startTime).getTime(),
          Math.round(hour.values.humidity),
        ]);
        // console.log(this.hourlyHumidity);
        this.hourlyPressure = this.hourly.map((hour) => [
          new Date(hour.startTime).getTime(),
          hour.values.pressureSeaLevel,
        ]);
        // console.log(this.hourlyPressure);
        this.hourlyWindSpeed = this.hourly
          .map((hour, index) => {
            if (index % 2 === 0) {
              return [
                new Date(hour.startTime).getTime(),
                hour.values.windSpeed, // Wind speed
                hour.values.windDirection, // W
              ];
            }
            return null;
          })
          .filter((hour) => hour !== null);
        // console.log(this.hourlyWindSpeed);
        this.chartOptions2 = {
          chart: {
            zooming: {
              type: 'x',
            },
            scrollablePlotArea: {
              minWidth: 768, // Set minimum width to make it scrollable on smaller screens
              scrollPositionX: 0, // Start scrolling position
            },
          },
          title: {
            text: 'Hourly Weather (For Next 5 Days)',
          },
          xAxis: [
            {
              // Bottom X axis
              type: 'datetime',
              tickInterval: 2 * 36e5, // two hours
              minorTickInterval: 36e5, // one hour
              tickLength: 0,
              startOnTick: false,
              endOnTick: false,
              offset: 28,
              showLastLabel: true,
              labels: {
                format: '{value:%H}',
              },
              crosshair: true,
            },
            {
              // Top X axis
              linkedTo: 0,
              type: 'datetime',
              tickInterval: 24 * 3600 * 1000,
              labels: {
                format:
                  '{value:<span style="font-size: 12px; font-weight: ' +
                  'bold">%a</span> %b %e}',
                align: 'left',
                x: 2,
                y: -3,
              },
              opposite: true,
              tickLength: 20,
              gridLineWidth: 1,
            },
          ],
          yAxis: [
            {
              floor: 0,
              ceiling: 100,
              min: 0,
              max: 100,
              title: {
                text: null,
              },
              // temperature axis
              labels: {
                format: '{value}°',
                style: {
                  fontSize: '8px',
                },
                x: -3,
              },
              tickInterval: 10,
              gridLineColor: 'rgba(128, 128, 128, 0.1)',
            },
            {
              allowDecimals: false,
              title: {
                // Title on top of axis
                text: 'inHg',
                offset: 0,
                align: 'high',
                rotation: 0,
                style: {
                  fontSize: '10px',
                  color: '#E8B058',
                },
                textAlign: 'left',
                x: 3,
              },
              labels: {
                enabled: false, // Hide all labels on the second y-axis
              },
              plotLines: [
                {
                  color: '#E8B058', // Gold color for the plotline
                  width: 0,
                  value: 29, // The value where the plotline is drawn (like 29 inHg)
                  dashStyle: 'Dash', // Dashed line style
                  zIndex: 3, // Make sure the line is above the chart series
                  label: {
                    text: '29', // Label next to the plotline
                    align: 'right',
                    x: 12,
                    y: 0,
                    style: {
                      color: '#E8B058',
                      fontSize: '8px',
                    },
                  },
                },
              ],
              min: 0,
              max: 60,
              gridLineWidth: 0,
              opposite: true,
              showLastLabel: false,
            },
          ],
          legend: { enabled: false },
          tooltip: {
            shared: true,
            useHTML: true,
            headerFormat:
              '<small>{point.x:%A, %b %e, %H:%M} ' +
              '{point.point.to:%H:%M}</small><br>' +
              '<b>{point.point.symbolName}</b><br>',
          },
          plotOptions: {
            spline: {
              marker: {
                enabled: true,
              },
            },
            column: {
              pointPadding: 0,
              borderWidth: 1,
              groupPadding: 0,
              shadow: false,
            },
            windbarb: {
              dataGrouping: {
                enabled: true,
                groupPixelWidth: 12,
              },
            },
          },
          series: [
            {
              data: this.hourlyTemp,
              type: 'spline',
              color: '#FF3333',
              marker: {
                enabled: false,
              },
              tooltip: {
                pointFormat:
                  '<span style="color:{point.color}">\u25CF</span>' +
                  ' ' +
                  'Temperature: <b> ' +
                  '{point,y} °F</b><br/>',
              },
              zIndex: 3,
            },
            {
              data: this.hourlyHumidity,
              type: 'column',
              color: 'rgb(135, 213, 253)',
              dataLabels: {
                enabled: true, // Enable the data labels
                inside: false, // Display them outside the columns (on top)
                align: 'center', // Align the labels in the center of each column
                verticalAlign: 'bottom', // Align them at the top of the column
                style: {
                  fontSize: '8px', // Font size for the data labels
                  color: '#000000', // Text color (black in this case)
                  fontWeight: 'bold', // Optional: make the text bold
                },
              },

              tooltip: {
                pointFormat:
                  '<span style="color:{point.color}">\u25CF</span>' +
                  ' ' +
                  'Humidity: <b> ' +
                  '{point.y} %</b><br/>',
              },
              zIndex: 1,
            },
            {
              data: this.hourlyPressure,
              type: 'spline',
              dashStyle: 'ShortDot',
              color: 'rgb(234,198,127)',
              yAxis: 1,
              marker: { enabled: false },
              tooltip: {
                pointFormat:
                  '<span style="color:{point.color}">\u25CF</span>' +
                  ' ' +
                  'Air pressure: <b> ' +
                  '{point.y} inHg</b><br/>',
              },
              zIndex: 2,
            },
            {
              name: 'Wind',
              type: 'windbarb', // Define the series as windbarb
              id: 'windbarbs', // Give the series an id for easier access
              data: this.hourlyWindSpeed,
              color: 'rgb(234,198,127)', // Optional: set wind barb color
              lineWidth: 1,
              vectorLength: 8,
              zIndex: 4, // Keep wind barbs on top
              xAxis: 0, // Use the first x-axis (time)
              yAxis: 0, // Use the first y-axis (temperature/humidity) or a new one
              tooltip: {
                valueSuffix: ' mph',
              },
            },
          ],
        };

        this.getHourlyDone = true;
        if (this.getWeeklyDone && this.getHourlyDone) {
          this.showResults = true;
          this.isSearching = false;
        }
      });
  }

  onDetail(element: HTMLDivElement) {
    if (element.classList.contains('out')) {
      element.classList.remove('out');
      element.classList.add('in');
    } else {
      element.classList.remove('in');
      element.classList.add('out');
    }
    this.activeIndex = 1;
  }

  setDayIndex(index: number) {
    this.detailActiveIndex = index;
  }

  getFavorites() {
    const favorite_url = 'https://csci571-436414.wl.r.appspot.com/api/data';
    fetch(favorite_url)
      .then((response) => {
        if (response.status !== 200) {
          this.showDanger = true;
          this.danger.nativeElement.style.display = 'block';
          return Promise.reject('Non-200 status code');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        this.favoritesArr = data;
        for (let i = 0; i < this.favoritesArr.length; i++) {
          if (this.address === this.favoritesArr[i].address) {
            this.isFavorite = true;
            break;
          }
        }
      });
  }
  deleteFavorite(index: number) {
    const delete_url =
      'https://csci571-436414.wl.r.appspot.com/api/data/' +
      this.favoritesArr[index]._id;
    fetch(delete_url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          this.showDanger = true;
          this.danger.nativeElement.style.display = 'block';
          return Promise.reject('Non-200 status code');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        this.getFavorites();
      });
  }

  isVisible = false;

  showElement() {
    this.isVisible = true;

    setTimeout(() => {
      this.isVisible = false;
      this.onDetail(this.resultPanel.nativeElement);
    }, 500); // 0.5 seconds
    setTimeout(() => {
      this.testMap = true;
    }, 1000);
  }
  textOptions: string[] = [];
  filteredOptions!: Observable<string[]>;

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    // if (this.textOptions.length === 0) {
    //   return this.textOptions;
    // } else {
    return options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
    // }
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedCity = event.option.value;

    if (selectedCity.includes(',')) {
      this.myForm.get('city')!.setValue(selectedCity.split(',')[0].trim());
      this.myForm
        .get('state')!
        .setValue(this.states[selectedCity.split(',')[1].trim()]);
      this.myForm.get('state')!.markAsDirty();
      this.myForm.get('state')!.markAsTouched();
    }
  }

  updateValidity() {
    this.myForm.get('street')?.updateValueAndValidity();
    this.myForm.get('city')?.updateValueAndValidity();
    this.myForm.get('state')?.updateValueAndValidity();
  }

  onFavoriteClick(city: string, state: string) {
    this.city = city;
    this.state = state;
    this.showMap = false;
    this.showResults = false;
    this.getWeeklyDone = false;
    this.getHourlyDone = false;
    this.tempRange = [];
    this.hourlyTemp = [];
    this.hourlyHumidity = [];
    this.hourlyPressure = [];
    this.hourlyWindSpeed = [];
    this.chartOptions1 = {};
    this.chartOptions2 = {};
    this.address = this.city + ', ' + this.state;
    this.showDanger = false;
    this.activeIndex = 1;
    this.detailActiveIndex = 0;
    this.testMap = false;
    this.isSearching = true;

    let lat, lon;
    const google_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.city},${this.state}&key=${environment.GOOGLE_API_KEY}`;

    fetch(google_url)
      .then((response) => {
        if (response.status !== 200) {
          this.showDanger = true;
          this.danger.nativeElement.style.display = 'block';
          return Promise.reject('Non-200 status code');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data.status === 'ZERO_RESULTS') {
          this.showDanger = true;
          this.danger.nativeElement.style.display = 'block';
        } else {
          lat = data.results[0].geometry.location.lat;
          lon = data.results[0].geometry.location.lng;
          this.center.lat = Number(lat);
          this.center.lng = Number(lon);
          this.markers[0].position.lat = Number(lat);
          this.markers[0].position.lng = Number(lon);
          console.log(this.center);
          console.log(this.markers[0].position);
          this.showMap = true;

          const formatted_address =
            data.results[0].formatted_address.split(',');
          console.log(formatted_address);
          if (formatted_address.length === 3) {
            this.city = formatted_address[0].trim();
            this.state = this.states[formatted_address[1].trim().split(' ')[0]];
          } else if (formatted_address.length === 4) {
            this.city = formatted_address[1].trim();
            this.state = this.states[formatted_address[2].trim().split(' ')[0]];
          }
          this.address = this.city + ', ' + this.state;
          console.log(lat, lon, this.address);
          this.getNextWeek(lat, lon);
          this.getHourly(lat, lon);
          this.isResultsCol = true;
          this.showElement();
          this.getFavorites();
        }
      });
  }
}
