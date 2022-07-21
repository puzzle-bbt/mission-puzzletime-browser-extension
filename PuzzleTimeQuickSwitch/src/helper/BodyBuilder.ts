export class BodyBuilder {
  parameters = [];

  public set(name: string, value: string) {
    this.parameters.push([name, value]);
  }

  public encode() {
    let result = "";
    for(let parameter of this.parameters){
      let key = parameter[0];
      let value = parameter[1];
      result += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }

    return result.slice(0,result.length-1);
  }
}
