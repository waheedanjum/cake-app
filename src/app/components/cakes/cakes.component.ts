
import { Component, OnInit } from '@angular/core';
import { CakeService } from '../../services/cake.service';
import { Cake } from '../../classes/cake';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})

export class CakesComponent implements OnInit {

  cakes: Cake[];
  personName: string;
  YumFactor: number;
  selectedCake: Cake;
  
  constructor(
      private cakeService: CakeService
    ) {
      this.getCakes();
     }

  ngOnInit() {} 

  //API call to dlete the cake
  onDeleteCake(id: number) {
    this.cakeService.deleteCakeById(id).
    subscribe(
      (data: any) => { console.log(data); },
      (error) => { console.error(error) },
      () => { console.log(this.selectedCake.name + "has been removed"); }
      );
  }

  //APi call to view the cake by Id 
  getCakeById(id: number) {
    this.selectedCake = this.cakes.find(x=> x.id == id);
    this.cakeService.getCakeById(id)
    .subscribe(
      (cake: Cake) => { this.selectedCake = cake; },
      (error) => { console.error(error); },
      () => { console.log("Selected Cake: " + JSON.stringify(this.selectedCake)); }
      );
  }

  //api call to update the cake details e.g comments and YumFactor
  updateCakeById(id: number) {
    this.cakeService.updateCakeById(this.selectedCake)
      .subscribe(
        (data: Cake) => { console.log(data); },
        (error) => { console.error(error); },
        () => {
           console.log("Updated: " + JSON.stringify(this.selectedCake));

           //go back to main screen after successsful update
           this.onBack();
        }
      );
  }

  //api call to view all the cakes
  getCakes() {
    this.cakeService.getCakes()
    .subscribe((data: Cake[]) => this.cakes = data,
    (error: any) => {
      console.error(error);
    },
    () => {
      console.log(this.cakes);
    });
  }

  onBack() {
    this.selectedCake = null;
  }

}
