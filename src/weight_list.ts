// monkey
const weight_list: any = {
  t106:	9,
  t107:	19,
  t118:	28,
  t109:	38,
  t114:	43,
  t110:	45,
  t117:	48,
  t112:	49,
  t113:	55,
  t111:	56,
  t108:	60,
  t115:	66,
  t116:	67,
  t119:	76,

  t160: 3,
  t59: 4,
  t64: 7,
  t65: 8,
  t55: 10,
  t56: 13,
  t63: 15,
  t58: 17,
  t57: 20,
  t159: 21,
  t62: 22,
  t61: 21,
  t54: 25,
  t60: 28,


  b1: 10,
  b2: 25,
  b3: 50,
  b4: 85,
  b5: 130,
  b6: 165,
  b7: 235,
  b8: 300,
  t165: 30,
  t163: 40,
  t164: 40,
  t1: 10,
  t2: 20,
  t3: 60,
  t333: 65,
  t4: 60,
  t5: 70,
  t8: 280,
  t166: 160,
  t7: 85,
  t6: 80,
  t13: 1,
  t71: 2,
  t16: 3,
  t21: 4,
  t45: 5,
  t53: 6,
  t26: 7,
  t20: 8,
  t18: 8,
  t22: 9,
  t68: 9,
  t33: 9,
  t48: 9,
  t188: 10,
  t17: 11,
  t19: 12,
  t157: 13,
  t15: 11,
  t29: 11,
  t50: 12,
  t51: 12,
  t69: 13,
  t72: 13,
  t32: 13,
  t408: 14,
  t70: 14,
  t30: 14,
  t24: 16,
  t43: 15,
  t28: 15,
  t36: 16,
  t31: 16,
  t37: 16,
  t47: 16,
  t38: 16,
  t42: 18,
  t52: 17,
  t34: 19,
  t27: 19,
  t158: 19,
  t23: 22,
  t35: 22,
  t74: 23,
  t44: 23,
  t73: 23,
  t39: 24,
  t41: 24,
  t25: 25,
  t402: 26,
  t405: 27,
  t410: 28,
  t401: 29,
  t406: 30,
  t409: 31,
  t411: 32,
  t407: 33,
  t404: 35,
  t403: 36,
  t999: 36,
  t80: 25,
  t78: 17,
  t82: 13,
  t76: 9,
  t79: 21,
  t83: 53,
  t380: 29,
  t378: 33,
  t383: 37,
  t162: 49,
  t382: 36,
  t381: 28,
  t161: 40,
  t385: 27,
  t384: 34,
  t379: 27,
  t86: 20,
  t97: 12,
  t85: 4,
  t99: 16,
  t87: 7,
  t84: 36,
  t89: 24,
  t96: 32,
  t93: 28,
  t88: 40,
  t98: 64,
  t91: 48,
  t90: 44,
  t95: 60,
  t94: 56,
  t92: 52,
  t100: 36,
  t102: 12,
  t105: 84,
  t101: 48,
  t103: 60,
  t104: 72,
  t66: 32,
  t67: 56,
  t656: 64,
  t120: 3,
  t146: 4,
  t121: 5,
  t123: 6,
  t124: 7,
  t125: 8,
  t152: 9,
  t127: 10,
  t154: 9,
  t126: 12,
  t151: 11,
  t153: 12,
  t137: 11,
  t131: 16,
  t135: 16,
  t138: 17,
  t140: 18,
  t145: 19,
  t143: 20,
  t122: 20,
  t148: 21,
  t144: 22,
  t130: 22,
  t133: 23,
  t128: 23,
  t147: 24,
  t129: 26,
  t134: 26,
  t141: 27,
  t132: 28,
  t136: 31,
  t142: 35,
  t139: 40,
  t654: 51,
  t655: 51,
};

