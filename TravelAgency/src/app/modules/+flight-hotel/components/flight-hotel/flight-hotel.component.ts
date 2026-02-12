import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable, debounceTime, map, startWith, switchMap } from 'rxjs';
import { AuthFacade } from 'src/app/modules/+auth/state/auth.facade';
import { DestinationFacade } from 'src/app/modules/+destinations/state/destinations.facade';
import { VacationsFacade } from 'src/app/modules/+vacations/state/vacations.facade';
import { DestinationDTO } from 'src/app/shared/models/destinationDTO';
import { VacationSearchReq } from 'src/app/shared/models/vacationSearchReq';
import { VacationBookingsComponent } from '../vacation-bookings/vacation-bookings.component';
import { ChatbotComponent } from 'src/app/shared/components/chatbot/chatbot.component';

@Component({
  selector: 'app-flight-hotel',
  templateUrl: './flight-hotel.component.html',
  styleUrls: ['./flight-hotel.component.scss'],
})
export class FlightHotelComponent  implements OnInit {
  readonly destinations$ = this._destinationFacade.destinationListS$;
  readonly worldDestinations$ = this._destinationFacade.worldsPopularDestinations$;

  filteredDestinations$: BehaviorSubject<DestinationDTO[]> = new BehaviorSubject<DestinationDTO[]>([]);
  filteredDestinations1$: BehaviorSubject<DestinationDTO[]> = new BehaviorSubject<DestinationDTO[]>([]);

  flightHotelFormGroup!: FormGroup;
  isInputFocused: boolean = false;
  isInputFocused1: boolean = false;
  fromEntityId: string = '';
  toEntityId: string = '';

  public minDate: string | undefined;

  constructor(
    private modalController: ModalController,
    private readonly _destinationFacade: DestinationFacade,
    private readonly _fb: FormBuilder,
    private readonly _vacationsFacade: VacationsFacade,
    private readonly _authFacade: AuthFacade
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this._initFormGroup();
    this._destinationFacade.loadDestinationList();
    this._destinationFacade.loadWorldsPopularDestinationsList();

    this.destinations$.subscribe(destinations => {
      this.filteredDestinations$.next(destinations);
      this.filteredDestinations1$.next(destinations);
    });

    this.flightHotelFormGroup.controls['from'].valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => this._filter(value))
    ).subscribe(filtered => {
      this.filteredDestinations$.next(filtered);
    });

    this.flightHotelFormGroup.controls['to'].valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => this._filter(value))
    ).subscribe(filtered => {
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

  handleFocus() {
    this.isInputFocused = true;
    this.flightHotelFormGroup.controls['from'].setValue('');
  }

  handleFocus1() {
    this.isInputFocused1 = true;
    this.flightHotelFormGroup.controls['to'].setValue('');
  }

  handleBlur() { 
    setTimeout(() => {
      this.isInputFocused = false;
    }, 150);
  }

  handleBlur1() { 
    setTimeout(() => {
      this.isInputFocused1 = false;
    }, 150);
  }

  logout() {
    this._authFacade.logout();
  }

  selectOption(option: DestinationDTO) {
    this.flightHotelFormGroup.controls['from'].setValue(
      option.city
    );
    this.fromEntityId = option.entityId;
    this.isInputFocused = false;
  }

  selectOption1(option: DestinationDTO) {
    this.flightHotelFormGroup.controls['to'].setValue(
      option.city
    );
    this.toEntityId = option.entityId;
    this.isInputFocused1 = false;
  }

  updateCheckin() {
    const checkinValue = this.flightHotelFormGroup.controls['checkin'].value;
    this.flightHotelFormGroup.controls['checkin'].setValue(checkinValue);
  }

  updateCheckout() {
    const checkoutValue = this.flightHotelFormGroup.controls['checkout'].value;
    this.flightHotelFormGroup.controls['checkout'].setValue(checkoutValue);
  }

  async searchVacations() {
    if(this.flightHotelFormGroup.valid){
      const vacationSearchReq: VacationSearchReq = {
        from: this.flightHotelFormGroup.controls['from'].value,
        to: this.flightHotelFormGroup.controls['to'].value,
        checkin: this.flightHotelFormGroup.controls['checkin'].value,
        checkout: this.flightHotelFormGroup.controls['checkout'].value,
        adults: this.flightHotelFormGroup.controls['adults'].value
      }
      this._vacationsFacade.loadVacationsByCityPeriodAdults(vacationSearchReq);
  
      const modal = await this.modalController.create({
        component: VacationBookingsComponent,
        id: 'vacation-bookings',
        componentProps: {
          title: 'Packages flight + hotel for ',
          from: this.flightHotelFormGroup.controls['from'].value,
          to: this.flightHotelFormGroup.controls['to'].value,
          checkin: this.flightHotelFormGroup.controls['checkin'].value,
          checkout: this.flightHotelFormGroup.controls['checkout'].value,
          adults: this.flightHotelFormGroup.controls['adults'].value,
          fromEntityId: this.fromEntityId,
          toEntityId: this.toEntityId
        },
      });

      modal.onDidDismiss().then(() => {
        this.resetForm();
      });
      return await modal.present();
    }
  }

  async onCardClick(option: DestinationDTO) {
    this._vacationsFacade.loadVacationsByCityList(option.city);

    const modal = await this.modalController.create({
      component: VacationBookingsComponent,
      id: 'vacation-bookings',
      componentProps: {
        to: option.city + ", " + option.country,
        title: 'Packages flight + hotel for ',
        byCity: true,
      },
    });
    return await modal.present();
  }

  async chatbotClick() {
    const modal = await this.modalController.create({
      component: ChatbotComponent,
      id: 'chat-bot',
      componentProps: {
      },
    });
    return await modal.present();
  }

  private resetForm() {
    this.flightHotelFormGroup.reset({
      from: null,
      to: null,
      checkin: this.minDate,
      checkout: this.minDate,
      adults: 2,
    });
  }

  private _initFormGroup() {
    this.flightHotelFormGroup = this._fb.group({
      from: [null, Validators.required],
      to: [null, Validators.required],
      checkin: [this.minDate, Validators.required],
      checkout: [this.minDate, Validators.required],
      adults: [2, Validators.required],
    });
  }
}
