export default class Bucket<T> {
  #items: T[];

  constructor(list: T[]) {
    this.#items = [...list];
  }

  draw(): T {
    if (this.#items.length === 0) {
      throw new Error("The bucket is empty.");
    }

    const randomIndice = Math.floor(Math.random() * this.#items.length);
    const pickedElement = this.#items[randomIndice];

    if (pickedElement === undefined) {
      throw new Error("The bucket is empty.");
    }

    const index = this.#items.indexOf(pickedElement, 0);
    if (index > -1) {
      this.#items.splice(index, 1);
    }

    return pickedElement;
  }

  get length(): number {
    return this.#items.length;
  }

  get items(): readonly T[] {
    return [...this.#items];
  }
}