// panda
// const weight_list: any = {
//   b1: 10,
//   b2: 25,
//   b3: 50,
//   b4: 85,
//   b5: 130,
//   b6: 165,
//   b7: 235,
//   b8: 300,
//
//   t165: 30,
//   t2: 20,
//   t164: 40,
//   t163: 40,
//   t1: 10,
//   t333: 65,
//   t3: 60,
//   t5: 70,
//   t4: 60,
//   t8: 280,
//   t7: 85,
//   t166: 160,
//   t6: 80,
//
//   t13: 1,
//   t53: 6,
//   t45: 5,
//   t26: 7,
//   t20: 8,
//   t18: 8,
//   t21: 4,
//   t22: 9,
//   t16: 3,
//   t71: 2,
//   t51: 12,
//   t17: 10,
//   t50: 12,
//   t68: 9,
//   t157: 11,
//   t48: 12,
//   t19: 10,
//   t15: 11,
//   t33: 11,
//   t188: 10,
//   t405: 27,
//   t402: 25,
//   t401: 31,
//   t34: 18,
//   t39: 24,
//   t38: 20,
//   t28: 15,
//   t404: 41,
//   t24: 15,
//   t52: 20,
//   t41: 24,
//   t74: 24,
//   t27: 18,
//   t403: 43,
//   t29: 13,
//   t43: 15,
//   t73: 22,
//   t25: 24,
//   t42: 17,
//   t35: 20,
//   t411: 37,
//   t409: 35,
//   t406: 33,
//   t72: 13,
//   t410: 29,
//   t69: 13,
//   t37: 16,
//   t407: 38,
//   t158: 18,
//   t44: 22,
//   t31: 16,
//   t23: 20,
//   t32: 18,
//   t36: 16,
//   t70: 14,
//   t47: 18,
//   t30: 13,
//   t408: 14,
//
//   t78: 29,
//   t80: 50,
//   t79: 40,
//   t76: 8,
//   t82: 12,
//   t75: 95,
//   t161: 72,
//   t81: 60,
//   t162: 85,
//   t77: 111,
//   t83: 98,
//   t111: 48,
//   t118: 24,
//   t117: 40,
//   t363: 32,
//   t107: 16,
//   t106: 8,
//   t108: 50,
//   t116: 56,
//   t115: 55,
//   t112: 66,
//   t119: 64,
//   t114: 72,
//   t110: 76,
//   t113: 82,
//
//   t160: 3,
//   t60: 26,
//   t159: 18,
//   t54: 21,
//   t62: 23,
//   t65: 10,
//   t303: 12,
//   t56: 14,
//   t58: 16,
//   t63: 29,
//   t64: 8,
//   t59: 6,
//   t61: 20,
//   t57: 24,
//
//   t101: 48,
//   t102: 12,
//   t100: 36,
//   t105: 84,
//   t104: 72,
//   t103: 60,
//
//   t87: 8,
//   t86: 20,
//   t89: 24,
//   t97: 12,
//   t99: 16,
//   t85: 4,
//   t96: 32,
//   t84: 36,
//   t93: 28,
//   t88: 40,
//   t90: 44,
//   t98: 64,
//   t91: 48,
//   t92: 52,
//   t95: 60,
//   t94: 56,
//
//   t67: 56,
//   t66: 32,
//   t656: 64,
//
//   t126: 12,
//   t151: 13,
//   t154: 11,
//   t121: 5,
//   t124: 7,
//   t146: 4,
//   t152: 9,
//   t120: 3,
//   t125: 8,
//   t123: 6,
//   t145: 19,
//   t138: 17,
//   t140: 18,
//   t144: 22,
//   t127: 10,
//   t148: 21,
//   t122: 23,
//   t131: 16,
//   t143: 20,
//   t153: 14,
//   t137: 15,
//   t134: 32,
//   t139: 35,
//   t141: 36,
//   t142: 37,
//   t654: 46,
//   t130: 29,
//   t128: 26,
//   t147: 33,
//   t135: 24,
//   t655: 44,
//   t129: 28,
//   t132: 30,
//   t136: 34,
//   t133: 31,
// };

// hyena
// const weight_list: any = {
//   t146:	4,
//   t120:	3,
//   t154:	11,
//   t127:	10,
//   t125:	8,
//   t121:	5,
//   t152:	9,
//   t124:	7,
//   t123:	6,
//   t126:	12,
//   t133:	19,
//   t151:	13,
//   t131:	16,
//   t128:	17,
//   t140:	18,
//   t135:	14,
//   t138:	17,
//   t129:	16,
//   t137:	15,
//   t153:	14,
//   t130:	22,
//   t136:	25,
//   t144:	22,
//   t145:	19,
//   t132:	22,
//   t134:	27,
//   t143:	20,
//   t148:	21,
//   t141:	22,
//   t147:	22,
//   t654:	29,
//   t142:	25,
//   t122:	23,
//   t139:	23,
//   t655:	33,
//
//
//
//   t76: 15,
//   t83: 18,
//   t78: 21,
//   t79: 24,
//   t379: 27,
//   t80: 30,
//   t380: 33,
//   t381: 36,
//   t385: 39,
//   t378: 42,
//   t384: 45,
//   t382: 48,
//   t161: 51,
//   t383: 54,
//   t75: 57,
//   t77: 60,
//   t162: 63,
//   t82: 66,
//
//   t92: 52,
//   t87: 8,
//   t85: 4,
//   t86: 20,
//   t97: 12,
//   t99: 16,
//   t93: 28,
//   t84: 36,
//   t96: 32,
//   t88: 40,
//   t89: 23,
//   t98: 64,
//   t94: 56,
//   t91: 48,
//   t95: 60,
//   t90: 44,
//   t476: 23,
//   b1: 10,
//   b2: 25,
//   b3: 50,
//   b4: 85,
//   b5: 130,
//   b6: 165,
//   b7: 235,
//   b8: 300,
//   t165: 30,
//   t2: 20,
//   t164: 40,
//   t163: 40,
//   t1: 10,
//   t3: 60,
//   t5: 70,
//   t4: 60,
//   t333: 65,
//   t8: 280,
//   t7: 85,
//   t166: 160,
//   t6: 80,
//   t13: 1,
//   t71: 2,
//   t16: 3,
//   t21: 4,
//   t45: 5,
//   t53: 5,
//   t26: 5,
//   t20: 6,
//   t18: 6,
//   t68: 7,
//   t22: 7,
//   t19: 8,
//   t33: 8,
//   t188: 8,
//   t15: 9,
//   t50: 9,
//   t48: 9,
//   t51: 10,
//   t29: 10,
//   t69: 10,
//   t72: 12,
//   t408: 12,
//   t30: 12,
//   t70: 13,
//   t28: 13,
//   t43: 13,
//   t24: 14,
//   t31: 14,
//   t42: 14,
//   t47: 14,
//   t27: 15,
//   t34: 15,
//   t32: 15,
//   t52: 15,
//   t37: 16,
//   t38: 16,
//   t36: 16,
//   t35: 16,
//   t73: 17,
//   t17: 17,
//   t44: 17,
//   t157: 18,
//   t158: 18,
//   t23: 18,
//   t74: 19,
//   t25: 19,
//   t39: 19,
//   t41: 19,
//   t402: 20,
//   t1013: 20,
//   t405: 21,
//   t1012: 22,
//   t406: 23,
//   t401: 23,
//   t410: 26,
//   t644: 27,
//   t409: 28,
//   t645: 29,
//   t411: 30,
//   t712: 31,
//   t407: 32,
//   t404: 33,
//   t403: 34,
//   t106: 8,
//   t107: 12,
//   t118: 16,
//   t109: 22,
//   t117: 28,
//   t111: 36,
//   t112: 38,
//   t913: 40,
//   t116: 42,
//   t119: 44,
//   t912: 46,
//   t108: 48,
//   t114: 54,
//   t115: 56,
//   t113: 58,
//   t110: 61,
//   t160: 3,
//   t54: 21,
//   t159: 18,
//   t59: 6,
//   t60: 25,
//   t57: 24,
//   t634: 31,
//   t100: 36,
//   t102: 12,
//   t103: 60,
//   t101: 48,
//   t105: 84,
//   t104: 72,
//   t66: 32,
//   t67: 56,
//   t656: 64,
//   t861: 10,
//   t862: 21,
//   t1011: 25,
//   t1488: 29,
//   t999: 33,
// };

