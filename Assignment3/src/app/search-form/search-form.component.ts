import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent {
  requiredFields = true;
  nextWeek: any[] = [];
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
  activeIndex: number = 1;

  @ViewChild('danger') danger!: ElementRef;

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
        });
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
      });
  }
}
