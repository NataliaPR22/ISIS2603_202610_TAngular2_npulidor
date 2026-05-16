import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './city-create.component.html'
})
export class CityCreateComponent implements OnInit {
  @Output() cityCreated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private countryService = inject(CountryService);
  private cityService = inject(CityService);

  cityName: string = '';
  selectedCountryId: number | null = null;
  countries: Country[] = [];

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(countries => this.countries = countries);
  }

  onSave(): void {
    if (!this.cityName.trim() || !this.selectedCountryId) return;

    this.cityService.createCity(this.selectedCountryId, { name: this.cityName }).subscribe(() => {
      this.cityCreated.emit();
      this.cityName = '';
      this.selectedCountryId = null;
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