// warthog
// export const weight_list: any = {
//   t999: 35,
//   b1: 10,
//   b2: 25,
//   b3: 50,
//   b4: 85,
//   b5: 130,
//   b6: 165,
//   b7: 235,
//   b8: 300,
//   t164: 40,
//   t163: 40,
//   t165: 30,
//   t1: 10,
//   t2: 20,
//   t4: 60,
//   t5: 70,
//   t333: 65,
//   t3: 60,
//   t8: 280,
//   t166: 160,
//   t7: 85,
//   t6: 80,
//   t13: 1,
//   t71: 2,
//   t16: 3,
//   t21: 4,
//   t45: 5,
//   t53: 6,
//   t26: 6,
//   t32: 6,
//   t38: 6,
//   t20: 7,
//   t18: 7,
//   t33: 7,
//   t22: 7,
//   t68: 7,
//   t47: 8,
//   t52: 8,
//   t17: 9,
//   t188: 9,
//   t19: 9,
//   t157: 10,
//   t51: 10,
//   t822: 10,
//   t15: 11,
//   t48: 7,
//   t50: 11,
//   t29: 11,
//   t72: 12,
//   t69: 12,
//   t30: 12,
//   t70: 13,
//   t408: 13,
//   t43: 13,
//   t28: 14,
//   t24: 15,
//   t36: 16,
//   t31: 16,
//   t37: 16,
//   t42: 17,
//   t27: 18,
//   t34: 18,
//   t158: 18,
//   t23: 18,
//   t35: 19,
//   t41: 19,
//   t74: 19,
//   t44: 19,
//   t73: 20,
//   t25: 20,
//   t39: 20,
//   t402: 21,
//   t405: 22,
//   t1012: 23,
//   t406: 24,
//   t401: 25,
//   t410: 25,
//   t644: 25,
//   t1013: 26,
//   t409: 27,
//   t645: 28,
//   t411: 29,
//   t712: 30,
//   t407: 31,
//   t404: 32,
//   t403: 33,
//   t76: 8,
//   t83: 13,
//   t78: 18,
//   t79: 23,
//   t379: 28,
//   t80: 33,
//   t380: 38,
//   t381: 43,
//   t385: 48,
//   t378: 53,
//   t382: 58,
//   t161: 63,
//   t383: 68,
//   t75: 73,
//   t162: 78,
//   t82: 83,
//   t106: 8,
//   t107: 14,
//   t912: 18,
//   t118: 22,
//   t109: 26,
//   t117: 30,
//   t913: 34,
//   t111: 38,
//   t108: 42,
//   t115: 46,
//   t116: 50,
//   t112: 54,
//   t119: 58,
//   t114: 62,
//   t113: 66,
//   t110: 70,
//   t160: 3,
//   t58: 26,
//   t59: 6,
//   t55: 22,
//   t634: 41,
//   t100: 36,
//   t102: 12,
//   t101: 48,
//   t103: 60,
//   t105: 84,
//   t104: 72,
//   t476: 26,
//   t66: 32,
//   t67: 56,
//   t656: 64,
//   t120: 3,
//   t146: 4,
//   t121: 5,
//   t124: 6,
//   t125: 6,
//   t152: 7,
//   t127: 8,
//   t154: 9,
//   t151: 9,
//   t148: 9,
//   t145: 10,
//   t126: 11,
//   t128: 11,
//   t122: 11,
//   t137: 11,
//   t129: 12,
//   t131: 12,
//   t143: 12,
//   t861: 12,
//   t138: 12,
//   t135: 13,
//   t144: 14,
//   t140: 15,
//   t133: 16,
//   t134: 17,
//   t136: 18,
//   t862: 19,
//   t141: 20,
//   t132: 21,
//   t130: 22,
//   t139: 23,
//   t1011: 24,
//   t142: 25,
//   t147: 26,
//   t1148: 37,
//   t655: 38,
//   t654: 40,
//
//   t85: 4,
//   t87: 8,
//   t97: 12,
//   t99: 16,
//   t86: 20,
//   t89: 23,
//   t93: 28,
//   t96: 32,
//   t84: 36,
//   t88: 40,
//   t90: 44,
//   t91: 48,
//   t92: 52,
//   t94: 56,
//   t95: 60,
//   t98: 64,
//
// };

