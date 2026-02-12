import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DestinationDTO } from 'src/app/shared/models/destinationDTO';
import { BehaviorSubject, Observable, debounceTime, map, startWith, switchMap } from 'rxjs';
import { DestinationFacade } from 'src/app/modules/+destinations/state/destinations.facade';
import { VacationsFacade } from 'src/app/modules/+vacations/state/vacations.facade';
import { ModalController } from '@ionic/angular';
import { DestinationHotelBookingsComponent } from '../destination-hotel-bookings/destination-hotel-bookings.component';
import { AuthFacade } from 'src/app/modules/+auth/state/auth.facade';
import { SimpleVacationSearchReq } from 'src/app/shared/models/simpleVacationSearchReq';
import { ChatbotComponent } from 'src/app/shared/components/chatbot/chatbot.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  readonly destinations$ = this._destinationFacade.destinationListS$;
  readonly romaniaDestinations$ = this._destinationFacade.romaniaDestinations$;

  filteredDestinations$: BehaviorSubject<DestinationDTO[]> = new BehaviorSubject<DestinationDTO[]>([]);

  dashboardFormGroup!: FormGroup;
  isInputFocused: boolean = false;
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
    this._destinationFacade.loadRomaniaDestinationList();

    this.destinations$.subscribe(destinations => {
      this.filteredDestinations$.next(destinations);
    });

    this.dashboardFormGroup.controls['destination'].valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => this._filter(value))
    ).subscribe(filtered => {
      this.filteredDestinations$.next(filtered);
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

  logout() {
    this._authFacade.logout();
  }

  handleFocus() {
    this.isInputFocused = true;
    this.dashboardFormGroup.controls['destination'].setValue('');
  }

  handleBlur() {
    setTimeout(() => {
      this.isInputFocused = false;
      this.filteredDestinations$.next([]);
    }, 150);
  }

  selectOption(option: DestinationDTO) {
    this.dashboardFormGroup.controls['destination'].setValue(
      option.city
    );
    this.isInputFocused = false;
  }

  openPopover(trigger: string) {
    document.getElementById(trigger)?.click();
  }

  updateCheckin() {
    const checkinValue = this.dashboardFormGroup.controls['checkin'].value;
    this.dashboardFormGroup.controls['checkin'].setValue(checkinValue);
  }

  updateCheckout() {
    const checkoutValue = this.dashboardFormGroup.controls['checkout'].value;
    this.dashboardFormGroup.controls['checkout'].setValue(checkoutValue);
  }

  async searchDashboardVacations() {
    if(this.dashboardFormGroup.valid){
      const simpleVacationSearchReq: SimpleVacationSearchReq = {
        cityName: this.dashboardFormGroup.controls['destination'].value,
        checkin: this.dashboardFormGroup.controls['checkin'].value,
        checkout: this.dashboardFormGroup.controls['checkout'].value,
        adults: this.dashboardFormGroup.controls['adults'].value
      }
      this._vacationsFacade.loadSimpleVacationsByCityPeriodAdults(simpleVacationSearchReq);
  
      const modal = await this.modalController.create({
        component: DestinationHotelBookingsComponent,
        id: 'destination-hotel-bookings',
        componentProps: {
          title: 'Explore Our Vacation Packages in ',
          destinationName: this.dashboardFormGroup.controls['destination'].value,
          checkin: this.dashboardFormGroup.controls['checkin'].value,
          checkout: this.dashboardFormGroup.controls['checkout'].value,
          adults: this.dashboardFormGroup.controls['adults'].value,
        },
      });

      modal.onDidDismiss().then(() => {
        this.resetForm();
      });
      return await modal.present();
    }
  }

  async onCardClick(option: DestinationDTO) {
    this._vacationsFacade.loadSimpleVacationsByCityList(option.city);

    const modal = await this.modalController.create({
      component: DestinationHotelBookingsComponent,
      id: 'destination-hotel-bookings',
      componentProps: {
        destinationName: option.city,
        title: 'Explore Our Exclusive Vacation Packages in ',
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
    this.dashboardFormGroup.reset({
      destination: '',
      checkin: this.minDate,
      checkout: this.minDate,
      adults: 2,
    });
  }

  private _initFormGroup() {
    this.dashboardFormGroup = this._fb.group({
      destination: [null, Validators.required],
      checkin: [this.minDate, Validators.required],
      checkout: [this.minDate, Validators.required],
      adults: [2, Validators.required],
    });
  }
}
