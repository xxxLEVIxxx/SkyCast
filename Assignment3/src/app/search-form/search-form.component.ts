import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent {
  requiredFields = true;

  onSubmit(form: any) {
    if (this.requiredFields) {
      // console.log('Form Submitted:', form.value);
      const city = form.value.city;
      const state = form.value.state;
      const country = form.value.country;
      let lat, lon, location;
      const google_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state},${country}&key=AIzaSyDqXJTP92xb2T3PC2fq0bGCIJmF68Y-vyY`;

      fetch(google_url)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          lat = data.results[0].geometry.location.lat;
          lon = data.results[0].geometry.location.lng;
          location = data.results[0].formatted_address;
          console.log(lat, lon, location);
        });
    } else {
      const ip_url = 'https://ipinfo.io/?token=b72b65292cdc46';
      let lat, lon, location;

      fetch(ip_url)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          lat = data.loc.split(',')[0];
          lon = data.loc.split(',')[1];
          location = data.city + ', ' + data.region;
          console.log(lat, lon, location);
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
}
