import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import e from 'express';
import Windbarb from 'highcharts/modules/windbarb';

HighchartsMore(Highcharts);
Windbarb(Highcharts);

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule, CommonModule, HighchartsChartModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent {
  requiredFields = true;
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
  hourlyTest: any[] = [
    {
      startTime: '2024-11-01T00:00:00Z',
      values: {
        humidity: 42,
        pressureSeaLevel: 29.98,
        temperature: 65,
        windDirection: 243.81,
        windSpeed: 7.27,
      },
    },
    {
      startTime: '2024-11-01T01:00:00Z',
      values: {
        humidity: 57.23,
        pressureSeaLevel: 29.98,
        temperature: 61.45,
        windDirection: 256,
        windSpeed: 6.76,
      },
    },
    {
      startTime: '2024-11-01T02:00:00Z',
      values: {
        humidity: 66.59,
        pressureSeaLevel: 30,
        temperature: 58.84,
        windDirection: 258.59,
        windSpeed: 5.71,
      },
    },
    {
      startTime: '2024-11-01T03:00:00Z',
      values: {
        humidity: 76.04,
        pressureSeaLevel: 30,
        temperature: 57.04,
        windDirection: 270.21,
        windSpeed: 4.8,
      },
    },
    {
      startTime: '2024-11-01T04:00:00Z',
      values: {
        humidity: 82.04,
        pressureSeaLevel: 30,
        temperature: 55.32,
        windDirection: 124.93,
        windSpeed: 3.96,
      },
    },
    {
      startTime: '2024-11-01T05:00:00Z',
      values: {
        humidity: 85.09,
        pressureSeaLevel: 30,
        temperature: 53.68,
        windDirection: 107.8,
        windSpeed: 4.48,
      },
    },
    {
      startTime: '2024-11-01T06:00:00Z',
      values: {
        humidity: 86.93,
        pressureSeaLevel: 29.97,
        temperature: 52.78,
        windDirection: 95.07,
        windSpeed: 5.34,
      },
    },
    {
      startTime: '2024-11-01T07:00:00Z',
      values: {
        humidity: 86.04,
        pressureSeaLevel: 29.97,
        temperature: 51.88,
        windDirection: 88.81,
        windSpeed: 5.65,
      },
    },
    {
      startTime: '2024-11-01T08:00:00Z',
      values: {
        humidity: 86.02,
        pressureSeaLevel: 29.97,
        temperature: 51.4,
        windDirection: 83.8,
        windSpeed: 5.9,
      },
    },
    {
      startTime: '2024-11-01T09:00:00Z',
      values: {
        humidity: 85.75,
        pressureSeaLevel: 29.94,
        temperature: 50.83,
        windDirection: 67.8,
        windSpeed: 5.9,
      },
    },
    {
      startTime: '2024-11-01T10:00:00Z',
      values: {
        humidity: 85.45,
        pressureSeaLevel: 29.94,
        temperature: 50.09,
        windDirection: 50.35,
        windSpeed: 5.69,
      },
    },
    {
      startTime: '2024-11-01T11:00:00Z',
      values: {
        humidity: 81.66,
        pressureSeaLevel: 29.94,
        temperature: 50.08,
        windDirection: 38.16,
        windSpeed: 6.13,
      },
    },
    {
      startTime: '2024-11-01T12:00:00Z',
      values: {
        humidity: 76.59,
        pressureSeaLevel: 29.94,
        temperature: 50.08,
        windDirection: 41.8,
        windSpeed: 6.21,
      },
    },
    {
      startTime: '2024-11-01T13:00:00Z',
      values: {
        humidity: 71.77,
        pressureSeaLevel: 29.94,
        temperature: 49.19,
        windDirection: 43.11,
        windSpeed: 6.46,
      },
    },
    {
      startTime: '2024-11-01T14:00:00Z',
      values: {
        humidity: 69.68,
        pressureSeaLevel: 29.94,
        temperature: 48.29,
        windDirection: 45.01,
        windSpeed: 6.46,
      },
    },
    {
      startTime: '2024-11-01T15:00:00Z',
      values: {
        humidity: 65.77,
        pressureSeaLevel: 29.94,
        temperature: 49.19,
        windDirection: 54.28,
        windSpeed: 6.18,
      },
    },
    {
      startTime: '2024-11-01T16:00:00Z',
      values: {
        humidity: 56.66,
        pressureSeaLevel: 29.94,
        temperature: 54.71,
        windDirection: 66.14,
        windSpeed: 5.36,
      },
    },
    {
      startTime: '2024-11-01T17:00:00Z',
      values: {
        humidity: 54.47,
        pressureSeaLevel: 29.94,
        temperature: 59.07,
        windDirection: 86.06,
        windSpeed: 4.83,
      },
    },
    {
      startTime: '2024-11-01T18:00:00Z',
      values: {
        humidity: 48.06,
        pressureSeaLevel: 29.94,
        temperature: 62.75,
        windDirection: 160.56,
        windSpeed: 4.75,
      },
    },
    {
      startTime: '2024-11-01T19:00:00Z',
      values: {
        humidity: 41.29,
        pressureSeaLevel: 29.94,
        temperature: 66.2,
        windDirection: 207.84,
        windSpeed: 5.39,
      },
    },
    {
      startTime: '2024-11-01T20:00:00Z',
      values: {
        humidity: 36.85,
        pressureSeaLevel: 29.91,
        temperature: 68,
        windDirection: 222.54,
        windSpeed: 5.95,
      },
    },
    {
      startTime: '2024-11-01T21:00:00Z',
      values: {
        humidity: 35.05,
        pressureSeaLevel: 29.91,
        temperature: 69.68,
        windDirection: 238.71,
        windSpeed: 6.31,
      },
    },
    {
      startTime: '2024-11-01T22:00:00Z',
      values: {
        humidity: 36.22,
        pressureSeaLevel: 29.89,
        temperature: 69.45,
        windDirection: 254.71,
        windSpeed: 7.28,
      },
    },
    {
      startTime: '2024-11-01T23:00:00Z',
      values: {
        humidity: 40.33,
        pressureSeaLevel: 29.88,
        temperature: 67.96,
        windDirection: 256,
        windSpeed: 7.98,
      },
    },
    {
      startTime: '2024-11-02T00:00:00Z',
      values: {
        humidity: 50.51,
        pressureSeaLevel: 29.88,
        temperature: 64.4,
        windDirection: 256,
        windSpeed: 8.19,
      },
    },
    {
      startTime: '2024-11-02T01:00:00Z',
      values: {
        humidity: 61.32,
        pressureSeaLevel: 29.88,
        temperature: 61.68,
        windDirection: 256,
        windSpeed: 7.62,
      },
    },
    {
      startTime: '2024-11-02T02:00:00Z',
      values: {
        humidity: 70.43,
        pressureSeaLevel: 29.91,
        temperature: 59.81,
        windDirection: 255.84,
        windSpeed: 6.2,
      },
    },
    {
      startTime: '2024-11-02T03:00:00Z',
      values: {
        humidity: 78.04,
        pressureSeaLevel: 29.91,
        temperature: 58.05,
        windDirection: 239.11,
        windSpeed: 5.59,
      },
    },
    {
      startTime: '2024-11-02T04:00:00Z',
      values: {
        humidity: 82.38,
        pressureSeaLevel: 29.91,
        temperature: 56.29,
        windDirection: 158.54,
        windSpeed: 5.03,
      },
    },
    {
      startTime: '2024-11-02T05:00:00Z',
      values: {
        humidity: 86.04,
        pressureSeaLevel: 29.92,
        temperature: 54.91,
        windDirection: 126.18,
        windSpeed: 5.03,
      },
    },
    {
      startTime: '2024-11-02T06:00:00Z',
      values: {
        humidity: 88.02,
        pressureSeaLevel: 29.94,
        temperature: 53.68,
        windDirection: 114.91,
        windSpeed: 5.59,
      },
    },
    {
      startTime: '2024-11-02T07:00:00Z',
      values: {
        humidity: 88.2,
        pressureSeaLevel: 29.94,
        temperature: 52.7,
        windDirection: 103.27,
        windSpeed: 6.2,
      },
    },
    {
      startTime: '2024-11-02T08:00:00Z',
      values: {
        humidity: 89.02,
        pressureSeaLevel: 29.92,
        temperature: 51.81,
        windDirection: 99.27,
        windSpeed: 6.71,
      },
    },
    {
      startTime: '2024-11-02T09:00:00Z',
      values: {
        humidity: 89.84,
        pressureSeaLevel: 29.92,
        temperature: 51.64,
        windDirection: 91.72,
        windSpeed: 7.28,
      },
    },
    {
      startTime: '2024-11-02T10:00:00Z',
      values: {
        humidity: 90,
        pressureSeaLevel: 29.94,
        temperature: 50.98,
        windDirection: 79.72,
        windSpeed: 7.27,
      },
    },
    {
      startTime: '2024-11-02T11:00:00Z',
      values: {
        humidity: 90,
        pressureSeaLevel: 29.91,
        temperature: 51.31,
        windDirection: 83.72,
        windSpeed: 7.27,
      },
    },
    {
      startTime: '2024-11-02T12:00:00Z',
      values: {
        humidity: 89.84,
        pressureSeaLevel: 29.91,
        temperature: 51.71,
        windDirection: 79.72,
        windSpeed: 7.27,
      },
    },
    {
      startTime: '2024-11-02T13:00:00Z',
      values: {
        humidity: 88.02,
        pressureSeaLevel: 29.91,
        temperature: 52.66,
        windDirection: 79.35,
        windSpeed: 7.07,
      },
    },
    {
      startTime: '2024-11-02T14:00:00Z',
      values: {
        humidity: 88,
        pressureSeaLevel: 29.94,
        temperature: 52.78,
        windDirection: 71.72,
        windSpeed: 6.76,
      },
    },
    {
      startTime: '2024-11-02T15:00:00Z',
      values: {
        humidity: 86.02,
        pressureSeaLevel: 29.94,
        temperature: 54.41,
        windDirection: 71.35,
        windSpeed: 6.51,
      },
    },
    {
      startTime: '2024-11-02T16:00:00Z',
      values: {
        humidity: 82.75,
        pressureSeaLevel: 29.94,
        temperature: 56.3,
        windDirection: 86.62,
        windSpeed: 6.43,
      },
    },
    {
      startTime: '2024-11-02T17:00:00Z',
      values: {
        humidity: 65.35,
        pressureSeaLevel: 29.95,
        temperature: 61.88,
        windDirection: 143.28,
        windSpeed: 3.59,
      },
    },
    {
      startTime: '2024-11-02T18:00:00Z',
      values: {
        humidity: 59.44,
        pressureSeaLevel: 29.94,
        temperature: 64.39,
        windDirection: 169.32,
        windSpeed: 4.53,
      },
    },
    {
      startTime: '2024-11-02T19:00:00Z',
      values: {
        humidity: 51.65,
        pressureSeaLevel: 29.93,
        temperature: 66.66,
        windDirection: 178.98,
        windSpeed: 4.66,
      },
    },
    {
      startTime: '2024-11-02T20:00:00Z',
      values: {
        humidity: 45.21,
        pressureSeaLevel: 29.9,
        temperature: 69.03,
        windDirection: 203.2,
        windSpeed: 4.91,
      },
    },
    {
      startTime: '2024-11-02T21:00:00Z',
      values: {
        humidity: 40.92,
        pressureSeaLevel: 29.86,
        temperature: 71.21,
        windDirection: 224.12,
        windSpeed: 7.96,
      },
    },
    {
      startTime: '2024-11-02T22:00:00Z',
      values: {
        humidity: 46.57,
        pressureSeaLevel: 29.85,
        temperature: 68.7,
        windDirection: 221.35,
        windSpeed: 11.79,
      },
    },
    {
      startTime: '2024-11-02T23:00:00Z',
      values: {
        humidity: 51.53,
        pressureSeaLevel: 29.86,
        temperature: 65.64,
        windDirection: 228.12,
        windSpeed: 10.48,
      },
    },
    {
      startTime: '2024-11-03T00:00:00Z',
      values: {
        humidity: 63.47,
        pressureSeaLevel: 29.86,
        temperature: 64.03,
        windDirection: 234.25,
        windSpeed: 7.16,
      },
    },
    {
      startTime: '2024-11-03T01:00:00Z',
      values: {
        humidity: 76.82,
        pressureSeaLevel: 29.86,
        temperature: 60.73,
        windDirection: 238.56,
        windSpeed: 5.62,
      },
    },
    {
      startTime: '2024-11-03T02:00:00Z',
      values: {
        humidity: 85.8,
        pressureSeaLevel: 29.86,
        temperature: 58.69,
        windDirection: 236.32,
        windSpeed: 5.14,
      },
    },
    {
      startTime: '2024-11-03T03:00:00Z',
      values: {
        humidity: 84.66,
        pressureSeaLevel: 29.87,
        temperature: 59.36,
        windDirection: 235.32,
        windSpeed: 2.53,
      },
    },
    {
      startTime: '2024-11-03T04:00:00Z',
      values: {
        humidity: 89.86,
        pressureSeaLevel: 29.88,
        temperature: 57.83,
        windDirection: 176.2,
        windSpeed: 2.98,
      },
    },
    {
      startTime: '2024-11-03T05:00:00Z',
      values: {
        humidity: 92.48,
        pressureSeaLevel: 29.89,
        temperature: 56.8,
        windDirection: 93.41,
        windSpeed: 1.68,
      },
    },
    {
      startTime: '2024-11-03T06:00:00Z',
      values: {
        humidity: 96.24,
        pressureSeaLevel: 29.89,
        temperature: 53.42,
        windDirection: 73.03,
        windSpeed: 3.28,
      },
    },
    {
      startTime: '2024-11-03T07:00:00Z',
      values: {
        humidity: 94.72,
        pressureSeaLevel: 29.89,
        temperature: 52.71,
        windDirection: 66.8,
        windSpeed: 2.78,
      },
    },
    {
      startTime: '2024-11-03T08:00:00Z',
      values: {
        humidity: 90.36,
        pressureSeaLevel: 29.88,
        temperature: 52.05,
        windDirection: 61.34,
        windSpeed: 2.51,
      },
    },
    {
      startTime: '2024-11-03T09:00:00Z',
      values: {
        humidity: 84.3,
        pressureSeaLevel: 29.88,
        temperature: 51.59,
        windDirection: 44.06,
        windSpeed: 2.69,
      },
    },
    {
      startTime: '2024-11-03T10:00:00Z',
      values: {
        humidity: 78.15,
        pressureSeaLevel: 29.87,
        temperature: 52.41,
        windDirection: 27.77,
        windSpeed: 1.98,
      },
    },
    {
      startTime: '2024-11-03T11:00:00Z',
      values: {
        humidity: 76.59,
        pressureSeaLevel: 29.86,
        temperature: 52.14,
        windDirection: 1.09,
        windSpeed: 2.46,
      },
    },
    {
      startTime: '2024-11-03T12:00:00Z',
      values: {
        humidity: 65.38,
        pressureSeaLevel: 29.85,
        temperature: 54.13,
        windDirection: 345.99,
        windSpeed: 2.92,
      },
    },
    {
      startTime: '2024-11-03T13:00:00Z',
      values: {
        humidity: 58.42,
        pressureSeaLevel: 29.86,
        temperature: 54.99,
        windDirection: 338.16,
        windSpeed: 4.09,
      },
    },
    {
      startTime: '2024-11-03T14:00:00Z',
      values: {
        humidity: 55.65,
        pressureSeaLevel: 29.86,
        temperature: 55.24,
        windDirection: 332.99,
        windSpeed: 5.33,
      },
    },
    {
      startTime: '2024-11-03T15:00:00Z',
      values: {
        humidity: 57.45,
        pressureSeaLevel: 29.88,
        temperature: 55.75,
        windDirection: 357.89,
        windSpeed: 4.11,
      },
    },
    {
      startTime: '2024-11-03T16:00:00Z',
      values: {
        humidity: 62.51,
        pressureSeaLevel: 29.9,
        temperature: 57.94,
        windDirection: 68.43,
        windSpeed: 2.41,
      },
    },
    {
      startTime: '2024-11-03T17:00:00Z',
      values: {
        humidity: 60.62,
        pressureSeaLevel: 29.91,
        temperature: 59.84,
        windDirection: 139.12,
        windSpeed: 2.42,
      },
    },
    {
      startTime: '2024-11-03T18:00:00Z',
      values: {
        humidity: 53.94,
        pressureSeaLevel: 29.9,
        temperature: 62.36,
        windDirection: 153.67,
        windSpeed: 6.64,
      },
    },
    {
      startTime: '2024-11-03T19:00:00Z',
      values: {
        humidity: 44.53,
        pressureSeaLevel: 29.89,
        temperature: 65.79,
        windDirection: 172.83,
        windSpeed: 7.03,
      },
    },
    {
      startTime: '2024-11-03T20:00:00Z',
      values: {
        humidity: 34.62,
        pressureSeaLevel: 29.86,
        temperature: 69.14,
        windDirection: 186.31,
        windSpeed: 6.67,
      },
    },
    {
      startTime: '2024-11-03T21:00:00Z',
      values: {
        humidity: 27.77,
        pressureSeaLevel: 29.82,
        temperature: 72.28,
        windDirection: 197.07,
        windSpeed: 7.69,
      },
    },
    {
      startTime: '2024-11-03T22:00:00Z',
      values: {
        humidity: 33.55,
        pressureSeaLevel: 29.8,
        temperature: 71.29,
        windDirection: 207.14,
        windSpeed: 11.74,
      },
    },
    {
      startTime: '2024-11-03T23:00:00Z',
      values: {
        humidity: 33.4,
        pressureSeaLevel: 29.8,
        temperature: 70.74,
        windDirection: 215.29,
        windSpeed: 10.45,
      },
    },
    {
      startTime: '2024-11-04T00:00:00Z',
      values: {
        humidity: 30.66,
        pressureSeaLevel: 29.81,
        temperature: 69.34,
        windDirection: 243.04,
        windSpeed: 6.98,
      },
    },
    {
      startTime: '2024-11-04T01:00:00Z',
      values: {
        humidity: 36.41,
        pressureSeaLevel: 29.82,
        temperature: 65.3,
        windDirection: 279.65,
        windSpeed: 4.86,
      },
    },
    {
      startTime: '2024-11-04T02:00:00Z',
      values: {
        humidity: 41.6,
        pressureSeaLevel: 29.84,
        temperature: 63.02,
        windDirection: 175.64,
        windSpeed: 4.11,
      },
    },
    {
      startTime: '2024-11-04T03:00:00Z',
      values: {
        humidity: 43.26,
        pressureSeaLevel: 29.86,
        temperature: 61.63,
        windDirection: 192.8,
        windSpeed: 3.39,
      },
    },
    {
      startTime: '2024-11-04T04:00:00Z',
      values: {
        humidity: 42.55,
        pressureSeaLevel: 29.87,
        temperature: 60.83,
        windDirection: 141.69,
        windSpeed: 3,
      },
    },
    {
      startTime: '2024-11-04T05:00:00Z',
      values: {
        humidity: 40.48,
        pressureSeaLevel: 29.88,
        temperature: 60.69,
        windDirection: 199.16,
        windSpeed: 2.95,
      },
    },
    {
      startTime: '2024-11-04T06:00:00Z',
      values: {
        humidity: 38.22,
        pressureSeaLevel: 29.9,
        temperature: 60.81,
        windDirection: 222.36,
        windSpeed: 2.61,
      },
    },
    {
      startTime: '2024-11-04T07:00:00Z',
      values: {
        humidity: 37.97,
        pressureSeaLevel: 29.9,
        temperature: 60.91,
        windDirection: 187.12,
        windSpeed: 2.36,
      },
    },
    {
      startTime: '2024-11-04T08:00:00Z',
      values: {
        humidity: 40.15,
        pressureSeaLevel: 29.92,
        temperature: 60.26,
        windDirection: 59.59,
        windSpeed: 2.37,
      },
    },
    {
      startTime: '2024-11-04T09:00:00Z',
      values: {
        humidity: 40.34,
        pressureSeaLevel: 29.94,
        temperature: 59.77,
        windDirection: 45.87,
        windSpeed: 2.71,
      },
    },
    {
      startTime: '2024-11-04T10:00:00Z',
      values: {
        humidity: 37.91,
        pressureSeaLevel: 29.95,
        temperature: 59.44,
        windDirection: 272.66,
        windSpeed: 2.98,
      },
    },
    {
      startTime: '2024-11-04T11:00:00Z',
      values: {
        humidity: 35.2,
        pressureSeaLevel: 29.95,
        temperature: 59.15,
        windDirection: 352.59,
        windSpeed: 3.48,
      },
    },
    {
      startTime: '2024-11-04T12:00:00Z',
      values: {
        humidity: 33.02,
        pressureSeaLevel: 29.96,
        temperature: 58.91,
        windDirection: 280.34,
        windSpeed: 3.64,
      },
    },
    {
      startTime: '2024-11-04T13:00:00Z',
      values: {
        humidity: 28.4,
        pressureSeaLevel: 29.98,
        temperature: 58.81,
        windDirection: 57.06,
        windSpeed: 3.67,
      },
    },
    {
      startTime: '2024-11-04T14:00:00Z',
      values: {
        humidity: 25.8,
        pressureSeaLevel: 30,
        temperature: 58.55,
        windDirection: 153.37,
        windSpeed: 4.02,
      },
    },
    {
      startTime: '2024-11-04T15:00:00Z',
      values: {
        humidity: 22.82,
        pressureSeaLevel: 30.02,
        temperature: 59.27,
        windDirection: 149.77,
        windSpeed: 4.6,
      },
    },
    {
      startTime: '2024-11-04T16:00:00Z',
      values: {
        humidity: 18.86,
        pressureSeaLevel: 30.03,
        temperature: 62.82,
        windDirection: 350.4,
        windSpeed: 3.05,
      },
    },
    {
      startTime: '2024-11-04T17:00:00Z',
      values: {
        humidity: 16.77,
        pressureSeaLevel: 30.04,
        temperature: 65.83,
        windDirection: 284.35,
        windSpeed: 2.95,
      },
    },
    {
      startTime: '2024-11-04T18:00:00Z',
      values: {
        humidity: 15.61,
        pressureSeaLevel: 30.04,
        temperature: 68.04,
        windDirection: 249.21,
        windSpeed: 3.74,
      },
    },
    {
      startTime: '2024-11-04T19:00:00Z',
      values: {
        humidity: 14.89,
        pressureSeaLevel: 30.03,
        temperature: 69.98,
        windDirection: 231.23,
        windSpeed: 5.17,
      },
    },
    {
      startTime: '2024-11-04T20:00:00Z',
      values: {
        humidity: 15,
        pressureSeaLevel: 30,
        temperature: 71.39,
        windDirection: 219.73,
        windSpeed: 6.03,
      },
    },
    {
      startTime: '2024-11-04T21:00:00Z',
      values: {
        humidity: 15.34,
        pressureSeaLevel: 29.98,
        temperature: 72.47,
        windDirection: 219.48,
        windSpeed: 6.85,
      },
    },
    {
      startTime: '2024-11-04T22:00:00Z',
      values: {
        humidity: 15.87,
        pressureSeaLevel: 29.97,
        temperature: 72.97,
        windDirection: 221.6,
        windSpeed: 7.77,
      },
    },
    {
      startTime: '2024-11-04T23:00:00Z',
      values: {
        humidity: 18.37,
        pressureSeaLevel: 29.97,
        temperature: 71.86,
        windDirection: 227.34,
        windSpeed: 8.99,
      },
    },
    {
      startTime: '2024-11-05T00:00:00Z',
      values: {
        humidity: 23.55,
        pressureSeaLevel: 29.98,
        temperature: 69.61,
        windDirection: 232.3,
        windSpeed: 8.4,
      },
    },
    {
      startTime: '2024-11-05T01:00:00Z',
      values: {
        humidity: 30.92,
        pressureSeaLevel: 29.99,
        temperature: 66.57,
        windDirection: 238,
        windSpeed: 6.32,
      },
    },
    {
      startTime: '2024-11-05T02:00:00Z',
      values: {
        humidity: 33.14,
        pressureSeaLevel: 30,
        temperature: 65.72,
        windDirection: 266.23,
        windSpeed: 3.98,
      },
    },
    {
      startTime: '2024-11-05T03:00:00Z',
      values: {
        humidity: 30.93,
        pressureSeaLevel: 30.01,
        temperature: 65.18,
        windDirection: 177.69,
        windSpeed: 3.6,
      },
    },
    {
      startTime: '2024-11-05T04:00:00Z',
      values: {
        humidity: 27.4,
        pressureSeaLevel: 30.02,
        temperature: 64.6,
        windDirection: 104.26,
        windSpeed: 3.2,
      },
    },
    {
      startTime: '2024-11-05T05:00:00Z',
      values: {
        humidity: 25.19,
        pressureSeaLevel: 30.02,
        temperature: 64,
        windDirection: 79.21,
        windSpeed: 3.16,
      },
    },
    {
      startTime: '2024-11-05T06:00:00Z',
      values: {
        humidity: 23.97,
        pressureSeaLevel: 30.03,
        temperature: 63.43,
        windDirection: 62.69,
        windSpeed: 3.28,
      },
    },
    {
      startTime: '2024-11-05T07:00:00Z',
      values: {
        humidity: 22.35,
        pressureSeaLevel: 30.01,
        temperature: 63,
        windDirection: 48.09,
        windSpeed: 3.4,
      },
    },
    {
      startTime: '2024-11-05T08:00:00Z',
      values: {
        humidity: 20.78,
        pressureSeaLevel: 30,
        temperature: 62.66,
        windDirection: 43.24,
        windSpeed: 3.41,
      },
    },
    {
      startTime: '2024-11-05T09:00:00Z',
      values: {
        humidity: 19.55,
        pressureSeaLevel: 30,
        temperature: 62.37,
        windDirection: 38.37,
        windSpeed: 3.29,
      },
    },
    {
      startTime: '2024-11-05T10:00:00Z',
      values: {
        humidity: 17.96,
        pressureSeaLevel: 30,
        temperature: 62.12,
        windDirection: 13.08,
        windSpeed: 3.44,
      },
    },
    {
      startTime: '2024-11-05T11:00:00Z',
      values: {
        humidity: 15.86,
        pressureSeaLevel: 29.98,
        temperature: 61.9,
        windDirection: 57.19,
        windSpeed: 3.34,
      },
    },
    {
      startTime: '2024-11-05T12:00:00Z',
      values: {
        humidity: 14.64,
        pressureSeaLevel: 29.97,
        temperature: 61.71,
        windDirection: 15.16,
        windSpeed: 2.73,
      },
    },
    {
      startTime: '2024-11-05T13:00:00Z',
      values: {
        humidity: 14.44,
        pressureSeaLevel: 29.97,
        temperature: 61.45,
        windDirection: 18.41,
        windSpeed: 2.84,
      },
    },
    {
      startTime: '2024-11-05T14:00:00Z',
      values: {
        humidity: 14.39,
        pressureSeaLevel: 29.97,
        temperature: 61.13,
        windDirection: 36.14,
        windSpeed: 2.07,
      },
    },
    {
      startTime: '2024-11-05T15:00:00Z',
      values: {
        humidity: 14.73,
        pressureSeaLevel: 29.98,
        temperature: 61.68,
        windDirection: 56.92,
        windSpeed: 1.91,
      },
    },
    {
      startTime: '2024-11-05T16:00:00Z',
      values: {
        humidity: 13.19,
        pressureSeaLevel: 29.99,
        temperature: 64.49,
        windDirection: 154.17,
        windSpeed: 0.36,
      },
    },
    {
      startTime: '2024-11-05T17:00:00Z',
      values: {
        humidity: 13.38,
        pressureSeaLevel: 29.97,
        temperature: 66.43,
        windDirection: 203.33,
        windSpeed: 1.87,
      },
    },
    {
      startTime: '2024-11-05T18:00:00Z',
      values: {
        humidity: 13.7,
        pressureSeaLevel: 29.95,
        temperature: 68.13,
        windDirection: 184.64,
        windSpeed: 4.2,
      },
    },
    {
      startTime: '2024-11-05T19:00:00Z',
      values: {
        humidity: 14.07,
        pressureSeaLevel: 29.92,
        temperature: 69.45,
        windDirection: 184.64,
        windSpeed: 4.78,
      },
    },
    {
      startTime: '2024-11-05T20:00:00Z',
      values: {
        humidity: 14.44,
        pressureSeaLevel: 29.89,
        temperature: 70.76,
        windDirection: 217.16,
        windSpeed: 5.37,
      },
    },
    {
      startTime: '2024-11-05T21:00:00Z',
      values: {
        humidity: 14.81,
        pressureSeaLevel: 29.86,
        temperature: 72.08,
        windDirection: 217.16,
        windSpeed: 5.96,
      },
    },
    {
      startTime: '2024-11-05T22:00:00Z',
      values: {
        humidity: 16.96,
        pressureSeaLevel: 29.85,
        temperature: 71.26,
        windDirection: 217.16,
        windSpeed: 6.3,
      },
    },
    {
      startTime: '2024-11-05T23:00:00Z',
      values: {
        humidity: 19.12,
        pressureSeaLevel: 29.84,
        temperature: 70.44,
        windDirection: 224.68,
        windSpeed: 6.63,
      },
    },
    {
      startTime: '2024-11-06T00:00:00Z',
      values: {
        humidity: 21.28,
        pressureSeaLevel: 29.83,
        temperature: 69.63,
        windDirection: 224.68,
        windSpeed: 6.97,
      },
    },
  ];
  // hourlyTemp: any[] = [
  //   [1730426400000, 58.66],
  //   [1730430000000, 58.8],
  //   [1730433600000, 57.12],
  //   [1730437200000, 56.1],
  //   [1730440800000, 55.36],
  //   [1730444400000, 54.72],
  //   [1730448000000, 54.62],
  //   [1730451600000, 53.41],
  //   [1730455200000, 53.14],
  //   [1730458800000, 51.53],
  //   [1730462400000, 50.96],
  //   [1730466000000, 50.7],
  //   [1730469600000, 50],
  //   [1730473200000, 50.51],
  //   [1730476800000, 55.4],
  //   [1730480400000, 59.9],
  //   [1730484000000, 63.5],
  //   [1730487600000, 66.2],
  //   [1730491200000, 68],
  //   [1730494800000, 68],
  //   [1730498400000, 68],
  //   [1730502000000, 66.2],
  //   [1730505600000, 63.88],
  //   [1730509200000, 60.8],
  //   [1730512800000, 59.47],
  //   [1730516400000, 57.74],
  //   [1730520000000, 57],
  //   [1730523600000, 55.2],
  //   [1730527200000, 54.3],
  //   [1730530800000, 53.4],
  //   [1730534400000, 52.7],
  //   [1730538000000, 52.08],
  //   [1730541600000, 51.8],
  //   [1730545200000, 51.7],
  //   [1730548800000, 51.92],
  //   [1730552400000, 53.43],
  //   [1730556000000, 51.7],
  //   [1730559600000, 54.66],
  //   [1730563200000, 56.3],
  //   [1730566800000, 58.64],
  //   [1730570400000, 60.8],
  //   [1730574000000, 68.43],
  //   [1730577600000, 70.41],
  //   [1730581200000, 68.77],
  //   [1730584800000, 66.46],
  //   [1730588400000, 64.82],
  //   [1730592000000, 64.12],
  //   [1730595600000, 61.87],
  //   [1730599200000, 61.14],
  //   [1730602800000, 60.28],
  //   [1730606400000, 58.99],
  //   [1730610000000, 57.56],
  //   [1730613600000, 57.12],
  //   [1730617200000, 53.92],
  //   [1730620800000, 53.82],
  //   [1730624400000, 51.23],
  //   [1730628000000, 51.1],
  //   [1730631600000, 50.54],
  //   [1730635200000, 50.79],
  //   [1730638800000, 50.05],
  //   [1730642400000, 53.35],
  //   [1730646000000, 58.15],
  //   [1730649600000, 60.36],
  //   [1730653200000, 62.28],
  //   [1730656800000, 65.23],
  //   [1730660400000, 69.24],
  //   [1730664000000, 71.81],
  //   [1730667600000, 70.2],
  //   [1730671200000, 72.72],
  //   [1730674800000, 74.51],
  //   [1730678400000, 74],
  //   [1730682000000, 70.39],
  //   [1730685600000, 65.95],
  //   [1730689200000, 63.19],
  //   [1730692800000, 60.92],
  //   [1730696400000, 59.37],
  //   [1730700000000, 58.49],
  //   [1730703600000, 58.27],
  //   [1730707200000, 58.42],
  //   [1730710800000, 58.14],
  //   [1730714400000, 58.71],
  //   [1730718000000, 59.32],
  //   [1730721600000, 60.17],
  //   [1730725200000, 60.94],
  //   [1730728800000, 60.75],
  //   [1730732400000, 61.29],
  //   [1730736000000, 63.74],
  //   [1730739600000, 66.37],
  //   [1730743200000, 68.8],
  //   [1730746800000, 70.9],
  //   [1730750400000, 72.58],
  //   [1730754000000, 73.52],
  //   [1730757600000, 72.75],
  //   [1730761200000, 70.63],
  //   [1730764800000, 68.63],
  //   [1730768400000, 67.03],
  //   [1730772000000, 66.45],
  //   [1730775600000, 66.19],
  //   [1730779200000, 65.81],
  //   [1730782800000, 65.34],
  //   [1730786400000, 64.82],
  //   [1730790000000, 64.36],
  //   [1730793600000, 64.02],
  //   [1730797200000, 63.78],
  //   [1730800800000, 63.58],
  //   [1730804400000, 63.41],
  //   [1730808000000, 63.17],
  //   [1730811600000, 62.84],
  //   [1730815200000, 62.47],
  //   [1730818800000, 62.75],
  //   [1730822400000, 64.84],
  //   [1730826000000, 66.93],
  //   [1730829600000, 68.81],
  //   [1730833200000, 70.14],
  //   [1730836800000, 71.48],
  //   [1730840400000, 72.81],
  //   [1730844000000, 71.37],
  //   [1730847600000, 69.93],
  //   [1730851200000, 68.49],
  //   [1730854800000, 67.11],
  //   [1730858400000, 65.73],
  // ];
  // hourlyHumidity: any[] = [
  //   [1730426400000, 67],
  //   [1730430000000, 73],
  //   [1730433600000, 78],
  //   [1730437200000, 81],
  //   [1730440800000, 83],
  //   [1730444400000, 84],
  //   [1730448000000, 85],
  //   [1730451600000, 85],
  //   [1730455200000, 85],
  //   [1730458800000, 85],
  //   [1730462400000, 84],
  //   [1730466000000, 83],
  //   [1730469600000, 79],
  //   [1730473200000, 74],
  //   [1730476800000, 62],
  //   [1730480400000, 56],
  //   [1730484000000, 50],
  //   [1730487600000, 46],
  //   [1730491200000, 46],
  //   [1730494800000, 47],
  //   [1730498400000, 48],
  //   [1730502000000, 53],
  //   [1730505600000, 62],
  //   [1730509200000, 69],
  //   [1730512800000, 75],
  //   [1730516400000, 81],
  //   [1730520000000, 84],
  //   [1730523600000, 87],
  //   [1730527200000, 88],
  //   [1730530800000, 89],
  //   [1730534400000, 90],
  //   [1730538000000, 90],
  //   [1730541600000, 90],
  //   [1730545200000, 90],
  //   [1730548800000, 90],
  //   [1730552400000, 88],
  //   [1730556000000, 90],
  //   [1730559600000, 88],
  //   [1730563200000, 83],
  //   [1730566800000, 78],
  //   [1730570400000, 73],
  //   [1730574000000, 50],
  //   [1730577600000, 44],
  //   [1730581200000, 53],
  //   [1730584800000, 54],
  //   [1730588400000, 63],
  //   [1730592000000, 70],
  //   [1730595600000, 78],
  //   [1730599200000, 77],
  //   [1730602800000, 76],
  //   [1730606400000, 79],
  //   [1730610000000, 84],
  //   [1730613600000, 85],
  //   [1730617200000, 94],
  //   [1730620800000, 96],
  //   [1730624400000, 100],
  //   [1730628000000, 100],
  //   [1730631600000, 99],
  //   [1730635200000, 97],
  //   [1730638800000, 96],
  //   [1730642400000, 67],
  //   [1730646000000, 53],
  //   [1730649600000, 48],
  //   [1730653200000, 46],
  //   [1730656800000, 41],
  //   [1730660400000, 34],
  //   [1730664000000, 30],
  //   [1730667600000, 48],
  //   [1730671200000, 41],
  //   [1730674800000, 30],
  //   [1730678400000, 24],
  //   [1730682000000, 26],
  //   [1730685600000, 32],
  //   [1730689200000, 39],
  //   [1730692800000, 47],
  //   [1730696400000, 51],
  //   [1730700000000, 49],
  //   [1730703600000, 47],
  //   [1730707200000, 47],
  //   [1730710800000, 49],
  //   [1730714400000, 49],
  //   [1730718000000, 46],
  //   [1730721600000, 43],
  //   [1730725200000, 40],
  //   [1730728800000, 37],
  //   [1730732400000, 32],
  //   [1730736000000, 26],
  //   [1730739600000, 22],
  //   [1730743200000, 19],
  //   [1730746800000, 18],
  //   [1730750400000, 18],
  //   [1730754000000, 19],
  //   [1730757600000, 21],
  //   [1730761200000, 26],
  //   [1730764800000, 33],
  //   [1730768400000, 39],
  //   [1730772000000, 41],
  //   [1730775600000, 39],
  //   [1730779200000, 37],
  //   [1730782800000, 36],
  //   [1730786400000, 36],
  //   [1730790000000, 35],
  //   [1730793600000, 34],
  //   [1730797200000, 32],
  //   [1730800800000, 29],
  //   [1730804400000, 25],
  //   [1730808000000, 22],
  //   [1730811600000, 22],
  //   [1730815200000, 22],
  //   [1730818800000, 23],
  //   [1730822400000, 20],
  //   [1730826000000, 20],
  //   [1730829600000, 19],
  //   [1730833200000, 19],
  //   [1730836800000, 19],
  //   [1730840400000, 19],
  //   [1730844000000, 22],
  //   [1730847600000, 26],
  //   [1730851200000, 29],
  //   [1730854800000, 34],
  //   [1730858400000, 39],
  // ];
  // hourlyPressure: any[] = [
  //   [1730426400000, 29.98],
  //   [1730430000000, 30],
  //   [1730433600000, 30],
  //   [1730437200000, 30],
  //   [1730440800000, 30],
  //   [1730444400000, 30],
  //   [1730448000000, 29.99],
  //   [1730451600000, 29.96],
  //   [1730455200000, 29.94],
  //   [1730458800000, 29.94],
  //   [1730462400000, 29.94],
  //   [1730466000000, 29.94],
  //   [1730469600000, 29.94],
  //   [1730473200000, 29.94],
  //   [1730476800000, 29.95],
  //   [1730480400000, 29.97],
  //   [1730484000000, 29.94],
  //   [1730487600000, 29.94],
  //   [1730491200000, 29.91],
  //   [1730494800000, 29.91],
  //   [1730498400000, 29.88],
  //   [1730502000000, 29.88],
  //   [1730505600000, 29.88],
  //   [1730509200000, 29.88],
  //   [1730512800000, 29.91],
  //   [1730516400000, 29.91],
  //   [1730520000000, 29.94],
  //   [1730523600000, 29.94],
  //   [1730527200000, 29.94],
  //   [1730530800000, 29.94],
  //   [1730534400000, 29.94],
  //   [1730538000000, 29.94],
  //   [1730541600000, 29.94],
  //   [1730545200000, 29.94],
  //   [1730548800000, 29.91],
  //   [1730552400000, 29.91],
  //   [1730556000000, 29.94],
  //   [1730559600000, 29.94],
  //   [1730563200000, 29.96],
  //   [1730566800000, 29.97],
  //   [1730570400000, 30],
  //   [1730574000000, 29.91],
  //   [1730577600000, 29.88],
  //   [1730581200000, 29.86],
  //   [1730584800000, 29.86],
  //   [1730588400000, 29.86],
  //   [1730592000000, 29.85],
  //   [1730595600000, 29.85],
  //   [1730599200000, 29.86],
  //   [1730602800000, 29.87],
  //   [1730606400000, 29.87],
  //   [1730610000000, 29.88],
  //   [1730613600000, 29.89],
  //   [1730617200000, 29.88],
  //   [1730620800000, 29.88],
  //   [1730624400000, 29.88],
  //   [1730628000000, 29.87],
  //   [1730631600000, 29.86],
  //   [1730635200000, 29.85],
  //   [1730638800000, 29.85],
  //   [1730642400000, 29.86],
  //   [1730646000000, 29.87],
  //   [1730649600000, 29.89],
  //   [1730653200000, 29.9],
  //   [1730656800000, 29.9],
  //   [1730660400000, 29.88],
  //   [1730664000000, 29.85],
  //   [1730667600000, 29.83],
  //   [1730671200000, 29.8],
  //   [1730674800000, 29.79],
  //   [1730678400000, 29.8],
  //   [1730682000000, 29.81],
  //   [1730685600000, 29.84],
  //   [1730689200000, 29.86],
  //   [1730692800000, 29.89],
  //   [1730696400000, 29.9],
  //   [1730700000000, 29.92],
  //   [1730703600000, 29.92],
  //   [1730707200000, 29.93],
  //   [1730710800000, 29.94],
  //   [1730714400000, 29.95],
  //   [1730718000000, 29.95],
  //   [1730721600000, 29.96],
  //   [1730725200000, 29.97],
  //   [1730728800000, 29.99],
  //   [1730732400000, 30.01],
  //   [1730736000000, 30.03],
  //   [1730739600000, 30.04],
  //   [1730743200000, 30.04],
  //   [1730746800000, 30.03],
  //   [1730750400000, 30.01],
  //   [1730754000000, 29.99],
  //   [1730757600000, 29.98],
  //   [1730761200000, 29.98],
  //   [1730764800000, 29.98],
  //   [1730768400000, 29.99],
  //   [1730772000000, 30],
  //   [1730775600000, 30],
  //   [1730779200000, 30.01],
  //   [1730782800000, 30.02],
  //   [1730786400000, 30.02],
  //   [1730790000000, 30.01],
  //   [1730793600000, 29.99],
  //   [1730797200000, 30],
  //   [1730800800000, 29.99],
  //   [1730804400000, 29.97],
  //   [1730808000000, 29.96],
  //   [1730811600000, 29.97],
  //   [1730815200000, 29.97],
  //   [1730818800000, 29.98],
  //   [1730822400000, 29.98],
  //   [1730826000000, 29.97],
  //   [1730829600000, 29.95],
  //   [1730833200000, 29.93],
  //   [1730836800000, 29.9],
  //   [1730840400000, 29.87],
  //   [1730844000000, 29.86],
  //   [1730847600000, 29.85],
  //   [1730851200000, 29.83],
  //   [1730854800000, 29.83],
  //   [1730858400000, 29.84],
  // ];
  // hourlyWindSpeed: any[] = [
  //   [1730426400000, 2.24, 288.69],
  //   [1730433600000, 4.28, 243.55],
  //   [1730440800000, 4.54, 123.62],
  //   [1730448000000, 5.52, 113.81],
  //   [1730455200000, 5.25, 81.42],
  //   [1730462400000, 4.86, 43.58],
  //   [1730469600000, 5.27, 76.75],
  //   [1730476800000, 5.15, 84.78],
  //   [1730484000000, 5.03, 171.08],
  //   [1730491200000, 6.71, 238.71],
  //   [1730498400000, 8.27, 256],
  //   [1730505600000, 8.84, 268.42],
  //   [1730512800000, 5.66, 260.13],
  //   [1730520000000, 5.48, 146.06],
  //   [1730527200000, 5.8, 116.92],
  //   [1730534400000, 7.2, 99.89],
  //   [1730541600000, 7.27, 88.78],
  //   [1730548800000, 7.27, 76.78],
  //   [1730556000000, 7.05, 79.35],
  //   [1730563200000, 7.6, 96],
  //   [1730570400000, 6.25, 133.15],
  //   [1730577600000, 7.02, 206.07],
  //   [1730584800000, 15.43, 237.71],
  //   [1730592000000, 14.86, 246.03],
  //   [1730599200000, 9.93, 251.48],
  //   [1730606400000, 6.2, 235.68],
  //   [1730613600000, 2.43, 106.86],
  //   [1730620800000, 1.35, 146.95],
  //   [1730628000000, 4.35, 61.15],
  //   [1730635200000, 2.64, 62.43],
  //   [1730642400000, 8.73, 327.78],
  //   [1730649600000, 14.84, 339.02],
  //   [1730656800000, 8.91, 353.79],
  //   [1730664000000, 6.53, 227.54],
  //   [1730671200000, 15.03, 239.25],
  //   [1730678400000, 9.7, 282.01],
  //   [1730685600000, 12, 326.64],
  //   [1730692800000, 4.77, 57.31],
  //   [1730700000000, 3.71, 69.73],
  //   [1730707200000, 2.65, 55.4],
  //   [1730714400000, 3.37, 63.78],
  //   [1730721600000, 2.27, 166.8],
  //   [1730728800000, 2.72, 140.58],
  //   [1730736000000, 3.49, 258.18],
  //   [1730743200000, 3.12, 311.55],
  //   [1730750400000, 5.37, 246.23],
  //   [1730757600000, 9.48, 240.73],
  //   [1730764800000, 9.77, 246.73],
  //   [1730772000000, 7.52, 252.71],
  //   [1730779200000, 3.23, 249.13],
  //   [1730786400000, 1.96, 135.53],
  //   [1730793600000, 2.63, 91.26],
  //   [1730800800000, 2.56, 39.12],
  //   [1730808000000, 1.86, 36.54],
  //   [1730815200000, 1.04, 46.73],
  //   [1730822400000, 0.45, 96.64],
  //   [1730829600000, 3.21, 174.78],
  //   [1730836800000, 5.35, 231.39],
  //   [1730844000000, 6.91, 231.39],
  //   [1730851200000, 7.9, 239.74],
  //   [1730858400000, 5.54, 220.37],
  // ];
  hourlyTemp: any[] = [];
  hourlyHumidity: any[] = [];
  hourlyPressure: any[] = [];
  hourlyWindSpeed: any[] = [];
  activeIndex: number = 1;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions1: Highcharts.Options = {
    chart: {
      type: 'arearange',
      zooming: {
        type: 'x',
      },
    },
    title: {
      text: 'Hourly Weather (For Next 5 Days)',
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
  chartOptions2: Highcharts.Options = {};

  @ViewChild('danger') danger!: ElementRef;
  @ViewChild('chart2') chart!: ElementRef;

  setActiveTab(index: number): void {
    this.activeIndex = index;
  }

  onSubmit(form: any) {
    if (this.requiredFields) {
      // console.log('Form Submitted:', form.value);
      const city = form.value.city;
      const state = form.value.state;
      const country = form.value.country;
      let lat, lon;
      const google_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state},${country}&key=AIzaSyDqXJTP92xb2T3PC2fq0bGCIJmF68Y-vyY`;

      fetch(google_url)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          lat = data.results[0].geometry.location.lat;
          lon = data.results[0].geometry.location.lng;
          this.address = data.results[0].formatted_address;
          console.log(lat, lon, this.address);
          this.getNextWeek(lat, lon);
          this.getHourly(lat, lon);
        });
      //testcode
    } else {
      const ip_url = 'https://ipinfo.io/?token=b72b65292cdc46';
      let lat, lon;

      fetch(ip_url)
        .then((response) => {
          if (response.status !== 200) {
            this.danger.nativeElement.style.display = 'block';
            return Promise.reject('Non-200 status code');
          } else {
            return response.json();
          }
        })
        .then((data) => {
          // console.log(data);
          lat = data.loc.split(',')[0];
          lon = data.loc.split(',')[1];
          this.address = data.city + ', ' + data.region;
          console.log(lat, lon, this.address);
          this.getNextWeek(lat, lon);
          this.getHourly(lat, lon);
        });
    }
  }

  onBlur(input: HTMLInputElement, div: HTMLElement) {
    if (input.value === '') {
      input.style.border = '1px solid red';
      div.style.display = 'block';
    } else {
      input.style.border = '1px solid #dee2e6';
      div.style.display = 'none';
    }
  }

  onBlur2(input: HTMLInputElement) {
    if (input.value === '') {
      input.style.border = '1px solid red';
    } else {
      input.style.border = '1px solid #dee2e6';
    }
  }
  // https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${}&types=(cities)&key=AIzaSyDqXJTP92xb2T3PC2fq0bGCIJmF68Y-vyY
  // autoComplete(input: HTMLInputElement, div: HTMLElement) {

  // }

  onInput(input: HTMLInputElement) {
    if (input.value === '') {
      input.style.border = '1px solid red';
    } else {
      input.style.border = '1px solid #dee2e6';
    }
  }

  onCityInput(input: HTMLInputElement, datalist: HTMLDataListElement) {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input.value}&types=(cities)&key=AIzaSyDqXJTP92xb2T3PC2fq0bGCIJmF68Y-vyY`,
      {
        headers: {
          'x-requested-with': 'XMLHttpRequest',
        },
      }
    )
      .then((response) => {
        // console.log(response);
        return response.text();
      })
      .then((data) => {
        const jsonData = JSON.parse(data);
        // console.log(jsonData.predictions);
        datalist.innerHTML = '';
        for (let i = 0; i < jsonData.predictions.length; i++) {
          // console.log(jsonData.predictions[i].description.split(',')[0]);
          const option = document.createElement('option');
          option.value = jsonData.predictions[i].description.split(',')[0];
          datalist.appendChild(option);
        }
      });
  }

  onCheckboxChange() {
    this.requiredFields = !this.requiredFields;
  }

  onClear(form: NgForm, checkbox: HTMLInputElement) {
    form.resetForm();
    if (checkbox.checked) {
      checkbox.checked = false;
      const event = new Event('change');
      checkbox.dispatchEvent(event);
    }
  }

  onClick(
    active: HTMLAnchorElement,
    inactive: HTMLAnchorElement,
    visible: HTMLDivElement,
    hidden: HTMLDivElement
  ) {
    if (!active.classList.contains('active')) {
      active.classList.add('active');
      inactive.classList.remove('active');
      visible.style.display = 'flex';
      hidden.style.display = 'none';
    }
  }

  getNextWeek(lat: number, lon: number) {
    const weather_url =
      'http://localhost:3000/nextweek?lat=' + lat + '&lon=' + lon;
    fetch(weather_url)
      .then((response) => response.json())
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
      });
  }

  getHourly(lat: number, lon: number) {
    const weather_url =
      'http://localhost:3000/hourly?lat=' + lat + '&lon=' + lon;
    fetch(weather_url)
      .then((response) => {
        if (response.status !== 200) {
          this.danger.nativeElement.style.display = 'block';
          return Promise.reject('Non-200 status code');
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.hourly = data;
        console.log(this.hourly);
        this.hourlyTemp = this.hourly.map((hour) => [
          new Date(hour.startTime).getTime(),
          hour.values.temperature,
        ]);
        console.log(this.hourlyTemp);
        this.hourlyHumidity = this.hourly.map((hour) => [
          new Date(hour.startTime).getTime(),
          Math.round(hour.values.humidity),
        ]);
        console.log(this.hourlyHumidity);
        this.hourlyPressure = this.hourly.map((hour) => [
          new Date(hour.startTime).getTime(),
          hour.values.pressureSeaLevel,
        ]);
        console.log(this.hourlyPressure);
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
        console.log(this.hourlyWindSpeed);
        this.chartOptions2 = {
          chart: {
            zooming: {
              type: 'x',
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
      });
  }
}
