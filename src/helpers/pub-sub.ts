type TCallback = (value: any) => void;

interface ISubscriber {
  [id: string]: TCallback[];
}

export abstract class PubSub {
  private subscribers: ISubscriber = {};

  public subscribe(id: string = '', callback: TCallback): void {
    this.subscribers[id] = this.subscribers[id] || [];
    this.subscribers[id] = [...this.subscribers[id], callback];
  }

  public unsubscribe(id: string = '', callback: TCallback): void {
    this.subscribers[id] = this.subscribers[id]
      ? this.subscribers[id].filter(filteredCallback => filteredCallback.toString() !== callback.toString())
      : undefined;

    this.subscribers[id] = this.subscribers[id] && this.subscribers[id].length
      ? this.subscribers[id]
      : undefined;
  }

  public unsubscribeAll(): void {
    for (const id in this.subscribers) {
      if (this.subscribers.hasOwnProperty(id)) {
        this.subscribers[id] = [];
      }
    }
  }

  protected publish(id: string = '', value: any): void {
    if (this.subscribers[id]) {
      this.subscribers[id].forEach(subscriber => subscriber(value));
    }
  }
}
