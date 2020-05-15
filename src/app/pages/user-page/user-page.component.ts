import { Component, OnInit } from '@angular/core';
import { } from 'googlemaps';
import { ItineraryService } from 'src/app/services/itinerary.service';
import { Itinerary } from 'src/app/models/itinerary.model';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { AuthorizationDataService } from 'src/app/data-services/authorization.data-service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { ItineraryInformationService } from 'src/app/services/itinerary-information.service';
import { ItineraryInformation } from 'src/app/models/itineraryInformation.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{
  showButtons: boolean | undefined;
  showMap: boolean | undefined;
  user: User = { id:"", firstName:"", lastName:"", email:"", username:"", itineraries: [] };
  itineraryInformation: ItineraryInformation = {id:"", cities: []}

  constructor(
    private readonly itineraryService: ItineraryService,
    private readonly authorizationServce: AuthorizationService,
    private readonly authorizationDataService: AuthorizationDataService,
    private readonly router: Router,
    private readonly itineraryInformationService: ItineraryInformationService) { }

  ngOnInit() {
    this.showButtons = true;
    this.showMap = false;
  }

  saveItinerary(itinerary: Itinerary) {
    this.itineraryService.saveItinerary(itinerary).subscribe(response => {
      return response;
    });
  }

  createItinerary() {
    this.showMap = true;
    this.showButtons = false;
  }

  lookItineraries() {
    this.getUserById(this.authorizationDataService.decodedToken.nameid);
    this.showButtons = false;
  }

  getUserById(userId: string) {
    this.authorizationServce.getUserById(userId).subscribe((response) => {
      this.user = response;
    });
  }

  getItineraryById(itineraryId: string){
    this.itineraryService.getItineraryById(this.user.itineraries[0].id).subscribe((response) => {
      this.itineraryInformation.cities = response.cities;
      this.itineraryInformation.id = response.id;
      this.itineraryInformationService.setItinerary(this.itineraryInformation);
      this.router.navigate(['itinerary-page'])
    })
  }
}