//koala
// export const weight_list: any = {
//   b1: 10,
//   b2: 25,
//   b3: 50,
//   b4: 85,
//   b5: 130,
//   b6: 165,
//   b7: 235,
//   b8: 300,
//   t1: 10,
//   t2: 20,
//   t165: 30,
//   t163: 40,
//   t164: 40,
//   t4: 60,
//   t3: 60,
//   t333: 65,
//   t5: 70,
//   t6: 80,
//   t7: 85,
//   t166: 160,
//   t8: 280,
//   t76: 8,
//   t83: 12,
//   t78: 29,
//   t79: 40,
//   t80: 50,
//   t81: 60,
//   t161: 72,
//   t162: 85,
//   t75: 95,
//   t82: 100,
//   t77: 110,
//   t106: 8,
//   t107: 16,
//   t118: 24,
//   t109: 32,
//   t117: 40,
//   t111: 48,
//   t108: 50,
//   t115: 55,
//   t116: 56,
//   t119: 64,
//   t112: 66,
//   t114: 72,
//   t110: 76,
//   t113: 82,
//   t160: 3,
//   t59: 6,
//   t64: 8,
//   t65: 10,
//   t55: 11,
//   t56: 14,
//   t58: 16,
//   t159: 18,
//   t61: 20,
//   t54: 21,
//   t62: 23,
//   t57: 24,
//   t60: 25,
//   t63: 29,
//   t102: 12,
//   t100: 36,
//   t101: 48,
//   t103: 60,
//   t104: 72,
//   t105: 84,
//   t85: 4,
//   t87: 8,
//   t97: 12,
//   t99: 16,
//   t86: 20,
//   t89: 23,
//   t93: 28,
//   t96: 32,
//   t84: 36,
//   t88: 40,
//   t90: 44,
//   t91: 48,
//   t92: 52,
//   t94: 56,
//   t95: 60,
//   t98: 64,
//   t66: 32,
//   t67: 56,
//   t656: 64,
//   t13: 1,
//   t71: 2,
//   t16: 3,
//   t21: 4,
//   t45: 5,
//   t53: 6,
//   t26: 7,
//   t18: 8,
//   t20: 8,
//   t22: 9,
//   t68: 9,
//   t188: 10,
//   t19: 10,
//   t17: 10,
//   t33: 11,
//   t15: 11,
//   t157: 11,
//   t51: 12,
//   t48: 12,
//   t50: 12,
//   t72: 13,
//   t69: 13,
//   t29: 13,
//   t30: 14,
//   t70: 14,
//   t408: 14,
//   t28: 15,
//   t24: 15,
//   t43: 15,
//   t31: 16,
//   t36: 16,
//   t37: 16,
//   t42: 17,
//   t32: 18,
//   t27: 18,
//   t158: 18,
//   t47: 18,
//   t34: 18,
//   t23: 20,
//   t52: 20,
//   t38: 20,
//   t35: 20,
//   t74: 22,
//   t44: 22,
//   t73: 22,
//   t25: 24,
//   t39: 24,
//   t41: 24,
//   t402: 25,
//   t405: 27,
//   t410: 29,
//   t401: 31,
//   t406: 33,
//   t409: 35,
//   t411: 37,
//   t407: 39,
//   t404: 41,
//   t403: 43,
//   t120: 3,
//   t146: 4,
//   t121: 5,
//   t123: 6,
//   t124: 7,
//   t125: 8,
//   t152: 9,
//   t127: 10,
//   t154: 11,
//   t126: 12,
//   t151: 13,
//   t135: 14,
//   t153: 14,
//   t137: 15,
//   t131: 16,
//   t129: 16,
//   t138: 17,
//   t128: 17,
//   t140: 18,
//   t145: 19,
//   t133: 19,
//   t143: 20,
//   t148: 21,
//   t144: 22,
//   t141: 22,
//   t132: 22,
//   t130: 22,
//   t147: 22,
//   t122: 23,
//   t139: 23,
//   t142: 25,
//   t136: 25,
//   t134: 27,
//   t654: 29,
//   t655: 33,
// };

// cheetah
// const weight_list: any = {
//   b1: 10,
//   b2: 25,
//   b3: 50,
//   b4: 85,
//   b5: 130,
//   b6: 165,
//   b7: 235,
//   b8: 300,
//   t164: 40,
//   t163: 40,
//   t165: 30,
//   t2: 20,
//   t1: 10,
//   t4: 60,
//   t3: 60,
//   t5: 70,
//   t333: 65,
//   t7: 85,
//   t6: 80,
//   t8: 280,
//   t166: 160,
//   t13: 1,
//   t109: 25,
//   t16: 4,
//   t21: 5,
//   t45: 5,
//   t53: 6,
//   t26: 5,
//   t18: 7,
//   t20: 7,
//   t22: 7,
//   t68: 7,
//   t19: 8,
//   t188: 9,
//   t17: 9,
//   t157: 10,
//   t15: 10,
//   t33: 8,
//   t51: 11,
//   t50: 11,
//   t48: 9,
//   t29: 9,
//   t72: 10,
//   t69: 12,
//   t408: 12,
//   t30: 12,
//   t70: 12,
//   t28: 12,
//   t24: 13,
//   t43: 14,
//   t36: 14,
//   t37: 15,
//   t31: 16,
//   t42: 16,
//   t34: 15,
//   t47: 14,
//   t27: 16,
//   t32: 17,
//   t158: 17,
//   t38: 17,
//   t23: 18,
//   t52: 18,
//   t35: 18,
//   t44: 19,
//   t73: 18,
//   t74: 19,
//   t41: 19,
//   t39: 20,
//   t402: 21,
//   t1012: 22,
//   t25: 23,
//   t405: 24,
//   t1013: 24,
//   t406: 24,
//   t401: 25,
//   t410: 25,
//   t644: 25,
//   t409: 27,
//   t645: 27,
//   t411: 28,
//   t712: 29,
//   t407: 29,
//   t404: 30,
//   t403: 31,
//   t999: 32,
//
//   t76: 8,
//   t83: 14,
//   t78: 17,
//   t79: 20,
//   t379: 23,
//   t80: 26,
//   t380: 29,
//   t381: 32,
//   t385: 35,
//   t378: 38,
//   t384: 41,
//   t382: 44,
//   t161: 47,
//   t383: 50,
//   t75: 53,
//   t77: 56,
//   t162: 59,
//   t82: 62,
//   t106: 8,
//   t107: 13,
//   t912: 17,
//   t118: 21,
//   t71: 3,
//   t117: 29,
//   t913: 33,
//   t119: 37,
//   t112: 41,
//   t111: 45,
//   t114: 49,
//   t108: 53,
//   t115: 57,
//   t116: 61,
//   t113: 65,
//   t110: 69,
//   t160: 3,
//   t59: 6,
//   t58: 16,
//   t159: 18,
//   t54: 21,
//   t62: 23,
//   t60: 35,
//   t63: 40,
//   t634: 43,
//   t100: 36,
//   t102: 12,
//   t101: 48,
//   t103: 60,
//   t105: 84,
//   t104: 72,
//   t85: 6,
//   t87: 8,
//   t97: 10,
//   t99: 13,
//   t86: 16,
//   t89: 19,
//   t93: 22,
//   t476: 25,
//   t96: 28,
//   t84: 31,
//   t88: 34,
//   t90: 37,
//   t91: 40,
//   t92: 43,
//   t94: 46,
//   t95: 49,
//   t98: 52,
//   t66: 32,
//   t67: 56,
//   t656: 64,
//   t120: 3,
//   t146: 4,
//   t123: 4,
//   t124: 5,
//   t125: 5,
//   t153: 6,
//   t152: 6,
//   t127: 7,
//   t137: 7,
//   t154: 8,
//   t151: 8,
//   t122: 9,
//   t145: 9,
//   t148: 9,
//   t121: 10,
//   t129: 12,
//   t126: 13,
//   t135: 12,
//   t144: 13,
//   t861: 14,
//   t131: 15,
//   t128: 16,
//   t138: 17,
//   t140: 18,
//   t143: 19,
//   t133: 21,
//   t862: 22,
//   t141: 23,
//   t147: 24,
//   t132: 25,
//   t130: 25,
//   t139: 26,
//   t136: 27,
//   t1011: 29,
//   t142: 29,
//   t1148: 32,
//   t134: 31,
//   t654: 34,
//   t655: 36,
// };

