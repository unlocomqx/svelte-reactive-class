import { reactive } from "./reactive";

@reactive()
export class Clock {

  public time = (new Date()).getSeconds();

  tick () {
    this.time = (new Date()).getSeconds();
  }
}
