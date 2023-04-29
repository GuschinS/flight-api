import {DatePipe} from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { FlightSearchService } from '../flight-search.service';
import { Flight } from '../models/flight.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.scss'],
})
export class FlightSearchFormComponent implements OnInit {
  flightInformation: any;
  flightDestinations: any;
  arrayFlight!: Flight[];
  iata = '';
  city = '';
  token: any;
  from = '';
  to = '';

  constructor(
    private http: HttpClient,
    private flightSearchService: FlightSearchService
  ) {}

  ngOnInit(): void {
    this.auth();
  }

  auth() {
    this.flightSearchService.getToken().subscribe(
      (response) => {
        console.log(response);
        this.token = response;
      },

      (error) => {
        console.log(error);
      }
    );
  }

  getFlightDestinations(
    originLocationCode: string,
    destinationLocationCode: string
  ) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token.access_token}`
    );
    const today = new Date();
    const departureDateNotFormat = new Date();
    const returnDateNotFormat = new Date()
    departureDateNotFormat.setDate(today.getDate() + 4);
    returnDateNotFormat.setDate(today.getDate() + 8);

    const departureDate = new DatePipe('en-US').transform(departureDateNotFormat, 'yyyy-MM-dd')
    const returnDate = new DatePipe('en-US').transform(returnDateNotFormat, 'yyyy-MM-dd')


    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=2&max=5`;

    this.http.get(url, { headers }).subscribe(
      (response) => {
        console.log(response);
        this.flightInformation = response;
        this.arrayFlight = this.flightInformation.data;
        console.log('this.arrayFlight: ', this.arrayFlight);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // getFlightInformation() {
  //   this.flightSearchService
  //     .getFlightInformation(this.iata)
  //     .subscribe((data) => {
  //       this.flightInformation = data;
  //       this.arrayFlight = this.flightInformation.data;
  //       console.log('this.arrayFlight: ', this.arrayFlight);
  //     });
  // }

  // getFlightCities() {
  //   this.flightSearchService.getFlightCities(this.city).subscribe((data) => {
  //     this.flightInformation = data;
  //     this.arrayFlight = this.flightInformation.data;
  //     console.log('this.arrayFlight: ', this.arrayFlight);
  //   });
  // }
}
