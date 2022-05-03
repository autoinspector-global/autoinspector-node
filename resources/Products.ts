import { Http2ServerRequest } from 'http2';
import { Car } from './Car';
import { Goods } from './Goods';
import { HTTPClient } from './HTTPClient';
import { Machinery } from './Machinery';
import { People } from './People';
import { Vehicle } from './Vehicle';

export class Products {
  public machinery: Machinery;
  public people: People;
  public goods: Goods;
  public vehicle: Vehicle;
  public car: Car;

  constructor(httRef: HTTPClient) {
    this.machinery = new Machinery(httRef);
    this.people = new People(httRef);
    this.goods = new Goods(httRef);
    this.vehicle = new Vehicle(httRef);
    this.car = new Car(httRef);
  }
}
