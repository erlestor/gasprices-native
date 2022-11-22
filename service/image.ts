interface Image {
  name: string
  image: HTMLImageElement
}
export class Images {
  private static images: Array<Image> = [
    {
      name: "Circle K",
      image: require("../assets/circleK.png"),
    },
    {
      name: "Esso",
      image: require("../assets/esso.png"),
    },
    {
      name: "Shell",
      image: require("../assets/shell.jpg"),
    },
    {
      name: "Uno-X",
      image: require("../assets/uno-x.png"),
    },
  ]
  static GetImage = (name: string) => {
    const found = Images.images.find((e) => e.name === name)
    return found ? found.image : null
  }
}
