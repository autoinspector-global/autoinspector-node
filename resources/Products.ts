import { Bike } from './Bike';
import { Car } from './Car';
import { Custom } from './Custom';
import { Goods } from './Goods';
import { HTTPClient } from './HTTPClient';
import { Machinery } from './Machinery';
import { Moto } from './Moto';
import { People } from './People';

export class Products {
  public machinery: Machinery;
  public people: People;
  public goods: Goods;
  public car: Car;
  public moto: Moto;
  public custom: Custom;
  public bike: Bike;

  constructor(httRef: HTTPClient) {
    this.machinery = new Machinery(httRef);
    this.people = new People(httRef);
    this.goods = new Goods(httRef);
    this.car = new Car(httRef);
    this.moto = new Moto(httRef);
    this.custom = new Custom(httRef);
    this.bike = new Bike(httRef);
  }
}
