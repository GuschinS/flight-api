import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlightSearchService {
  private apiUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  private clientId = 'gX4CYvBFO1lAbKPUGgBW6BdAAFQIBF4T';
  private clientSecret = '27znuVMpe3ExTJ6z';

  constructor(private http: HttpClient) {}

  getToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);

    return this.http.post(this.apiUrl, body.toString(), { headers });
  }
  // private apiKey = '0db59cd5b9ba30fc941c33973a404587';

  // constructor(private http: HttpClient) {}

  // getFlightInformation(iata: string) {
  //   const url = `http://api.aviationstack.com/v1/flights?access_key=${this.apiKey}&limit=10&arr_iata=${iata}`;
  //   return this.http.get(url);
  // }

  // getFlightCities(city: string) {
  //   const url = `http://api.aviationstack.com/v1/cities?access_key=${this.apiKey}&limit=10&callback=${this.json}`;
  //   return this.http.get(url);
  // }

  // json(city: string) {
  //   let city_name = city;
  //   return city_name;
  // }
}