// rhino
// const weight_list: any = {
//   t999: 35,
//   b1: 10,
//   b2: 25,
//   b3: 50,
//   b4: 85,
//   b5: 130,
//   b6: 165,
//   b7: 235,
//   b8: 300,
//   t165: 30,
//   t164: 40,
//   t2: 20,
//   t163: 40,
//   t1: 10,
//   t5: 70,
//   t333: 65,
//   t3: 60,
//   t4: 60,
//   t8: 280,
//   t166: 160,
//   t7: 85,
//   t6: 80,
//   t13: 1,
//   t109: 25,
//   t16: 3,
//   t21: 4,
//   t45: 5,
//   t26: 6,
//   t53: 6,
//   t18: 7,
//   t22: 8,
//   t20: 8,
//   t188: 9,
//   t68: 9,
//   t17: 10,
//   t33: 10,
//   t19: 10,
//   t51: 11,
//   t15: 11,
//   t157: 11,
//   t48: 11,
//   t72: 11,
//   t69: 11,
//   t30: 11,
//   t50: 12,
//   t29: 12,
//   t28: 13,
//   t70: 13,
//   t408: 13,
//   t43: 13,
//   t36: 14,
//   t24: 14,
//   t31: 15,
//   t42: 15,
//   t37: 16,
//   t47: 16,
//   t158: 16,
//   t32: 17,
//   t23: 17,
//   t27: 17,
//   t34: 18,
//   t52: 18,
//   t41: 19,
//   t38: 19,
//   t677: 19,
//   t678: 19,
//   t44: 20,
//   t73: 20,
//   t39: 20,
//   t74: 20,
//   t35: 20,
//   t25: 22,
//   t1013: 21,
//   t1012: 23,
//   t402: 22,
//   t644: 23,
//   t405: 23,
//   t410: 24,
//   t401: 25,
//   t409: 27,
//   t406: 29,
//   t645: 29,
//   t712: 29,
//   t404: 31,
//   t411: 31,
//   t407: 32,
//   t403: 33,
//   t76: 17,
//   t83: 20,
//   t78: 23,
//   t79: 26,
//   t379: 29,
//   t75: 32,
//   t80: 35,
//   t383: 38,
//   t380: 41,
//   t161: 44,
//   t381: 47,
//   t385: 50,
//   t162: 53,
//   t77: 56,
//   t378: 59,
//   t384: 62,
//   t82: 65,
//   t382: 68,
//   t106: 8,
//   t107: 13,
//   t118: 17,
//   t913: 21,
//   t71: 2,
//   t117: 29,
//   t111: 33,
//   t912: 37,
//   t119: 41,
//   t108: 45,
//   t112: 49,
//   t115: 53,
//   t116: 57,
//   t114: 61,
//   t113: 65,
//   t110: 69,
//   t160: 3,
//   t159: 18,
//   t58: 16,
//   t60: 25,
//   t57: 24,
//   t634: 42,
//   t100: 36,
//   t102: 12,
//   t101: 48,
//   t103: 60,
//   t104: 72,
//   t105: 84,
//   t85: 6,
//   t612: 7,
//   t87: 8,
//   t97: 10,
//   t99: 13,
//   t86: 16,
//   t89: 19,
//   t611: 22,
//   t476: 25,
//   t93: 28,
//   t96: 31,
//   t84: 34,
//   t88: 37,
//   t90: 40,
//   t91: 43,
//   t92: 46,
//   t95: 49,
//   t94: 52,
//   t98: 55,
//   t66: 32,
//   t67: 56,
//   t656: 64,
//   t120: 3,
//   t146: 4,
//   t121: 5,
//   t125: 6,
//   t123: 6,
//   t124: 6,
//   t152: 7,
//   t127: 7,
//   t154: 7,
//   t126: 7,
//   t151: 8,
//   t153: 8,
//   t148: 8,
//   t137: 8,
//   t911: 9,
//   t135: 9,
//   t131: 9,
//   t129: 10,
//   t138: 10,
//   t128: 11,
//   t140: 12,
//   t145: 13,
//   t133: 14,
//   t861: 15,
//   t143: 16,
//   t141: 17,
//   t130: 18,
//   t132: 19,
//   t147: 20,
//   t144: 21,
//   t139: 22,
//   t872: 23,
//   t1011: 24,
//   t862: 25,
//   t122: 26,
//   t136: 27,
//   t142: 28,
//   t134: 29,
//   t1148: 30,
//   t654: 31,
//   t655: 32,
// };

