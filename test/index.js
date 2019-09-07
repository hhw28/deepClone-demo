const chai = require("chai");
const DeepClone = require("../src/index");
const assert = chai.assert;

// const deepClone = new DeepClone().clone;

describe("深拷贝", () => {
  it("deepClone是个函数", () => {
    assert.isFunction(deepClone);
  });
  it("能够复制基本类型", () => {
    const n = 123;
    const n2 = deepClone(n);
    assert(n === n2);
    const s = "123";
    const s2 = deepClone(s);
    assert(s === s2);
    const b = true;
    const b2 = deepClone(b);
    assert(b === b2);
    const u = undefined;
    const u2 = deepClone(u);
    assert(u === u2);
    const null1 = null;
    const null2 = deepClone(null1);
    assert(null1 === null2);
    // const symbol1 = new Symbol();
    // const symbol2 = deepClone(symbol1);
    // assert(symbol1 === symbol2);
  });
  describe("对象", () => {
    it("能够复制普通对象", () => {
      const a = { name: "haha", child: { name: "lala" } };
      const a2 = new DeepClone().clone(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.child !== a2.child);
      assert(a.child.name === a2.child.name);
    });
    it("能够复制数组对象", () => {
      const a = [[1, "2"], [3, 4]];
      const a2 = new DeepClone().clone(a);
      assert(a !== a2);
      assert(a[0] !== a2[0]);
      assert(a[1] !== a2[1]);
      assert.deepEqual(a, a2);
    });
    it("能够复制函数", () => {
      const a = function() {
        return 1;
      };
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = new DeepClone().clone(a);
      assert(a !== a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
      assert(a() === a2());
    });
    it("能够复制环", () => {
      const a = { name: "haha" };
      a.self = a;
      const a2 = new DeepClone().clone(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.self !== a2.self);
      assert(a.self.name === a2.self.name);
    });
    xit("不爆栈", () => {
      const a = { name: "haha" };
      let b = a;
      for (let i = 0; i < 10000; i++) {
        b.child = {
          child: null
        };
        b = b.child;
      }
      const a2 = new DeepClone().clone(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.child !== a2.child);
    });
    it("能够复制正则", () => {
      const a = new RegExp("hid+", "gi");
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = new DeepClone().clone(a);
      assert(a.source === a2.source);
      assert(a.flags === a2.flags);
      assert(a !== a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("能够复制Date", () => {
      const a = new Date();
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = new DeepClone().clone(a);
      assert(a.getTime() === a2.getTime());
      assert(a !== a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("自动跳过原型", () => {
      const a = Object.create({ name: "haha" });
      a.xxx = { yyy: { zzz: 1 } };
      const a2 = new DeepClone().clone(a);
      assert.isFalse("name" in a2);
      assert(a !== a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
    });
    it("很复杂的对象", () => {
      const a = {
        n: NaN,
        n2: Infinity,
        s: "",
        bool: false,
        null: null,
        u: undefined,
        sym: Symbol(),
        o: {
          n: NaN,
          n2: Infinity,
          s: "",
          bool: false,
          null: null,
          u: undefined,
          sym: Symbol()
        },
        array: [
          {
            n: NaN,
            n2: Infinity,
            s: "",
            bool: false,
            null: null,
            u: undefined,
            sym: Symbol()
          }
        ]
      };
      const a2 = new DeepClone().clone(a);
      assert(a !== a2);
      assert.isNaN(a2.n);
      assert(a.n2 === a2.n2);
      assert(a.s === a2.s);
      assert(a.bool === a2.bool);
      assert(a.null === a2.null);
      assert(a.u === a2.u);
      assert(a.sym === a2.sym);
      assert(a.o !== a2.o);
      assert.isNaN(a2.o.n);
      assert(a.o.n2 === a2.o.n2);
      assert(a.o.s === a2.o.s);
      assert(a.o.bool === a2.o.bool);
      assert(a.o.null === a2.o.null);
      assert(a.o.u === a2.o.u);
      assert(a.o.sym === a2.o.sym);
      assert(a.array !== a2.array);
      assert(a.array[0] !== a2.array[0]);
      assert.isNaN(a2.array[0].n);
      assert(a.array[0].n2 === a2.array[0].n2);
      assert(a.array[0].s === a2.array[0].s);
      assert(a.array[0].bool === a2.array[0].bool);
      assert(a.array[0].null === a2.array[0].null);
      assert(a.array[0].u === a2.array[0].u);
      assert(a.array[0].sym === a2.array[0].sym);
    });
  });
});
