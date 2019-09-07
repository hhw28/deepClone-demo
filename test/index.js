const chai = require("chai");
const deepClone = require("../src/index");
const assert = chai.assert;

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
      const a2 = deepClone(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.child !== a2.child);
      assert(a.child.name === a2.child.name);
    });
    it("能够复制数组对象", () => {
      const a = [[1, "2"], [3, 4]];
      const a2 = deepClone(a);
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
      const a2 = deepClone(a);
      assert(a !== a2);
      assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
      assert(a.xxx.yyy !== a2.xxx.yyy);
      assert(a.xxx !== a2.xxx);
      assert(a() === a2());
    });
    it("能够复制环", () => {
      const a = { name: "haha" };
      a.self = a;
      const a2 = deepClone(a);
      assert(a !== a2);
      assert(a.name === a2.name);
      assert(a.self !== a2.self);
      assert(a.self.name === a2.self.name);
    });
  });
});