// lion
// export const weight_list: any = {
//   b1: 10,
//   b2: 25,
//   b3: 50,
//   b4: 85,
//   b5: 130,
//   b6: 165,
//   b7: 235,
//   b8: 300,
//   t164: 40,
//   t2: 20,
//   t163: 40,
//   t165: 30,
//   t1: 10,
//   t333: 65,
//   t5: 70,
//   t3: 60,
//   t4: 60,
//   t8: 280,
//   t166: 160,
//   t7: 85,
//   t6: 80,
//   t53: 6,
//   t45: 5,
//   t16: 3,
//   t109: 2,
//   t13: 1,
//   t33: 7,
//   t18: 7,
//   t48: 6,
//   t21: 4,
//   t26: 5,
//   t29: 7,
//   t22: 9,
//   t15: 11,
//   t68: 9,
//   t19: 10,
//   t20: 8,
//   t17: 10,
//   t188: 10,
//   t30: 11,
//   t51: 7,
//   t157: 11,
//   t644: 26,
//   t72: 13,
//   t406: 27,
//   t404: 34,
//   t1013: 24,
//   t158: 18,
//   t401: 25,
//   t43: 15,
//   t1012: 24,
//   t403: 34,
//   t24: 14,
//   t37: 16,
//   t405: 24,
//   t712: 31,
//   t34: 18,
//   t410: 25,
//   t27: 16,
//   t35: 20,
//   t39: 19,
//   t70: 14,
//   t38: 11,
//   t52: 17,
//   t402: 22,
//   t31: 16,
//   t47: 14,
//   t32: 13,
//   t411: 31,
//   t74: 20,
//   t41: 19,
//   t407: 32,
//   t408: 12,
//   t645: 29,
//   t44: 17,
//   t42: 17,
//   t409: 28,
//   t23: 20,
//   t36: 16,
//   t73: 19,
//   t50: 12,
//   t28: 13,
//   t69: 13,
//   t25: 23,
//   t76: 9,
//   t83: 13,
//   t78: 17,
//   t79: 21,
//   t80: 25,
//   t380: 29,
//   t378: 33,
//   t383: 37,
//   t75: 41,
//   t77: 45,
//   t162: 49,
//   t82: 53,
//   t379: 57,
//   t381: 61,
//   t385: 65,
//   t382: 69,
//   t384: 73,
//   t161: 77,
//   t106: 8,
//   t107: 12,
//   t912: 16,
//   t118: 20,
//   t71: 24,
//   t117: 28,
//   t911: 32,
//   t913: 36,
//   t110: 40,
//   t112: 44,
//   t111: 48,
//   t108: 52,
//   t114: 56,
//   t115: 60,
//   t116: 64,
//   t113: 68,
//   t119: 72,
//   t160: 4,
//   t59: 7,
//   t159: 10,
//   t61: 13,
//   t54: 16,
//   t62: 19,
//   t57: 22,
//   t60: 25,
//   t63: 28,
//   t634: 31,
//   t100: 36,
//   t102: 12,
//   t103: 60,
//   t101: 48,
//   t104: 72,
//   t105: 84,
//   t85: 4,
//   t87: 8,
//   t97: 10,
//   t99: 12,
//   t86: 20,
//   t89: 21,
//   t93: 29,
//   t96: 31,
//   t476: 31,
//   t84: 38,
//   t88: 39,
//   t90: 40,
//   t91: 43,
//   t92: 48,
//   t94: 50,
//   t95: 56,
//   t98: 63,
//   t66: 32,
//   t67: 56,
//   t656: 64,
//   t120: 3,
//   t146: 4,
//   t121: 5,
//   t123: 6,
//   t125: 6,
//   t124: 6,
//   t152: 7,
//   t127: 8,
//   t154: 9,
//   t1011: 10,
//   t126: 12,
//   t135: 14,
//   t137: 16,
//   t131: 18,
//   t129: 20,
//   t128: 22,
//   t145: 24,
//   t861: 26,
//   t862: 28,
//   t133: 30,
//   t143: 32,
//   t144: 34,
//   t147: 36,
//   t122: 38,
//   t148: 40,
//   t654: 42,
//   t655: 44,
// };

