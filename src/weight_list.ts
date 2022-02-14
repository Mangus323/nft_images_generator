const weight_list: any = {
  b1: 10,
  b2: 25,
  b3: 50,
  b4: 85,
  b5: 130,
  b6: 165,
  b7: 235,
  b8: 300,
  // fur
  t1: 10,
  t2: 20,
  t3: 60,
  t4: 60,
  t5: 70,
  t6: 80,
  t7: 85,
  t8: 280,
  t163: 40,
  t164: 40,
  t165: 29,
  t166: 160,
  t333: 65,
  //body
  t13: 1,
  t15: 11,
  t16: 3,
  t17: 10,
  t18: 8,
  t19: 10,
  t20: 8,
  t21: 4,
  t22: 9,
  t23: 20,
  t24: 15,
  t25: 24,
  t26: 7,
  t27: 18,
  t28: 15,
  t29: 13,
  t30: 14,
  t31: 16,
  t32: 18,
  t33: 11,
  t34: 18,
  t35: 20,
  t36: 16,
  t37: 16,
  t38: 20,
  t39: 24,
  t41: 24,
  t42: 17,
  t43: 15,
  t44: 22,
  t45: 5,
  t47: 18,
  t48: 12,
  t50: 12,
  t51: 12,
  t52: 20,
  t53: 6,
  t68: 9,
  t69: 13,
  t70: 14,
  t71: 2,
  t72: 13,
  t73: 22,
  t74: 22,
  t157: 11,
  t158: 18,
  t188: 10,
  t401: 31,
  t402: 25,
  t403: 43,
  t404: 41,
  t405: 27,
  t406: 33,
  t407: 39,
  t408: 14,
  t409: 35,
  t410: 29,
  t411: 37,
  // mouth
  t75: 95,
  t76: 8,
  t77: 110,
  t78: 29,
  t79: 40,
  t80: 50,
  t81: 60,
  t82: 12,
  t83: 100,
  t161: 72,
  t162: 85,
  //eyes
  t106: 8,
  t107: 16,
  t108: 50,
  t109: 32,
  t110: 76,
  t111: 47,
  t112: 66,
  t113: 82,
  t114: 72,
  t115: 55,
  t116: 56,
  t117: 40,
  t118: 24,
  t119: 64,

  //face masks
  t54: 21,
  t55: 12,
  t56: 14,
  t57: 24,
  t58: 16,
  t59: 6,
  t60: 26,
  t61: 20,
  t62: 23,
  t63: 29,
  t64: 8,
  t65: 10,
  t159: 18,
  t160: 3,
  //ears
  t100: 36,
  t101: 48,
  t102: 12,
  t103: 60,
  t104: 72,
  t105: 84,

  //eye wear
  t84: 36,
  t85: 4,
  t86: 20,
  t87: 7,
  t88: 40,
  t89: 24,
  t90: 44,
  t91: 48,
  t92: 52,
  t93: 28,
  t94: 56,
  t95: 60,
  t96: 32,
  t97: 12,
  t98: 64,
  t99: 16,
  // nose wear
  t66: 32,
  t67: 56,
  t656: 64,

  //head
  t120: 3,
  t121: 5,
  t122: 23,
  t123: 6,
  t124: 7,
  t125: 8,
  t126: 12,
  t127: 10,
  t128: 26,
  t129: 28,
  t130: 29,
  t131: 16,
  t132: 30,
  t133: 31,
  t134: 32,
  t135: 24,
  t136: 34,
  t137: 15,
  t138: 17,
  t139: 35,
  t140: 18,
  t141: 36,
  t142: 37,
  t143: 20,
  t144: 22,
  t145: 19,
  t146: 4,
  t147: 33,
  t148: 21,
  t151: 13,
  t152: 9,
  t153: 14,
  t154: 11,
  t654: 46,
  t655: 44,
};

export const getWeight = (id: string) => {
  if (id === 'base' || id === 'empty')
    return 0;

  if (weight_list[id]) {
    return weight_list[id];
  }
  console.log('ERROR NOT FOUND WEIGHT: ' + id);
  return 0;
};
