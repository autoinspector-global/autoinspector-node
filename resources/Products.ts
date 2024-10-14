import { Bike } from './Bike';
import { Car } from './Car';
import { Cellphone } from './Cellphone';
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
  public cellphone: Cellphone;

  constructor(httpRef: HTTPClient) {
    this.machinery = new Machinery(httpRef);
    this.people = new People(httpRef);
    this.goods = new Goods(httpRef);
    this.car = new Car(httpRef);
    this.moto = new Moto(httpRef);
    this.custom = new Custom(httpRef);
    this.bike = new Bike(httpRef);
    this.cellphone = new Cellphone(httpRef);
  }
}