//zebra
// export const weight_list: any = {
//   b1: 10,
//   b2: 25,
//   b3: 50,
//   b4: 85,
//   b5: 130,
//   b6: 165,
//   b7: 235,
//   b8: 300,
//   t1: 10,
//   t2: 20,
//   t165: 30,
//   t163: 40,
//   t164: 40,
//   t4: 60,
//   t3: 60,
//   t333: 65,
//   t5: 70,
//   t6: 80,
//   t7: 85,
//   t166: 160,
//   t8: 280,
//   t76: 8,
//   t83: 12,
//   t78: 29,
//   t79: 40,
//   t80: 50,
//   t81: 60,
//   t161: 72,
//   t162: 85,
//   t75: 95,
//   t82: 100,
//   t77: 110,
//   t106: 8,
//   t107: 16,
//   t118: 24,
//   t109: 32,
//   t117: 40,
//   t111: 48,
//   t108: 50,
//   t115: 55,
//   t116: 56,
//   t119: 64,
//   t112: 66,
//   t114: 72,
//   t110: 76,
//   t113: 82,
//   t160: 3,
//   t58: 16,
//   t159: 18,
//   t54: 21,
//   t62: 23,
//   t60: 25,
//   t63: 29,
//   t102: 12,
//   t100: 36,
//   t101: 48,
//   t103: 60,
//   t104: 72,
//   t105: 84,
//   t85: 4,
//   t87: 8,
//   t97: 10,
//   t99: 12,
//   t86: 20,
//   t89: 21,
//   t93: 29,
//   t96: 31,
//   t84: 38,
//   t88: 39,
//   t90: 40,
//   t91: 43,
//   t92: 48,
//   t94: 50,
//   t95: 56,
//   t98: 63,
//   t66: 32,
//   t67: 56,
//   t656: 64,
//   t13: 1,
//   t71: 2,
//   t16: 3,
//   t21: 4,
//   t45: 5,
//   t53: 6,
//   t26: 5,
//   t18: 7,
//   t20: 8,
//   t22: 9,
//   t68: 9,
//   t188: 10,
//   t19: 10,
//   t17: 10,
//   t33: 7,
//   t15: 11,
//   t157: 11,
//   t51: 7,
//   t48: 6,
//   t50: 12,
//   t72: 13,
//   t69: 13,
//   t29: 7,
//   t30: 11,
//   t70: 14,
//   t408: 12,
//   t28: 13,
//   t24: 14,
//   t43: 15,
//   t31: 16,
//   t36: 16,
//   t37: 16,
//   t42: 17,
//   t32: 13,
//   t27: 16,
//   t158: 18,
//   t47: 14,
//   t34: 18,
//   t23: 20,
//   t52: 17,
//   t38: 11,
//   t35: 20,
//   t74: 20,
//   t44: 17,
//   t73: 19,
//   t25: 23,
//   t39: 19,
//   t41: 19,
//   t402: 22,
//   t913: 24,
//   t912: 24,
//   t405: 24,
//   t410: 25,
//   t401: 25,
//   t644: 26,
//   t406: 27,
//   t409: 28,
//   t645: 29,
//   t712: 31,
//   t411: 31,
//   t407: 32,
//   t404: 34,
//   t403: 34,
//   t120: 3,
//   t146: 4,
//   t121: 4,
//   t123: 5,
//   t124: 6,
//   t125: 5,
//   t152: 7,
//   t127: 8,
//   t154: 10,
//   t126: 11,
//   t911: 11,
//   t135: 13,
//   t137: 14,
//   t131: 14,
//   t129: 15,
//   t138: 16,
//   t128: 17,
//   t140: 18,
//   t145: 19,
//   t133: 19,
//   t143: 19,
//   t144: 20,
//   t141: 20,
//   t132: 20,
//   t130: 21,
//   t147: 21,
//   t122: 21,
//   t872: 21,
//   t691: 21,
//   t139: 22,
//   t142: 23,
//   t136: 23,
//   t134: 24,
//   t148: 27,
//   t654: 29,
//   t655: 31,
//   t961: 10,
// };

// export const weight_list: any = {
//   b1: 10,
//   b2: 25,
//   b3: 50,
//   b4: 85,
//   b5: 130,
//   b6: 165,
//   b7: 235,
//   b8: 300,
//   t1: 10,
//   t2: 20,
//   t165: 30,
//   t163: 40,
//   t164: 40,
//   t4: 60,
//   t3: 60,
//   t333: 65,
//   t5: 70,
//   t6: 80,
//   t7: 85,
//   t166: 160,
//   t8: 280,
//   t76: 8,
//   t83: 12,
//   t78: 29,
//   t79: 40,
//   t80: 50,
//   t81: 60,
//   t161: 72,
//   t162: 85,
//   t75: 95,
//   t82: 100,
//   t77: 110,
//   t106: 8,
//   t107: 16,
//   t118: 24,
//   t109: 32,
//   t117: 40,
//   t111: 48,
//   t108: 50,
//   t115: 55,
//   t116: 56,
//   t119: 64,
//   t112: 66,
//   t114: 72,
//   t110: 76,
//   t113: 82,
//   t160: 3,
//   t59: 6,
//   t64: 8,
//   t65: 10,
//   t55: 11,
//   t56: 14,
//   t58: 16,
//   t159: 18,
//   t61: 20,
//   t54: 21,
//   t62: 23,
//   t57: 24,
//   t60: 25,
//   t63: 29,
//   t102: 12,
//   t100: 36,
//   t101: 48,
//   t103: 60,
//   t104: 72,
//   t105: 84,
//   t85: 4,
//   t87: 8,
//   t97: 10,
//   t99: 12,
//   t86: 20,
//   t89: 21,
//   t93: 29,
//   t96: 31,
//   t84: 38,
//   t88: 39,
//   t90: 40,
//   t91: 43,
//   t92: 48,
//   t94: 50,
//   t95: 56,
//   t98: 63,
//   t66: 32,
//   t67: 56,
//   t656: 64,
//   t13: 1,
//   t71: 2,
//   t16: 3,
//   t21: 4,
//   t45: 5,
//   t53: 6,
//   t26: 5,
//   t18: 7,
//   t20: 8,
//   t22: 9,
//   t68: 9,
//   t188: 10,
//   t19: 10,
//   t17: 10,
//   t33: 7,
//   t15: 11,
//   t157: 11,
//   t51: 7,
//   t48: 6,
//   t50: 12,
//   t72: 13,
//   t69: 13,
//   t29: 7,
//   t30: 11,
//   t70: 14,
//   t408: 12,
//   t28: 13,
//   t24: 14,
//   t43: 15,
//   t31: 16,
//   t36: 16,
//   t37: 16,
//   t42: 17,
//   t32: 13,
//   t27: 16,
//   t158: 18,
//   t47: 14,
//   t34: 18,
//   t23: 20,
//   t52: 17,
//   t38: 11,
//   t35: 20,
//   t74: 20,
//   t44: 17,
//   t73: 19,
//   t25: 23,
//   t39: 19,
//   t41: 19,
//   t402: 22,
//   t913: 24,
//   t912: 24,
//   t405: 24,
//   t410: 25,
//   t401: 25,
//   t644: 26,
//   t406: 27,
//   t409: 28,
//   t645: 29,
//   t712: 31,
//   t411: 31,
//   t407: 32,
//   t404: 34,
//   t403: 34,
//   t120: 3,
//   t146: 4,
//   t121: 5,
//   t123: 6,
//   t124: 6,
//   t125: 6,
//   t152: 7,
//   t127: 8,
//   t154: 10,
//   t126: 11,
//   t911: 11,
//   t135: 13,
//   t137: 14,
//   t131: 14,
//   t129: 15,
//   t138: 16,
//   t128: 17,
//   t140: 18,
//   t145: 19,
//   t133: 19,
//   t143: 20,
//   t144: 21,
//   t141: 21,
//   t132: 21,
//   t130: 21,
//   t147: 21,
//   t122: 22,
//   t872: 22,
//   t139: 22,
//   t142: 23,
//   t136: 23,
//   t134: 24,
//   t148: 30,
//   t654: 31,
//   t655: 33,
// };

