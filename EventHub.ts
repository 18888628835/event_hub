type X = {
  [key: string]: Array<(data: unknown) => any>;
};
class EventHub {
  private cache: X = {}; //缓存器
  //订阅模式
  on(eventName: string, fn: (data: unknown) => any) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }
  emit(eventName: string, data: unknown) {
    //发布模式
    if (!this.cache[eventName]) return null;
    this.cache[eventName].forEach((fn) => {
      fn(data);
    });
  }
  off(eventName: string, fn) {
    // 取消订阅
    if (!this.cache[eventName]) return;
    const index = this.cache[eventName].findIndex((f) => {
      return f === fn;
    });
    index === -1 ? null : this.cache[eventName].splice(index, 1);
  }
}
