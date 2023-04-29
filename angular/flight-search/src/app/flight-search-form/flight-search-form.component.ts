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

    const departureDate = '2023-04-26';
    const returnDate = '2023-05-05';

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
