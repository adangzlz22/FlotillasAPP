import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ObtenerVehiculosPage } from './obtener-vehiculos.page';

describe('ObtenerVehiculosPage', () => {
  let component: ObtenerVehiculosPage;
  let fixture: ComponentFixture<ObtenerVehiculosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ObtenerVehiculosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ObtenerVehiculosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
