import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import {
  BehaviorSubject,
  startWith,
  debounceTime,
  switchMap,
  Observable,
  map,
} from 'rxjs';
import { AuthFacade } from 'src/app/modules/+auth/state/auth.facade';
import { DestinationFacade } from 'src/app/modules/+destinations/state/destinations.facade';
import { VacationBookingsComponent } from 'src/app/modules/+flight-hotel/components/vacation-bookings/vacation-bookings.component';
import { VacationsFacade } from 'src/app/modules/+vacations/state/vacations.facade';
import { DestinationDTO } from 'src/app/shared/models/destinationDTO';
import { FlightSearchReq } from 'src/app/shared/models/flightSearchRequest';
import { VacationSearchReq } from 'src/app/shared/models/vacationSearchReq';
import { FlightsListComponent } from '../flights-list/flights-list.component';
import { FlightFacade } from 'src/app/modules/+flights/state/flights.facade';
import { ApiFlightBookingsListComponent } from 'src/app/modules/+flights/components/api-flight-bookings-list/api-flight-bookings-list.component';
import { ChatbotComponent } from 'src/app/shared/components/chatbot/chatbot.component';

@Component({
  selector: 'app-user-flights',
  templateUrl: './user-flights.component.html',
  styleUrls: ['./user-flights.component.scss'],
})
export class UserFlightsComponent implements OnInit {
  readonly destinations$ = this._destinationFacade.destinationListS$;
  readonly worldDestinations$ =
    this._destinationFacade.worldsPopularDestinations$;

  filteredDestinations$: BehaviorSubject<DestinationDTO[]> =
    new BehaviorSubject<DestinationDTO[]>([]);
  filteredDestinations1$: BehaviorSubject<DestinationDTO[]> =
    new BehaviorSubject<DestinationDTO[]>([]);

  flightFormGroup!: FormGroup;
  isInputFocused: boolean = false;
  isInputFocused1: boolean = false;
  fromEntityId!: number;
  toEntityId!: number;
  public minDate: string | undefined;

  constructor(
    private modalController: ModalController,
    private readonly _destinationFacade: DestinationFacade,
    private readonly _fb: FormBuilder,
    private readonly _flightFacade: FlightFacade,
    private readonly _authFacade: AuthFacade
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }
  ngOnInit() {
    this._initFormGroup();

    this._destinationFacade.loadDestinationList();
    this._destinationFacade.loadWorldsPopularDestinationsList();

    this.destinations$.subscribe((destinations) => {
      this.filteredDestinations$.next(destinations);
      this.filteredDestinations1$.next(destinations);
    });

    this.flightFormGroup.controls['from'].valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        switchMap((value) => this._filter(value))
      )
      .subscribe((filtered) => {
        this.filteredDestinations$.next(filtered);
      });

    this.flightFormGroup.controls['to'].valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        switchMap((value) => this._filter(value))
      )
      .subscribe((filtered) => {
        this.filteredDestinations1$.next(filtered);
      });
  }

  private _filter(value: string): Observable<DestinationDTO[]> {
    if (!value) {
      return this.destinations$;
    }
    const filterValue = value.toLowerCase();
    return this.destinations$.pipe(
      map((options) =>
        options.filter((option) =>
          option.city.toLowerCase().includes(filterValue)
        )
      )
    );
  }

  fromFocus() {
    this.isInputFocused = true;
    this.flightFormGroup.controls['from'].setValue('');
  }

  toFocus() {
    this.isInputFocused1 = true;
    this.flightFormGroup.controls['to'].setValue('');
  }

  fromBlur() {
    setTimeout(() => {
      this.isInputFocused = false;
    }, 150);
  }

  toBlur() {
    setTimeout(() => {
      this.isInputFocused1 = false;
    }, 150);
  }

  logout() {
    this._authFacade.logout();
  }

  selectOption(option: DestinationDTO) {
    this.flightFormGroup.controls['from'].setValue(option.city);
    this.fromEntityId = option.destination_id;
    this.isInputFocused = false;
  }

  selectOption1(option: DestinationDTO) {
    this.flightFormGroup.controls['to'].setValue(option.city);
    this.toEntityId = option.destination_id;
    this.isInputFocused1 = false;
  }

  updateCheckin() {
    const checkinValue = this.flightFormGroup.controls['checkin'].value;
    this.flightFormGroup.controls['checkin'].setValue(checkinValue);
  }

  updateCheckout() {
    const checkoutValue = this.flightFormGroup.controls['checkout'].value;
    this.flightFormGroup.controls['checkout'].setValue(checkoutValue);
  }

  async searchFlights() {
    if (this.flightFormGroup.valid) {
      this._flightFacade.loadFlightBookingsList(
        this.fromEntityId,
        this.toEntityId,
        this.flightFormGroup.controls['checkin'].value,
        this.flightFormGroup.controls['checkout'].value,
        this.flightFormGroup.controls['adults'].value
      );

      const modal = await this.modalController.create({
        component: FlightsListComponent,        
        id: 'flight-bookings',
        componentProps: {
          title: 'Flights to ' + this.flightFormGroup.controls['to'].value,
          checkin: this.flightFormGroup.controls['checkin'].value,
          checkout: this.flightFormGroup.controls['checkout'].value,
          adults: this.flightFormGroup.controls['adults'].value,
          from: this.flightFormGroup.controls['from'].value,
          to: this.flightFormGroup.controls['to'].value,
          cabinClass: this.flightFormGroup.controls['cabinClass'].value
        },
      });

      modal.onDidDismiss().then(() => {
        this.resetForm();
      });
      return await modal.present();
    }
  }

  async onCardClick(option: DestinationDTO) {
    this._flightFacade.loadFlightsByCityList(option.city);

    const modal = await this.modalController.create({
      component: FlightsListComponent,
      id: 'user-flights',
      componentProps: {
        title: 'Flights to ' + option.city + ', ' + option.country,
        checkin: this.flightFormGroup.controls['checkin'].value,
        checkout: this.flightFormGroup.controls['checkout'].value,
        byCity: true,
        adults: this.flightFormGroup.controls['adults'].value
      },
    });
    return await modal.present();
  }

  async chatbotClick() {
    const modal = await this.modalController.create({
      component: ChatbotComponent,
      id: 'chat-bot',
      componentProps: {},
    });
    return await modal.present();
  }

  private resetForm() {
    this.flightFormGroup.reset({
      from: null,
      to: null,
      checkin: this.minDate,
      checkout: this.minDate,
      adults: 2,
      cabinClass: 'economy',
    });
  }

  private _initFormGroup() {
    this.flightFormGroup = this._fb.group({
      from: [null, Validators.required],
      to: [null, Validators.required],
      numberOfPassengers: [2, Validators.required],
      checkin: [this.minDate, Validators.required],
      checkout: [this.minDate, Validators.required],
      cabinClass: ['economy', Validators.required],
      adults: [2, Validators.required],
    });
  }
}
