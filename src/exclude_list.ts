const exclude_list: any = {
  // clothes
  t13: 't103, t55, t56, t58, t59, t61, t64, t65, t120, t121, t122, t123, t124, t125, t126, t127, t128, t129, t130, t131, t132, t133, t134, t135, t136, t137, t138, t139, t140, t141, t142, t143, t144, t145, t146, t147, t148, t149, t150, t151, t152, t153, t154, t155, t68, t69, t70, t71, t72, t73, t74, t102, t100, t101, t104, t105, t655, t654, t85, t160, t97',
  t21: 't68, t69, t70, t71, t72, t73, t74',
  t26: 't68, t69, t70, t71, t72, t73, t74',
  t18: 't68, t69, t70, t71, t72, t73, t74',
  t53: 't69, t73',
  t20: 't72, t70, t74',
  t17: 't68, t69, t70, t71, t72, t73, t74',
  t157: 't68, t69, t70, t71, t72, t73, t74',
  t41: 't69, t73',
  t15: 't68, t69, t70, t71, t72, t73, t74',
  t33: 't68, t69, t70, t71, t72, t73, t74',
  t51: 't68, t69, t70, t71, t72, t73, t74',
  t48: 't68, t69, t70, t71, t72, t73, t74',
  t34: 't72, t70, t74',
  t27: 't74, t73',
  t29: 't68, t69, t70, t71, t72, t73, t74, t58',
  t30: 't68, t69, t70, t71, t72, t73, t74',
  t25: 't69, t70, t72, t74',
  t52: 't68, t69, t70, t71, t72, t73, t74',
  t24: 't68, t69, t70, t71, t72, t73, t74',
  t44: 't69, t73',
  t43: 't68, t69, t70, t71, t72, t73, t74',
  t39: 't68, t69, t70, t71, t72, t73, t74',
  // masks
  t160: 't66, t67, t106, t107, t146, t107, t149, t85, t87, t97, t99, t86, t89, t93, t96, t84, t88, t90, t91, t92, t94, t95, t98, t121, t122, t123, t124, t125, t127, t146, t149, t148, t152, t154, t153, t150, t151',
  t59: 't84, t85, t86, t87, t88, t89, t90, t91, t92, t93, t94, t95, t96, t97, t98, t99, t146, t120, t150, t121, t123, t124, t155, t149, t125, t152, t147, t154, t126, t151, t131, t138, t153, t145, t143, t148, t144, t122, t135, t127, t128, t129, t130, t132, t133, t134, t136, t137, t139, t140, t141, t142, t100, t101, t102, t103, t104, t105',
  t64: 't84, t85, t86, t87, t88, t89, t90, t91, t92, t93, t94, t95, t96, t97, t98, t99, t76, t82, t78, t79, t80, t161, t162, t81, t75, t83, t77, t146, t121, t122, t123, t124, t125, t127, t150, t152, t148, t149, t150, t102, t100, t101, t103, t104, t105, t140, t137, t143',
  t65: 't84, t85, t86, t87, t88, t89, t90, t91, t92, t93, t94, t95, t96, t97, t98, t99, t76, t82, t78, t79, t80, t161, t162, t81, t75, t83, t77, t132, t146, t142, t134, t120, t150, t121, t123, t124, t155, t149, t125, t152, t147, t146, t154, t126, t151, t131, t138, t153, t145, t143, t148, t144, t122, t135, t127, t128, t129, t130, t132, t133, t134, t136, t137, t139, t140, t141, t142',
  t55: 't84, t85, t86, t87, t88, t89, t90, t91, t92, t93, t94, t95, t96, t97, t98, t99, t106, t107, t108, t109, t110, t111, t112, t113, t114, t115, t116, t117, t118, t119, t76, t82, t78, t79, t80, t161, t162, t81, t75, t83, t77, t146, t153, t154, t151, t148, t149, t131, t137',
  t56: 't84, t85, t86, t87, t88, t89, t90, t91, t92, t93, t94, t95, t96, t97, t98, t99, t106, t107, t108, t109, t110, t111, t112, t113, t114, t115, t116, t117, t118, t119, t76, t82, t78, t79, t80, t161, t162, t81, t75, t83, t77, t146, t143, t134',
  t58: 't84, t85, t86, t87, t88, t89, t90, t91, t92, t93, t94, t95, t96, t97, t98, t99, t76, t82, t78, t79, t80, t161, t162, t81, t75, t83, t77, t146, t106, t102, t150, t155, t149, t152, t154, t151, t153, t148, t69, t73, t120, t150, t121, t123, t124, t155, t149, t125, t152, t127, t146, t154, t126, t151, t153, t137, t138, t140, t148, t147, t122, t135, t129, t132, t133, t134, t136, t141',
  t159: 't66, t67, t76, t82, t78, t79, t80, t161, t162, t81, t75, t83, t77, t146, t125, t127, t121, t124, t122, t148, t150, t152, t84, t93',
  t61: 't84, t85, t86, t87, t88, t89, t90, t91, t92, t93, t94, t95, t96, t97, t98, t99, t76, t82, t78, t79, t80, t161, t162, t81, t75, t83, t77, t146, t137, t122, t124, t121, t143, t153, t134, t55',
  t54: 't84, t85, t86, t87, t88, t89, t90, t91, t92, t93, t94, t95, t96, t97, t98, t99, t76, t82, t78, t79, t80, t161, t162, t81, t75, t83, t77, t146',
  t62: 't146, t84',
  t57: 't84, t85, t86, t87, t88, t89, t90, t91, t92, t93, t94, t95, t96, t97, t98, t99, t76, t82, t78, t79, t80, t161, t162, t81, t75, t83, t77, t146, t150',
  t60: 't76, t82, t78, t79, t80, t161, t162, t81, t75, t83, t77, t146, t95, t87, t85, t93, t92, t125, t84',
  t63: 't84, t76, t82, t78, t79, t80, t161, t162, t81, t75, t83, t77, t146, t89, t103, t95',
  // nose
  t66: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t160',
  t67: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t160',
  t656: 't59, t64, t65, t55, t56, t58, t159, t61, t54, t62, t57, t60, t63, t160',
  // mouth
  t75: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t159',
  t76: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t159',
  t77: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t159',
  t78: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t159',
  t79: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t159',
  t80: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t159',
  t81: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t159',
  t82: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t159',
  t83: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t159',
  t161: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t159, t198',
  t162: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t159, t198',
  // fur
  // t2: 't155, t46, t52',
  t163: 't138, t140, t143, t406, t122, t92, t134, t95, t124, t123, t125, t102, t120, t20, t154, t62',
  t3: 't27, t33, t35, t52, t29, t39, t24, t407, t125',
  // t4: 't28, t29, t158',
  // eye wear
  t84: 't54, t55, t56, t57, t58, t59, t61, t64, t65',
  t85: 't54, t55, t56, t57, t58, t59, t61, t64, t65',
  t86: 't54, t55, t56, t57, t58, t59, t61, t64, t65, t61, t62, t63, t65, t159, t60',
  t87: 't54, t55, t56, t57, t58, t59, t61, t64, t65, t127',
  t88: 't54, t55, t56, t57, t58, t59, t61, t64, t65',
  t89: 't54, t55, t56, t57, t58, t59, t61, t64, t65, t127, t112, t62, t60, t159, t63',
  t90: 't54, t55, t56, t57, t58, t59, t61, t64, t65, t62, t63, t100, t101, t102, t103, t104, t103, t105',
  t91: 't54, t55, t56, t57, t58, t59, t61, t64, t65',
  t92: 't54, t55, t56, t57, t58, t59, t61, t64, t65, t137, t106, t107, t118, t109, t117, t111, t108, t115, t116, t119, t112, t114, t110, t113, t63',
  t93: 't54, t55, t56, t57, t58, t59, t61, t64, t65, t102, t127, t63, t61, t62, t123, t122, t125',
  t94: 't54, t55, t56, t57, t58, t59, t61, t64, t65, t62, t63',
  t95: 't54, t55, t56, t57, t58, t59, t61, t64, t65, t137',
  t96: 't54, t55, t56, t57, t58, t59, t61, t64, t65, t3',
  t97: 't54, t55, t56, t57, t58, t59, t61, t64, t65, t3',
  t98: 't54, t55, t56, t57, t58, t59, t61, t64, t65, t112, t160, t59, t64, t65, t55, t56, t58, t159, t61, t54, t62, t57, t60, t63, t161, t162',
  // ear wear
  t103: 't54, t55, t56, t57, t58, t59, t61, t64, t65, t13, t62, t61, t63, t64, t65, t55, t56, t159, t93, t122, t127, t140, t112',
  // eyes
  t106: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t84, t85, t86, t87, t88, t89, t90, t91, t92, t93, t94, t95, t98, t99, t159',
  t107: 't54, t55, t56, t57, t58, t59, t60, t61, t62, t63, t64, t65, t84, t85, t86, t87, t88, t89, t90, t91, t92, t93, t94, t95, t98, t99, t97, t96',
  t116: 't98',
  t114: 't106, t98',
  // head
  t120: 't89, t3',
  t121: 't85, t86, t87, t88, t89, t90, t91, t92, t93, t94, t95, t99, t100, t101, t102, t103, t104, t76, t56, t58, t64, t55, t3',
  t122: 't85, t86, t87, t88, t89, t90, t91, t92, t93, t94, t95, t99, t55, t56, t65, t60',
  t123: 't100, t101, t102, t103, t104, t105, t76, t63, t62, t159, t64, t60, t58, t85, t88, t55, t56, t61',
  t124: 't102, t100, t101, t103, t104, t105, t88, t91, t92, t93, t95, t99, t85, t60, t159, t61',
  t125: 't85, t87, t99, t88, t91, t92, t95, t160, t102, t100, t101, t103, t104, t105, t61, t64',
  t126: 't88, t95, t91, t93, t159, t104',
  t127: 't95, t102, t100, t101, t103, t104, t105, t85, t160, t59, t64, t65, t55, t56, t58, t159, t61, t54, t62, t57, t60, t63, t90',
  t128: 't102',
  t129: 't85, t87, t97, t99, t86, t89, t93, t96, t84, t88, t90, t91, t92, t94, t95, t160, t59, t64, t65, t55, t56, t159, t61, t63, t62, t54, t57, t60, t58',
  t131: 't104',
  t134: 't100, t101, t102, t103, t104, t105',
  t144: 't85',
  t146: 't85, t87, t99, t89, t93, t88, t91, t92, t95, t106, t107, t118, t109, t117, t111, t108, t115, t116, t119, t112, t114, t110, t113',
  t148: 't55, t56, t61, t65, t103, t90, t60, t93, t62',
  t149: 't55, t56, t58, t59, t61, t64, t65, t160, t86, t62, t63, t87, t99, t88, t89, t90, t92, t91, t94',
  t150: 't102, t100, t101, t103, t104, t105, t160, t55, t56, t58, t59, t61, t64, t65',
  t151: 't56, t55, t61, t64',
  t152: 't92, t86, t89, t90, t160, t85, t87, t99, t89, t93, t88, t91, t92, t95, t100, t101, t102, t103, t104, t105, t55, t56, t58, t59, t61, t64, t65, t159, t60, t63, t83, t76',
  t153: 't93, t94, t56, t65, t55, t64, t59, t160, t58',
  t154: 't55, t56, t61, t64, t65',
  t155: 't55, t56, t61, t64, t65, t160, t3',
  t137: 't94, t55, t56, t61, t88, t91, t92, t93, t99, t159, t100, t101, t102, t103, t104, t105',
  t23: 't3',
  t671: 't145',
  t654: 't59, t65',
  t655: 't59, t65',
};

export const getExcludes = (name: string | undefined): string[] => {
  if (!name) {
    return [];
  }
  if (exclude_list[name]) {
    return exclude_list[name].split(', ');
  }
  return [];
};
