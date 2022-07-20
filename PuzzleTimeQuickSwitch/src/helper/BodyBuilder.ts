export class BodyBuilder {
  parameters = new Map<string, string>([]);

  public set(name: string, value: string) {
    this.parameters.set(name, value);
  }

  public encode() {
    let result = "";
    this.parameters.forEach((value: string, key: string) => {
      result += key + "=" + encodeURI(value) + "&";
    });
    return result;
  }
}