//elephant
// export const weight_list: any = {
//   t85: 6,
//   t87: 8,
//   t97: 10,
//   t99: 13,
//   t86: 16,
//   t89: 19,
//   t93: 22,
//   t476: 25,
//   t96: 28,
//   t84: 31,
//   t88: 34,
//   t90: 37,
//   t91: 40,
//   t92: 43,
//   t94: 46,
//   t95: 49,
//   t98: 52,
//
//
//   b1: 10,
//   b2: 25,
//   b3: 50,
//   b4: 85,
//   b5: 130,
//   b6: 165,
//   b7: 235,
//   b8: 300,
//   t163: 40,
//   t2: 20,
//   t164: 40,
//   t165: 30,
//   t1: 10,
//   t333: 65,
//   t3: 60,
//   t5: 70,
//   t4: 60,
//   t6: 80,
//   t7: 85,
//   t8: 280,
//   t166: 160,
//   t13: 1,
//   t71: 2,
//   t16: 3,
//   t21: 4,
//   t45: 5,
//   t53: 6,
//   t26: 6,
//   t18: 7,
//   t38: 7,
//   t20: 8,
//   t33: 8,
//   t48: 8,
//   t29: 8,
//   t22: 9,
//   t68: 9,
//   t52: 9,
//   t19: 10,
//   t17: 10,
//   t188: 10,
//   t15: 11,
//   t157: 11,
//   t32: 11,
//   t47: 11,
//   t50: 12,
//   t51: 12,
//   t72: 12,
//   t69: 12,
//   t31: 12,
//   t30: 13,
//   t408: 13,
//   t70: 13,
//   t34: 14,
//   t27: 14,
//   t24: 15,
//   t28: 15,
//   t43: 15,
//   t37: 16,
//   t36: 16,
//   t73: 16,
//   t42: 17,
//   t158: 18,
//   t41: 18,
//   t23: 20,
//   t35: 20,
//   t74: 21,
//   t44: 21,
//   t39: 21,
//   t1013: 21,
//   t402: 22,
//   t25: 22,
//   t405: 22,
//   t1012: 23,
//   t406: 23,
//   t401: 24,
//   t410: 25,
//   t644: 26,
//   t409: 27,
//   t645: 28,
//   t411: 29,
//   t712: 30,
//   t407: 31,
//   t404: 32,
//   t403: 33,
//   t76: 8,
//   t83: 18,
//   t78: 21,
//   t79: 24,
//   t379: 27,
//   t80: 30,
//   t380: 33,
//   t381: 36,
//   t385: 39,
//   t378: 42,
//   t384: 45,
//   t382: 48,
//   t161: 51,
//   t383: 54,
//   t75: 57,
//   t162: 60,
//   t82: 63,
//   t106: 9,
//   t107: 13,
//   t118: 18,
//   t109: 22,
//   t117: 26,
//   t913: 30,
//   t111: 34,
//   t108: 38,
//   t112: 42,
//   t912: 46,
//   t115: 50,
//   t116: 54,
//   t114: 58,
//   t119: 62,
//   t113: 66,
//   t110: 70,
//   t160: 3,
//   t59: 6,
//   t58: 16,
//   t634: 51,
//   t62: 43,
//   t57: 44,
//   t100: 36,
//   t102: 12,
//   t103: 60,
//   t101: 48,
//   t105: 84,
//   t104: 72,
//   t66: 32,
//   t67: 56,
//   t656: 64,
//   t120: 3,
//   t146: 4,
//   t121: 5,
//   t124: 6,
//   t125: 6,
//   t152: 7,
//   t127: 7,
//   t153: 8,
//   t154: 8,
//   t151: 8,
//   t148: 9,
//   t137: 9,
//   t145: 10,
//   t122: 10,
//   t129: 10,
//   t135: 10,
//   t131: 10,
//   t143: 11,
//   t861: 11,
//   t134: 12,
//   t144: 12,
//   t128: 12,
//   t138: 13,
//   t133: 14,
//   t862: 17,
//   t139: 19,
//   t136: 21,
//   t140: 23,
//   t147: 25,
//   t130: 27,
//   t142: 29,
//   t126: 31,
//   t132: 33,
//   t1011: 35,
//   t141: 37,
//   t654: 39,
//   t1488: 41,
//   t655: 43,
//   t999: 32,
// };

export const getWeight = (id: string) => {
  if (id === 'base' || id === 'empty')
    return 0;

  if (weight_list[id]) {
    return weight_list[id];
  }
  console.log('ERROR NOT FOUND WEIGHT: ' + id);
  return 0;
};
