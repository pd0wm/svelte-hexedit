import { J as listen, K as bubble, L as prevent_default, M as stop_propagation, S as SvelteComponent, i as init, s as safe_not_equal, D as create_slot, k as element, l as claim_element, m as children, h as detach, n as attr, b as insert_hydration, N as action_destroyer, E as update_slot_base, F as get_all_dirty_from_scope, G as get_slot_changes, O as is_function, f as transition_in, t as transition_out, P as run_all, Q as get_current_component, v as binding_callbacks, R as assign, T as set_attributes, U as get_spread_update, V as compute_rest_props, W as exclude_internal_props, q as text, r as claim_text, p as set_style, H as append_hydration, u as set_data, C as noop, e as empty, g as group_outros, d as check_outros, X as destroy_each, x as create_component, y as claim_component, z as mount_component, A as destroy_component, a as space, c as claim_space, Y as update_keyed_each, Z as outro_and_destroy_block } from "../../chunks/index-9ba0de44.js";
const bare = "";
function classMap(classObj) {
  return Object.entries(classObj).filter(([name, value]) => name !== "" && value).map(([name]) => name).join(" ");
}
const oldModifierRegex = /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
const newModifierRegex = /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
function forwardEventsBuilder(component) {
  let $on;
  let events = [];
  component.$on = (fullEventType, callback) => {
    let eventType = fullEventType;
    let destructor = () => {
    };
    if ($on) {
      destructor = $on(eventType, callback);
    } else {
      events.push([eventType, callback]);
    }
    const oldModifierMatch = eventType.match(oldModifierRegex);
    if (oldModifierMatch && console) {
      console.warn('Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ', eventType);
    }
    return () => {
      destructor();
    };
  };
  function forward(e) {
    bubble(component, e);
  }
  return (node) => {
    const destructors = [];
    const forwardDestructors = {};
    $on = (fullEventType, callback) => {
      let eventType = fullEventType;
      let handler = callback;
      let options = false;
      const oldModifierMatch = eventType.match(oldModifierRegex);
      const newModifierMatch = eventType.match(newModifierRegex);
      const modifierMatch = oldModifierMatch || newModifierMatch;
      if (eventType.match(/^SMUI:\w+:/)) {
        const newEventTypeParts = eventType.split(":");
        let newEventType = "";
        for (let i = 0; i < newEventTypeParts.length; i++) {
          newEventType += i === newEventTypeParts.length - 1 ? ":" + newEventTypeParts[i] : newEventTypeParts[i].split("-").map((value) => value.slice(0, 1).toUpperCase() + value.slice(1)).join("");
        }
        console.warn(`The event ${eventType.split("$")[0]} has been renamed to ${newEventType.split("$")[0]}.`);
        eventType = newEventType;
      }
      if (modifierMatch) {
        const parts = eventType.split(oldModifierMatch ? ":" : "$");
        eventType = parts[0];
        const eventOptions = parts.slice(1).reduce((obj, mod) => {
          obj[mod] = true;
          return obj;
        }, {});
        if (eventOptions.passive) {
          options = options || {};
          options.passive = true;
        }
        if (eventOptions.nonpassive) {
          options = options || {};
          options.passive = false;
        }
        if (eventOptions.capture) {
          options = options || {};
          options.capture = true;
        }
        if (eventOptions.once) {
          options = options || {};
          options.once = true;
        }
        if (eventOptions.preventDefault) {
          handler = prevent_default(handler);
        }
        if (eventOptions.stopPropagation) {
          handler = stop_propagation(handler);
        }
      }
      const off = listen(node, eventType, handler, options);
      const destructor = () => {
        off();
        const idx = destructors.indexOf(destructor);
        if (idx > -1) {
          destructors.splice(idx, 1);
        }
      };
      destructors.push(destructor);
      if (!(eventType in forwardDestructors)) {
        forwardDestructors[eventType] = listen(node, eventType, forward);
      }
      return destructor;
    };
    for (let i = 0; i < events.length; i++) {
      $on(events[i][0], events[i][1]);
    }
    return {
      destroy: () => {
        for (let i = 0; i < destructors.length; i++) {
          destructors[i]();
        }
        for (let entry of Object.entries(forwardDestructors)) {
          entry[1]();
        }
      }
    };
  };
}
function useActions(node, actions) {
  let actionReturns = [];
  if (actions) {
    for (let i = 0; i < actions.length; i++) {
      const actionEntry = actions[i];
      const action = Array.isArray(actionEntry) ? actionEntry[0] : actionEntry;
      if (Array.isArray(actionEntry) && actionEntry.length > 1) {
        actionReturns.push(action(node, actionEntry[1]));
      } else {
        actionReturns.push(action(node));
      }
    }
  }
  return {
    update(actions2) {
      if ((actions2 && actions2.length || 0) != actionReturns.length) {
        throw new Error("You must not change the length of an actions array.");
      }
      if (actions2) {
        for (let i = 0; i < actions2.length; i++) {
          const returnEntry = actionReturns[i];
          if (returnEntry && returnEntry.update) {
            const actionEntry = actions2[i];
            if (Array.isArray(actionEntry) && actionEntry.length > 1) {
              returnEntry.update(actionEntry[1]);
            } else {
              returnEntry.update();
            }
          }
        }
      }
    },
    destroy() {
      for (let i = 0; i < actionReturns.length; i++) {
        const returnEntry = actionReturns[i];
        if (returnEntry && returnEntry.destroy) {
          returnEntry.destroy();
        }
      }
    }
  };
}
function create_fragment$9(ctx) {
  let div;
  let div_class_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[6].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[5],
    null
  );
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", div_class_value = classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-layout-grid__inner": true
      }));
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      ctx[7](div);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            div,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[3].call(null, div)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        32)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[5],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[5]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[5],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*className*/
      2 && div_class_value !== (div_class_value = classMap({
        [
          /*className*/
          ctx2[1]
        ]: true,
        "mdc-layout-grid__inner": true
      }))) {
        attr(div, "class", div_class_value);
      }
      if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/
      1)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[0]
        );
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
      ctx[7](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$9($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let element2;
  function getElement() {
    return element2;
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(2, element2);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("use" in $$props2)
      $$invalidate(0, use = $$props2.use);
    if ("class" in $$props2)
      $$invalidate(1, className = $$props2.class);
    if ("$$scope" in $$props2)
      $$invalidate(5, $$scope = $$props2.$$scope);
  };
  return [
    use,
    className,
    element2,
    forwardEvents,
    getElement,
    $$scope,
    slots,
    div_binding
  ];
}
class InnerGrid extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$9, safe_not_equal, { use: 0, class: 1, getElement: 4 });
  }
  get getElement() {
    return this.$$.ctx[4];
  }
}
function create_fragment$8(ctx) {
  let div;
  let div_class_value;
  let useActions_action;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[11].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[10],
    null
  );
  let div_levels = [
    {
      class: div_class_value = classMap({
        [
          /*className*/
          ctx[1]
        ]: true,
        "mdc-layout-grid__cell": true,
        ["mdc-layout-grid__cell--align-" + /*align*/
        ctx[2]]: (
          /*align*/
          ctx[2] != null
        ),
        ["mdc-layout-grid__cell--order-" + /*order*/
        ctx[3]]: (
          /*order*/
          ctx[3] != null
        ),
        ["mdc-layout-grid__cell--span-" + /*span*/
        ctx[4]]: (
          /*span*/
          ctx[4] != null
        ),
        ...Object.fromEntries(Object.entries(
          /*spanDevices*/
          ctx[5]
        ).map(func))
      })
    },
    /*$$restProps*/
    ctx[8]
  ];
  let div_data = {};
  for (let i = 0; i < div_levels.length; i += 1) {
    div_data = assign(div_data, div_levels[i]);
  }
  return {
    c() {
      div = element("div");
      if (default_slot)
        default_slot.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (default_slot)
        default_slot.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_attributes(div, div_data);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      ctx[12](div);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(useActions_action = useActions.call(
            null,
            div,
            /*use*/
            ctx[0]
          )),
          action_destroyer(
            /*forwardEvents*/
            ctx[7].call(null, div)
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        1024)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[10],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[10]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[10],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(div, div_data = get_spread_update(div_levels, [
        (!current || dirty & /*className, align, order, span, spanDevices*/
        62 && div_class_value !== (div_class_value = classMap({
          [
            /*className*/
            ctx2[1]
          ]: true,
          "mdc-layout-grid__cell": true,
          ["mdc-layout-grid__cell--align-" + /*align*/
          ctx2[2]]: (
            /*align*/
            ctx2[2] != null
          ),
          ["mdc-layout-grid__cell--order-" + /*order*/
          ctx2[3]]: (
            /*order*/
            ctx2[3] != null
          ),
          ["mdc-layout-grid__cell--span-" + /*span*/
          ctx2[4]]: (
            /*span*/
            ctx2[4] != null
          ),
          ...Object.fromEntries(Object.entries(
            /*spanDevices*/
            ctx2[5]
          ).map(func))
        }))) && { class: div_class_value },
        dirty & /*$$restProps*/
        256 && /*$$restProps*/
        ctx2[8]
      ]));
      if (useActions_action && is_function(useActions_action.update) && dirty & /*use*/
      1)
        useActions_action.update.call(
          null,
          /*use*/
          ctx2[0]
        );
    },
    i(local) {
      if (current)
        return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (default_slot)
        default_slot.d(detaching);
      ctx[12](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
const func = ([device, span]) => [`mdc-layout-grid__cell--span-${span}-${device}`, true];
function instance$8($$self, $$props, $$invalidate) {
  const omit_props_names = ["use", "class", "align", "order", "span", "spanDevices", "getElement"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const forwardEvents = forwardEventsBuilder(get_current_component());
  let { use = [] } = $$props;
  let { class: className = "" } = $$props;
  let { align = void 0 } = $$props;
  let { order = void 0 } = $$props;
  let { span = void 0 } = $$props;
  let { spanDevices = {} } = $$props;
  let element2;
  function getElement() {
    return element2;
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(6, element2);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(8, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("use" in $$new_props)
      $$invalidate(0, use = $$new_props.use);
    if ("class" in $$new_props)
      $$invalidate(1, className = $$new_props.class);
    if ("align" in $$new_props)
      $$invalidate(2, align = $$new_props.align);
    if ("order" in $$new_props)
      $$invalidate(3, order = $$new_props.order);
    if ("span" in $$new_props)
      $$invalidate(4, span = $$new_props.span);
    if ("spanDevices" in $$new_props)
      $$invalidate(5, spanDevices = $$new_props.spanDevices);
    if ("$$scope" in $$new_props)
      $$invalidate(10, $$scope = $$new_props.$$scope);
  };
  return [
    use,
    className,
    align,
    order,
    span,
    spanDevices,
    element2,
    forwardEvents,
    $$restProps,
    getElement,
    $$scope,
    slots,
    div_binding
  ];
}
class Cell extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, {
      use: 0,
      class: 1,
      align: 2,
      order: 3,
      span: 4,
      spanDevices: 5,
      getElement: 9
    });
  }
  get getElement() {
    return this.$$.ctx[9];
  }
}
function is_printable_ascii(value) {
  return value >= 31 && value <= 126;
}
function val_to_color(value) {
  if (value === 255) {
    return "#ef5350";
  } else if (value === 0) {
    return "rgba(0, 0, 0, 0.6)";
  } else if (is_printable_ascii(value)) {
    return "#42a5f5";
  } else {
    return "#000000";
  }
}
function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
const AsciiByte_svelte_svelte_type_style_lang = "";
function create_fragment$7(ctx) {
  let p;
  let t;
  return {
    c() {
      p = element("p");
      t = text(
        /*ascii*/
        ctx[1]
      );
      this.h();
    },
    l(nodes) {
      p = claim_element(nodes, "P", { style: true, class: true });
      var p_nodes = children(p);
      t = claim_text(
        p_nodes,
        /*ascii*/
        ctx[1]
      );
      p_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_style(
        p,
        "color",
        /*color*/
        ctx[0]
      );
      attr(p, "class", "svelte-78k217");
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      append_hydration(p, t);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*ascii*/
      2)
        set_data(
          t,
          /*ascii*/
          ctx2[1]
        );
      if (dirty & /*color*/
      1) {
        set_style(
          p,
          "color",
          /*color*/
          ctx2[0]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(p);
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  let ascii;
  let color;
  let { value } = $$props;
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(2, value = $$props2.value);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*value*/
    4) {
      $$invalidate(1, ascii = is_printable_ascii(value) ? String.fromCharCode(value) : ".");
    }
    if ($$self.$$.dirty & /*value*/
    4) {
      $$invalidate(0, color = val_to_color(value));
    }
  };
  return [color, ascii, value];
}
class AsciiByte extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, { value: 2 });
  }
}
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i];
  return child_ctx;
}
function create_each_block$2(ctx) {
  let asciibyte;
  let current;
  asciibyte = new AsciiByte({ props: { value: (
    /*val*/
    ctx[1]
  ) } });
  return {
    c() {
      create_component(asciibyte.$$.fragment);
    },
    l(nodes) {
      claim_component(asciibyte.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(asciibyte, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const asciibyte_changes = {};
      if (dirty & /*value*/
      1)
        asciibyte_changes.value = /*val*/
        ctx2[1];
      asciibyte.$set(asciibyte_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(asciibyte.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(asciibyte.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(asciibyte, detaching);
    }
  };
}
function create_fragment$6(ctx) {
  let each_1_anchor;
  let current;
  let each_value = (
    /*value*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert_hydration(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (dirty & /*value*/
      1) {
        each_value = /*value*/
        ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$2(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let { value } = $$props;
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(0, value = $$props2.value);
  };
  return [value];
}
class AsciiBytes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, { value: 0 });
  }
}
const HexByte_svelte_svelte_type_style_lang = "";
function create_fragment$5(ctx) {
  let p;
  let t;
  return {
    c() {
      p = element("p");
      t = text(
        /*hex*/
        ctx[1]
      );
      this.h();
    },
    l(nodes) {
      p = claim_element(nodes, "P", { style: true, class: true });
      var p_nodes = children(p);
      t = claim_text(
        p_nodes,
        /*hex*/
        ctx[1]
      );
      p_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_style(
        p,
        "color",
        /*color*/
        ctx[0]
      );
      attr(p, "class", "svelte-e2o76");
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      append_hydration(p, t);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*hex*/
      2)
        set_data(
          t,
          /*hex*/
          ctx2[1]
        );
      if (dirty & /*color*/
      1) {
        set_style(
          p,
          "color",
          /*color*/
          ctx2[0]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(p);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let hex;
  let color;
  let { value } = $$props;
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(2, value = $$props2.value);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*value*/
    4) {
      $$invalidate(1, hex = value.toString(16).padStart(2, "0"));
    }
    if ($$self.$$.dirty & /*value*/
    4) {
      $$invalidate(0, color = val_to_color(value));
    }
  };
  return [color, hex, value];
}
class HexByte extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, { value: 2 });
  }
}
const HexBytes_svelte_svelte_type_style_lang = "";
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[2] = list[i];
  child_ctx[4] = i;
  return child_ctx;
}
function create_each_block$1(ctx) {
  let hexbyte;
  let t0;
  let p;
  let t1;
  let current;
  hexbyte = new HexByte({
    props: { value: (
      /*value*/
      ctx[0][
        /*i*/
        ctx[4]
      ]
    ) }
  });
  return {
    c() {
      create_component(hexbyte.$$.fragment);
      t0 = space();
      p = element("p");
      t1 = text(" ");
      this.h();
    },
    l(nodes) {
      claim_component(hexbyte.$$.fragment, nodes);
      t0 = claim_space(nodes);
      p = claim_element(nodes, "P", { class: true });
      var p_nodes = children(p);
      t1 = claim_text(p_nodes, " ");
      p_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(p, "class", "svelte-78k217");
    },
    m(target, anchor) {
      mount_component(hexbyte, target, anchor);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, p, anchor);
      append_hydration(p, t1);
      current = true;
    },
    p(ctx2, dirty) {
      const hexbyte_changes = {};
      if (dirty & /*value*/
      1)
        hexbyte_changes.value = /*value*/
        ctx2[0][
          /*i*/
          ctx2[4]
        ];
      hexbyte.$set(hexbyte_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(hexbyte.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(hexbyte.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(hexbyte, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(p);
    }
  };
}
function create_fragment$4(ctx) {
  let each_1_anchor;
  let current;
  let each_value = Array(
    /*num_bytes*/
    ctx[1]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    l(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert_hydration(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (dirty & /*value, num_bytes*/
      3) {
        each_value = Array(
          /*num_bytes*/
          ctx2[1]
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let num_bytes2;
  let { value } = $$props;
  $$self.$$set = ($$props2) => {
    if ("value" in $$props2)
      $$invalidate(0, value = $$props2.value);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*value*/
    1) {
      $$invalidate(1, num_bytes2 = value.byteLength);
    }
  };
  return [value, num_bytes2];
}
class HexBytes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { value: 0 });
  }
}
const HexEditorRow_svelte_svelte_type_style_lang = "";
function create_default_slot_3(ctx) {
  let p;
  let t0;
  let t1;
  return {
    c() {
      p = element("p");
      t0 = text("0x");
      t1 = text(
        /*hex_addr*/
        ctx[1]
      );
      this.h();
    },
    l(nodes) {
      p = claim_element(nodes, "P", { class: true });
      var p_nodes = children(p);
      t0 = claim_text(p_nodes, "0x");
      t1 = claim_text(
        p_nodes,
        /*hex_addr*/
        ctx[1]
      );
      p_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(p, "class", "svelte-78k217");
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      append_hydration(p, t0);
      append_hydration(p, t1);
    },
    p(ctx2, dirty) {
      if (dirty & /*hex_addr*/
      2)
        set_data(
          t1,
          /*hex_addr*/
          ctx2[1]
        );
    },
    d(detaching) {
      if (detaching)
        detach(p);
    }
  };
}
function create_default_slot_2(ctx) {
  let hexbytes;
  let current;
  hexbytes = new HexBytes({ props: { value: (
    /*data*/
    ctx[0]
  ) } });
  return {
    c() {
      create_component(hexbytes.$$.fragment);
    },
    l(nodes) {
      claim_component(hexbytes.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(hexbytes, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const hexbytes_changes = {};
      if (dirty & /*data*/
      1)
        hexbytes_changes.value = /*data*/
        ctx2[0];
      hexbytes.$set(hexbytes_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(hexbytes.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(hexbytes.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(hexbytes, detaching);
    }
  };
}
function create_default_slot_1(ctx) {
  let asciibytes;
  let current;
  asciibytes = new AsciiBytes({ props: { value: (
    /*data*/
    ctx[0]
  ) } });
  return {
    c() {
      create_component(asciibytes.$$.fragment);
    },
    l(nodes) {
      claim_component(asciibytes.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(asciibytes, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const asciibytes_changes = {};
      if (dirty & /*data*/
      1)
        asciibytes_changes.value = /*data*/
        ctx2[0];
      asciibytes.$set(asciibytes_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(asciibytes.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(asciibytes.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(asciibytes, detaching);
    }
  };
}
function create_default_slot(ctx) {
  let cell0;
  let t0;
  let cell1;
  let t1;
  let cell2;
  let current;
  cell0 = new Cell({
    props: {
      span: "2",
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  cell1 = new Cell({
    props: {
      span: "6",
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  cell2 = new Cell({
    props: {
      span: "4",
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(cell0.$$.fragment);
      t0 = space();
      create_component(cell1.$$.fragment);
      t1 = space();
      create_component(cell2.$$.fragment);
    },
    l(nodes) {
      claim_component(cell0.$$.fragment, nodes);
      t0 = claim_space(nodes);
      claim_component(cell1.$$.fragment, nodes);
      t1 = claim_space(nodes);
      claim_component(cell2.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(cell0, target, anchor);
      insert_hydration(target, t0, anchor);
      mount_component(cell1, target, anchor);
      insert_hydration(target, t1, anchor);
      mount_component(cell2, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const cell0_changes = {};
      if (dirty & /*$$scope, hex_addr*/
      10) {
        cell0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      cell0.$set(cell0_changes);
      const cell1_changes = {};
      if (dirty & /*$$scope, data*/
      9) {
        cell1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      cell1.$set(cell1_changes);
      const cell2_changes = {};
      if (dirty & /*$$scope, data*/
      9) {
        cell2_changes.$$scope = { dirty, ctx: ctx2 };
      }
      cell2.$set(cell2_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(cell0.$$.fragment, local);
      transition_in(cell1.$$.fragment, local);
      transition_in(cell2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(cell0.$$.fragment, local);
      transition_out(cell1.$$.fragment, local);
      transition_out(cell2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(cell0, detaching);
      if (detaching)
        detach(t0);
      destroy_component(cell1, detaching);
      if (detaching)
        detach(t1);
      destroy_component(cell2, detaching);
    }
  };
}
function create_fragment$3(ctx) {
  let innergrid;
  let current;
  innergrid = new InnerGrid({
    props: {
      $$slots: { default: [create_default_slot] },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(innergrid.$$.fragment);
    },
    l(nodes) {
      claim_component(innergrid.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(innergrid, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const innergrid_changes = {};
      if (dirty & /*$$scope, data, hex_addr*/
      11) {
        innergrid_changes.$$scope = { dirty, ctx: ctx2 };
      }
      innergrid.$set(innergrid_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(innergrid.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(innergrid.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(innergrid, detaching);
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  let hex_addr;
  let { addr } = $$props;
  let { data } = $$props;
  $$self.$$set = ($$props2) => {
    if ("addr" in $$props2)
      $$invalidate(2, addr = $$props2.addr);
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*addr*/
    4) {
      $$invalidate(1, hex_addr = addr.toString(16).padStart(8, "0"));
    }
  };
  return [data, hex_addr, addr];
}
class HexEditorRow extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { addr: 2, data: 0 });
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[11] = list[i];
  return child_ctx;
}
const get_item_slot_changes = (dirty) => ({
  style: dirty & /*row_height, rows*/
  18,
  index: dirty & /*rows*/
  16
});
const get_item_slot_context = (ctx) => ({
  style: "height=" + /*row_height*/
  ctx[1] + "px;position:absolute;transform:translateY(" + /*i*/
  ctx[11] * /*row_height*/
  ctx[1] + "px);display:block;",
  index: (
    /*i*/
    ctx[11]
  )
});
function create_if_block$1(ctx) {
  let div;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let current;
  let each_value = (
    /*rows*/
    ctx[4]
  );
  const get_key = (ctx2) => (
    /*i*/
    ctx2[11]
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { style: true });
      var div_nodes = children(div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_nodes);
      }
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_style(div, "display", "flex");
      set_style(div, "flex-direction", "column");
      set_style(
        div,
        "height",
        /*num_rows*/
        ctx[0] * /*row_height*/
        ctx[1] + "px"
      );
      set_style(div, "position", "relative");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*$$scope, row_height, rows*/
      146) {
        each_value = /*rows*/
        ctx2[4];
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div, outro_and_destroy_block, create_each_block, null, get_each_context);
        check_outros();
      }
      if (!current || dirty & /*num_rows, row_height*/
      3) {
        set_style(
          div,
          "height",
          /*num_rows*/
          ctx2[0] * /*row_height*/
          ctx2[1] + "px"
        );
      }
    },
    i(local) {
      if (current)
        return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
    }
  };
}
function create_each_block(key_1, ctx) {
  let first;
  let current;
  const item_slot_template = (
    /*#slots*/
    ctx[8].item
  );
  const item_slot = create_slot(
    item_slot_template,
    ctx,
    /*$$scope*/
    ctx[7],
    get_item_slot_context
  );
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      if (item_slot)
        item_slot.c();
      this.h();
    },
    l(nodes) {
      first = empty();
      if (item_slot)
        item_slot.l(nodes);
      this.h();
    },
    h() {
      this.first = first;
    },
    m(target, anchor) {
      insert_hydration(target, first, anchor);
      if (item_slot) {
        item_slot.m(target, anchor);
      }
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (item_slot) {
        if (item_slot.p && (!current || dirty & /*$$scope, row_height, rows*/
        146)) {
          update_slot_base(
            item_slot,
            item_slot_template,
            ctx,
            /*$$scope*/
            ctx[7],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx[7]
            ) : get_slot_changes(
              item_slot_template,
              /*$$scope*/
              ctx[7],
              dirty,
              get_item_slot_changes
            ),
            get_item_slot_context
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(item_slot, local);
      current = true;
    },
    o(local) {
      transition_out(item_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(first);
      if (item_slot)
        item_slot.d(detaching);
    }
  };
}
function create_fragment$2(ctx) {
  let div1;
  let div0;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*num_rows*/
    ctx[0] > 0 && create_if_block$1(ctx)
  );
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { style: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", { style: true });
      var div0_nodes = children(div0);
      if (if_block)
        if_block.l(div0_nodes);
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      set_style(
        div0,
        "height",
        /*height*/
        ctx[2] + "px"
      );
      set_style(div0, "width", "100%");
      set_style(div0, "overflow", "auto");
      set_style(div1, "overflow-y", "scroll");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, div0);
      if (if_block)
        if_block.m(div0, null);
      ctx[9](div0);
      current = true;
      if (!mounted) {
        dispose = listen(
          div0,
          "scroll",
          /*parseScroll*/
          ctx[5]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*num_rows*/
        ctx2[0] > 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*num_rows*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div0, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (!current || dirty & /*height*/
      4) {
        set_style(
          div0,
          "height",
          /*height*/
          ctx2[2] + "px"
        );
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      if (if_block)
        if_block.d();
      ctx[9](null);
      mounted = false;
      dispose();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let rows;
  let { $$slots: slots = {}, $$scope } = $$props;
  let { num_rows } = $$props;
  let { row_height } = $$props;
  let { height = 1024 } = $$props;
  let { extra_rows = 100 } = $$props;
  let visible_rows = Math.ceil(height / row_height) + 2 * extra_rows;
  let box;
  function parseScroll() {
    let offset_rows = Math.floor(box.scrollTop / row_height);
    let start_row = Math.max(0, offset_rows - extra_rows);
    let end_row = Math.min(num_rows - 1, offset_rows + visible_rows + extra_rows);
    $$invalidate(4, rows = range(start_row, end_row));
  }
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      box = $$value;
      $$invalidate(3, box);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("num_rows" in $$props2)
      $$invalidate(0, num_rows = $$props2.num_rows);
    if ("row_height" in $$props2)
      $$invalidate(1, row_height = $$props2.row_height);
    if ("height" in $$props2)
      $$invalidate(2, height = $$props2.height);
    if ("extra_rows" in $$props2)
      $$invalidate(6, extra_rows = $$props2.extra_rows);
    if ("$$scope" in $$props2)
      $$invalidate(7, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*extra_rows, num_rows*/
    65) {
      $$invalidate(4, rows = range(0, Math.min(visible_rows + extra_rows, num_rows - 1)));
    }
  };
  return [
    num_rows,
    row_height,
    height,
    box,
    rows,
    parseScroll,
    extra_rows,
    $$scope,
    slots,
    div0_binding
  ];
}
class VirtualList extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      num_rows: 0,
      row_height: 1,
      height: 2,
      extra_rows: 6
    });
  }
}
function create_item_slot(ctx) {
  let div;
  let hexeditorrow;
  let div_style_value;
  let current;
  hexeditorrow = new HexEditorRow({
    props: {
      addr: (
        /*index*/
        ctx[3] * num_bytes
      ),
      data: (
        /*data*/
        ctx[0].slice(
          /*index*/
          ctx[3] * num_bytes,
          /*index*/
          (ctx[3] + 1) * num_bytes
        )
      )
    }
  });
  return {
    c() {
      div = element("div");
      create_component(hexeditorrow.$$.fragment);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { slot: true, style: true });
      var div_nodes = children(div);
      claim_component(hexeditorrow.$$.fragment, div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "slot", "item");
      attr(div, "style", div_style_value = /*style*/
      ctx[2]);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      mount_component(hexeditorrow, div, null);
      current = true;
    },
    p(ctx2, dirty) {
      const hexeditorrow_changes = {};
      if (dirty & /*index*/
      8)
        hexeditorrow_changes.addr = /*index*/
        ctx2[3] * num_bytes;
      if (dirty & /*data, index*/
      9)
        hexeditorrow_changes.data = /*data*/
        ctx2[0].slice(
          /*index*/
          ctx2[3] * num_bytes,
          /*index*/
          (ctx2[3] + 1) * num_bytes
        );
      hexeditorrow.$set(hexeditorrow_changes);
      if (!current || dirty & /*style*/
      4 && div_style_value !== (div_style_value = /*style*/
      ctx2[2])) {
        attr(div, "style", div_style_value);
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(hexeditorrow.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(hexeditorrow.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_component(hexeditorrow);
    }
  };
}
function create_fragment$1(ctx) {
  let virtuallist;
  let current;
  virtuallist = new VirtualList({
    props: {
      num_rows: (
        /*num_rows*/
        ctx[1]
      ),
      row_height: 21,
      $$slots: {
        item: [
          create_item_slot,
          ({ style, index }) => ({ 2: style, 3: index }),
          ({ style, index }) => (style ? 4 : 0) | (index ? 8 : 0)
        ]
      },
      $$scope: { ctx }
    }
  });
  return {
    c() {
      create_component(virtuallist.$$.fragment);
    },
    l(nodes) {
      claim_component(virtuallist.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(virtuallist, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const virtuallist_changes = {};
      if (dirty & /*num_rows*/
      2)
        virtuallist_changes.num_rows = /*num_rows*/
        ctx2[1];
      if (dirty & /*$$scope, style, index, data*/
      29) {
        virtuallist_changes.$$scope = { dirty, ctx: ctx2 };
      }
      virtuallist.$set(virtuallist_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(virtuallist.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(virtuallist.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(virtuallist, detaching);
    }
  };
}
let num_bytes = 16;
function instance$1($$self, $$props, $$invalidate) {
  let num_rows;
  let { data } = $$props;
  $$self.$$set = ($$props2) => {
    if ("data" in $$props2)
      $$invalidate(0, data = $$props2.data);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*data*/
    1) {
      $$invalidate(1, num_rows = Math.ceil(data.byteLength / num_bytes));
    }
  };
  return [data, num_rows];
}
class HexEditorBody extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { data: 0 });
  }
}
const _page_svelte_svelte_type_style_lang = "";
function create_if_block(ctx) {
  let hexeditorbody;
  let current;
  hexeditorbody = new HexEditorBody({ props: { data: (
    /*data*/
    ctx[1]
  ) } });
  return {
    c() {
      create_component(hexeditorbody.$$.fragment);
    },
    l(nodes) {
      claim_component(hexeditorbody.$$.fragment, nodes);
    },
    m(target, anchor) {
      mount_component(hexeditorbody, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const hexeditorbody_changes = {};
      if (dirty & /*data*/
      2)
        hexeditorbody_changes.data = /*data*/
        ctx2[1];
      hexeditorbody.$set(hexeditorbody_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(hexeditorbody.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(hexeditorbody.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(hexeditorbody, detaching);
    }
  };
}
function create_fragment(ctx) {
  let div;
  let label;
  let t0;
  let t1;
  let input;
  let t2;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*data*/
    ctx[1] && create_if_block(ctx)
  );
  return {
    c() {
      div = element("div");
      label = element("label");
      t0 = text("Upload a file:");
      t1 = space();
      input = element("input");
      t2 = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      label = claim_element(div_nodes, "LABEL", { for: true });
      var label_nodes = children(label);
      t0 = claim_text(label_nodes, "Upload a file:");
      label_nodes.forEach(detach);
      t1 = claim_space(div_nodes);
      input = claim_element(div_nodes, "INPUT", { type: true });
      t2 = claim_space(div_nodes);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(label, "for", "avatar");
      attr(input, "type", "file");
      attr(div, "class", "container svelte-1ewan9o");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, label);
      append_hydration(label, t0);
      append_hydration(div, t1);
      append_hydration(div, input);
      append_hydration(div, t2);
      if (if_block)
        if_block.m(div, null);
      current = true;
      if (!mounted) {
        dispose = listen(
          input,
          "change",
          /*input_change_handler*/
          ctx[3]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*data*/
        ctx2[1]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*data*/
          2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
      mounted = false;
      dispose();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let files;
  let buffer;
  let data;
  function input_change_handler() {
    files = this.files;
    $$invalidate(0, files);
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*files*/
    1) {
      if (files) {
        let file = files[0];
        let reader = new FileReader();
        reader.onload = (event) => {
          $$invalidate(2, buffer = event.target.result);
        };
        reader.readAsArrayBuffer(file);
      }
    }
    if ($$self.$$.dirty & /*buffer*/
    4) {
      $$invalidate(1, data = new Uint8Array(buffer));
    }
  };
  return [files, data, buffer, input_change_handler];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export {
  Page as default
};
