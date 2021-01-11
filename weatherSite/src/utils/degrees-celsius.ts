export default class Converter {
 static celsius = 273.15;

  static converter(value:any){
    if(value){
      //Converter °K -> °C
      let result = value - this.celsius;
      return result;
    }
  }
}
