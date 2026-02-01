// https://donatso.github.io/family-chart/ v0.0.0-beta-1 Copyright 2021 Donat Soric
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory(require("d3")))
    : typeof define === "function" && define.amd
    ? define(["d3"], factory)
    : ((global =
        typeof globalThis !== "undefined" ? globalThis : global || self),
      (global.f3 = factory(global.f3)));
})(this, function (_d3) {
  "use strict";

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== "default") {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(
            n,
            k,
            d.get
              ? d
              : {
                  enumerable: true,
                  get: function () {
                    return e[k];
                  },
                }
          );
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var _d3__namespace = /*#__PURE__*/ _interopNamespace(_d3);

  var d3 =
    typeof window === "object" && !!window.d3 ? window.d3 : _d3__namespace;

  function sortChildrenWithSpouses(data) {
    data.forEach((datum) => {
      if (!datum.rels.children) return;
      datum.rels.children.sort((a, b) => {
        const a_d = data.find((d) => d.id === a),
          b_d = data.find((d) => d.id === b),
          a_p2 = otherParent(a_d, datum, data) || {},
          b_p2 = otherParent(b_d, datum, data) || {},
          a_i = datum.rels.spouses.indexOf(a_p2.id),
          b_i = datum.rels.spouses.indexOf(b_p2.id);

        if (datum.data.gender === "M") return a_i - b_i;
        else return b_i - a_i;
      });
    });
  }

  function otherParent(d, p1, data) {
    return data.find(
      (d0) =>
        d0.id !== p1.id && (d0.id === d.rels.mother || d0.id === d.rels.father)
    );
  }

  function calculateEnterAndExitPositions(d, entering, exiting) {
    d.exiting = exiting;

    if (entering) {
      if (d.depth === 0 && !d.spouse) {
        // Root node without a spouse
        d._x = d.x;
        d._y = d.y;
      } else if (d.spouse) {
        // Align with spouse's position
        d._x = d.spouse.x;
        d._y = d.spouse.y;
      } else if (d.is_ancestry) {
        // Align with ancestry parent's position
        d._x = d.parent.x;
        d._y = d.parent.y;
      } else {
        // Average positions from prioritized parents (foster > biological)
        const allParents = [
          ...(d.rels?.father || []),
          ...(d.rels?.mother || []),
        ];

        // Prioritize foster parents
        const priorityOrder = ["foster", "biological"];
        const sortedParents = allParents.sort(
          (a, b) =>
            priorityOrder.indexOf(a?.type || "biological") -
            priorityOrder.indexOf(b?.type || "biological")
        );

        if (sortedParents.length > 0) {
          d._x =
            sortedParents.reduce((sum, parent) => sum + (parent?.x || 0), 0) /
            sortedParents.length;
          d._y =
            sortedParents.reduce((sum, parent) => sum + (parent?.y || 0), 0) /
            sortedParents.length;
        } else {
          // Fallback to psx and parent's y
          d._x = d.psx !== undefined ? d.psx : 0;
          d._y = d.parent ? d.parent.y : 0;
        }
      }
    } else if (exiting) {
      // Handle exit positions
      const x = d.x > 0 ? 1 : -1;
      const y = d.y > 0 ? 1 : -1;
      d._x = d.x + 400 * x;
      d._y = d.y + 400 * y;
    }
  }

  function toggleRels(tree_datum, hide_rels) {
    const rels = hide_rels ? "rels" : "_rels",
      rels_ = hide_rels ? "_rels" : "rels";

    if (tree_datum.is_ancestry || tree_datum.data.main) {
      showHideAncestry("father");
      showHideAncestry("mother");
    } else {
      showHideChildren();
    }

    function showHideAncestry(rel_type) {
      if (!tree_datum.data[rels] || !tree_datum.data[rels][rel_type]) return;
      if (!tree_datum.data[rels_]) tree_datum.data[rels_] = {};
      tree_datum.data[rels_][rel_type] = tree_datum.data[rels][rel_type];
      delete tree_datum.data[rels][rel_type];
    }

    function showHideChildren() {
      if (!tree_datum.data[rels] || !tree_datum.data[rels].children) return;
      const children = tree_datum.data[rels].children.slice(0),
        spouses = tree_datum.spouse
          ? [tree_datum.spouse]
          : tree_datum.spouses || [];

      [tree_datum, ...spouses].forEach((sp) =>
        children.forEach((ch_id) => {
          if (sp.data[rels].children.includes(ch_id)) {
            if (!sp.data[rels_]) sp.data[rels_] = {};
            if (!sp.data[rels_].children) sp.data[rels_].children = [];
            sp.data[rels_].children.push(ch_id);
            sp.data[rels].children.splice(
              sp.data[rels].children.indexOf(ch_id),
              1
            );
          }
        })
      );
    }
  }

  function toggleAllRels(tree_data, hide_rels) {
    tree_data.forEach((d) => {
      d.data.hide_rels = hide_rels;
      toggleRels(d, hide_rels);
    });
  }

  function checkIfRelativesConnectedWithoutPerson(datum, data_stash) {
    const r = datum.rels;

    // Collect relationship IDs and prioritize foster > biological > others
    const r_ids = [
      ...(r.father || []),
      ...(r.mother || []),
      ...(r.spouses || []),
      ...(r.children || []),
    ]
      .filter((r_id) => !!r_id)
      .sort((a, b) => {
        const aType = data_stash.find((d) => d.id === a)?.type || "biological";
        const bType = data_stash.find((d) => d.id === b)?.type || "biological";
        const priorityOrder = ["foster", "biological", "spouses", "children"];
        return priorityOrder.indexOf(aType) - priorityOrder.indexOf(bType);
      });

    const rels_not_to_main = [];

    for (let i = 0; i < r_ids.length; i++) {
      const line = findPersonLineToMain(
        data_stash.find((d) => d.id === r_ids[i]),
        [datum]
      );
      if (!line) {
        rels_not_to_main.push(r_ids[i]);
        break;
      }
    }

    return rels_not_to_main.length === 0;

    // Helper function to find the line to the main node
    function findPersonLineToMain(datum, without_persons) {
      let line;
      if (isM(datum)) line = [datum];
      checkIfAnyRelIsMain(datum, [datum]);
      return line;

      function checkIfAnyRelIsMain(d0, history) {
        if (line) return;
        history = [...history, d0];
        runAllRels(check);
        if (!line) runAllRels(checkRels);

        function runAllRels(f) {
          const r = d0.rels;
          [
            ...(r.father || []),
            ...(r.mother || []),
            ...(r.spouses || []),
            ...(r.children || []),
          ]
            .filter(
              (d_id) =>
                d_id &&
                ![...without_persons, ...history].find((d) => d.id === d_id)
            )
            .forEach((d_id) => f(d_id));
        }

        function check(d_id) {
          if (isM(d_id)) line = history;
        }

        function checkRels(d_id) {
          const person = data_stash.find((d) => d.id === d_id);
          checkIfAnyRelIsMain(person, history);
        }
      }
    }

    // Helper function to check if a node is the main node
    function isM(d0) {
      return typeof d0 === "object"
        ? d0.id === data_stash[0].id
        : d0 === data_stash[0].id;
    }
  }

  function moveToAddToAdded(datum, data_stash) {
    delete datum.to_add;
    return datum;
  }

  function removeToAdd(datum, data_stash) {
    deletePerson(datum, data_stash);
    return false;
  }

  function deletePerson(datum, data_stash) {
    if (!checkIfRelativesConnectedWithoutPerson(datum, data_stash))
      return {
        success: false,
        error: "checkIfRelativesConnectedWithoutPerson",
      };
    executeDelete();
    return { success: true };

    function executeDelete() {
      data_stash.forEach((d) => {
        for (let k in d.rels) {
          if (!d.rels.hasOwnProperty(k)) continue;
          if (d.rels[k] === datum.id) {
            delete d.rels[k];
          } else if (Array.isArray(d.rels[k]) && d.rels[k].includes(datum.id)) {
            d.rels[k].splice(
              d.rels[k].findIndex((did) => did === datum.id),
              1
            );
          }
        }
      });
      data_stash.splice(
        data_stash.findIndex((d) => d.id === datum.id),
        1
      );
      data_stash.forEach((d) => {
        if (d.to_add) deletePerson(d, data_stash);
      }); // full update of tree
      if (data_stash.length === 0)
        data_stash.push(createTreeDataWithMainNode({}).data[0]);
    }
  }

  function manualZoom({ amount, svg, transition_time = 500 }) {
    const zoom = svg.__zoomObj;
    d3.select(svg)
      .transition()
      .duration(transition_time || 0)
      .delay(transition_time ? 100 : 0) // delay 100 because of weird error of undefined something in d3 zoom
      .call(zoom.scaleBy, amount);
  }

  function isAllRelativeDisplayed(d, data) {
    const r = d?.data?.rels,
      all_rels = [
        ...(r?.father || []),
        ...(r?.mother || []),
        ...(r?.spouses || []),
        ...(r?.children || []),
      ].filter((v) => v);
    return all_rels.every((rel_id) => data.some((d) => d.data.id === rel_id));
  }

  function generateUUID() {
    var d = new Date().getTime();
    var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  function handleRelsOfNewDatum({ datum, data_stash, rel_type, rel_datum }) {
    if (rel_type === "daughter" || rel_type === "son") addChild(datum);
    else if (rel_type === "father" || rel_type === "mother") addParent(datum);
    else if (rel_type === "spouse") addSpouse(datum);

    function addChild(datum) {
      if (datum.data.other_parent) {
        addChildToSpouseAndParentToChild(datum.data.other_parent);
        delete datum.data.other_parent;
      }
      datum.rels[rel_datum.data.gender === "M" ? "father" : "mother"] =
        rel_datum.id;
      if (!rel_datum.rels.children) rel_datum.rels.children = [];
      rel_datum.rels.children.push(datum.id);
      return datum;

      function addChildToSpouseAndParentToChild(spouse_id) {
        if (spouse_id === "_new") spouse_id = addOtherParent().id;

        const spouse = data_stash.find((d) => d.id === spouse_id);
        datum.rels[spouse.data.gender === "M" ? "father" : "mother"] =
          spouse.id;
        if (!spouse.rels.hasOwnProperty("children")) spouse.rels.children = [];
        spouse.rels.children.push(datum.id);

        function addOtherParent() {
          const new_spouse = createNewPersonWithGenderFromRel({
            rel_type: "spouse",
            rel_datum,
          });
          addSpouse(new_spouse);
          addNewPerson({ data_stash, datum: new_spouse });
          return new_spouse;
        }
      }
    }

    function addParent(datum) {
      const is_father = datum.data.gender === "M",
        parent_to_add_id = rel_datum.rels[is_father ? "father" : "mother"];
      if (parent_to_add_id)
        removeToAdd(
          data_stash.find((d) => d.id === parent_to_add_id),
          data_stash
        );
      addNewParent();

      function addNewParent() {
        rel_datum.rels[is_father ? "father" : "mother"] = datum.id;
        handleSpouse();
        datum.rels.children = [rel_datum.id];
        return datum;

        function handleSpouse() {
          const spouse_id = rel_datum.rels[!is_father ? "father" : "mother"];
          if (!spouse_id) return;
          const spouse = data_stash.find((d) => d.id === spouse_id);
          datum.rels.spouses = [spouse_id];
          if (!spouse.rels.spouses) spouse.rels.spouses = [];
          spouse.rels.spouses.push(datum.id);
          return spouse;
        }
      }
    }

    function addSpouse(datum) {
      removeIfToAdd();
      if (!rel_datum.rels.spouses) rel_datum.rels.spouses = [];
      rel_datum.rels.spouses.push(datum.id);
      datum.rels.spouses = [rel_datum.id];

      function removeIfToAdd() {
        if (!rel_datum.rels.spouses) return;
        rel_datum.rels.spouses.forEach((spouse_id) => {
          const spouse = data_stash.find((d) => d.id === spouse_id);
          if (spouse.to_add) removeToAdd(spouse, data_stash);
        });
      }
    }
  }

  function createNewPerson({ data, rels }) {
    return { id: generateUUID(), data: data || {}, rels: rels || {} };
  }

  function createNewPersonWithGenderFromRel({ data, rel_type, rel_datum }) {
    const gender = getGenderFromRelative(rel_datum, rel_type);
    data = Object.assign(data || {}, { gender });
    return createNewPerson({ data });

    function getGenderFromRelative(rel_datum, rel_type) {
      return ["daughter", "mother"].includes(rel_type) ||
        (rel_type === "spouse" && rel_datum.data.gender === "M")
        ? "F"
        : "M";
    }
  }

  function addNewPerson({ data_stash, datum }) {
    data_stash.push(datum);
  }

  function createTreeDataWithMainNode({ data, version }) {
    return { data: [createNewPerson({ data })], version };
  }

  function addNewPersonAndHandleRels({
    datum,
    data_stash,
    rel_type,
    rel_datum,
  }) {
    addNewPerson({ data_stash, datum });
    handleRelsOfNewDatum({ datum, data_stash, rel_type, rel_datum });
  }

  function CalculateTree({
    data_stash,
    main_id = null,
    is_vertical = true,
    node_separation = 250,
    level_separation = 150,
  }) {
    data_stash = createRelsToAdd(data_stash);
    sortChildrenWithSpouses(data_stash);
    const main =
        main_id !== null
          ? data_stash.find((d) => d.id === main_id)
          : data_stash[0],
      tree_children = calculateTreePositions(main, "children", false),
      tree_parents = calculateTreePositions(main, "parents", true);

    data_stash.forEach((d) => (d.main = d === main));
    levelOutEachSide(tree_parents, tree_children);
    const tree = mergeSides(tree_parents, tree_children);
    setupChildrenAndParents({ tree });
    setupSpouses({ tree, node_separation });
    nodePositioning({ tree, is_vertical });

    const dim = calculateTreeDim(
      tree,
      node_separation,
      level_separation,
      is_vertical
    );

    return { data: tree, data_stash, dim };

    function calculateTreePositions(datum, rt, is_ancestry) {
      const hierarchyGetter =
          rt === "children" ? hierarchyGetterChildren : hierarchyGetterParents,
        d3_tree = d3
          .tree()
          .nodeSize([node_separation, level_separation])
          .separation(separation),
        root = d3.hierarchy(datum, hierarchyGetter);
      d3_tree(root);
      return root.descendants();

      function separation(a, b) {
        let offset = 1;
        if (!is_ancestry) {
          if (!sameParent(a, b)) offset += 0.25;
          if (someSpouses(a, b)) offset += offsetOnPartners(a, b);
          if (sameParent(a, b) && !sameBothParents(a, b)) offset += 0.125;
        }
        return offset;
      }
      function sameParent(a, b) {
        return a.parent == b.parent;
      }
      function sameBothParents(a, b) {
        return (
          a.data.rels.father === b.data.rels.father &&
          a.data.rels.mother === b.data.rels.mother
        );
      }
      function hasSpouses(d) {
        return d.data.rels.spouses && d.data.rels.spouses.length > 0;
      }
      function someSpouses(a, b) {
        return hasSpouses(a) || hasSpouses(b);
      }

      function hierarchyGetterChildren(d) {
        return [...(d.rels.children || [])].map((id) =>
          data_stash.find((d) => d.id === id)
        );
      }

      // function hierarchyGetterParents(d) {
      //   return [...(d.rels.father || []), ...(d.rels.mother || [])]
      //     .filter((d) => d)
      //     .map((id) => data_stash.find((d) => d.id === id));
      // }

      function hierarchyGetterParents(d) {
        const array1 = d.rels.father || []; // ['70', '68']
        const array2 = d.rels.mother || []; // ['71', '69']

        const interleavedIds = [];
        const maxLength = Math.max(array1.length, array2.length);

        for (let i = 0; i < maxLength; i++) {
          if (array1[i]) interleavedIds.push(array1[i]);
          if (array2[i]) interleavedIds.push(array2[i]);
        }

        // Map interleaved IDs to objects from data_stash
        const result = interleavedIds
          .filter((id) => id) // Ensure no undefined values
          .map((id) => data_stash.find((item) => item.id === id));

        return result;
      }

      function offsetOnPartners(a, b) {
        return (
          Math.max(
            (a.data.rels.spouses || []).length,
            (b.data.rels.spouses || []).length
          ) *
            0.5 +
          0.5
        );
      }
    }

    function levelOutEachSide(parents, children) {
      const mid_diff = (parents[0].x - children[0].x) / 2;
      parents.forEach((d) => (d.x -= mid_diff));
      children.forEach((d) => (d.x += mid_diff));
    }

    function mergeSides(parents, children) {
      parents.forEach((d) => {
        d.is_ancestry = true;
      });
      parents.forEach((d) => (d.depth === 1 ? (d.parent = children[0]) : null));

      return [...children, ...parents.slice(1)];
    }
    function nodePositioning({ tree, is_vertical }) {
      tree.forEach((d) => {
        d.y *= d.is_ancestry ? -1 : 1;
        if (!is_vertical) {
          const d_x = d.x;
          d.x = d.y;
          d.y = d_x;
        }
      });
    }

    function setupSpouses({ tree, node_separation }) {
      node_separation = 250;
      if (!Array.isArray(tree) || tree.length === 0) {
        console.error("Tree is empty or not properly initialized");
        return;
      }

      if (!node_separation || typeof node_separation !== "number") {
        console.error("Invalid or missing node_separation value");
        return;
      }

      for (let i = tree.length - 1; i >= 0; i--) {
        const d = tree[i];

        // Ensure the current node has necessary structure
        if (!d?.data?.rels) {
          console.warn(`Node at index ${i} is missing relationship data`, d);
          continue;
        }

        // Check for spouses and process them
        if (
          !d.is_ancestry &&
          Array.isArray(d.data.rels.spouses) &&
          d.data.rels.spouses.length > 0
        ) {
          const side = d.data.data?.gender === "M" ? -1 : 1; // Female on the right
          d.x += (d.data.rels.spouses.length / 2) * node_separation * side;

          d.data.rels.spouses.forEach((sp_id, index) => {
            const spouseData = data_stash?.find((d0) => d0.id === sp_id);
            if (!spouseData) {
              console.warn(`Spouse with ID ${sp_id} not found in data_stash`);
              return;
            }

            // Create spouse object
            const spouse = {
              data: spouseData,
              added: true,
            };

            // Calculate spouse positioning
            spouse.x = d.x - node_separation * (index + 1) * side;
            spouse.y = d.y;
            spouse.sx =
              index > 0 ? spouse.x : spouse.x + (node_separation / 2) * side;
            spouse.depth = d.depth;
            spouse.spouse = d;

            // Add spouse to the current node and tree
            if (!d.spouses) d.spouses = [];
            d.spouses.push(spouse);
            tree.push(spouse);

            // Update child nodes with parent-spouse position
            tree.forEach((childNode) => {
              if (
                (childNode?.data?.rels?.father === d?.data?.id &&
                  childNode?.data?.rels?.mother === spouse?.data?.id) ||
                (childNode?.data?.rels?.mother === d?.data?.id &&
                  childNode?.data?.rels?.father === spouse?.data?.id)
              ) {
                childNode.psx = spouse.sx;
              }
            });
          });
        }

        // Process parent nodes if both parents exist
        if (Array.isArray(d.parents) && d.parents.length === 2) {
          const [p1, p2] = d.parents;

          if (p1?.x !== undefined && p2?.x !== undefined) {
            const midd = p1.x - (p1.x - p2.x) / 2;
            const adjustX = (parent, otherParent) =>
              midd +
              (node_separation / 2) * (parent.x < otherParent.x ? 1 : -1);

            p2.x = adjustX(p1, p2);
            p1.x = adjustX(p2, p1);
          } else {
            console.warn("Parent nodes are missing x values", d.parents);
          }
        }
      }
    }

    function setupChildrenAndParents({ tree }) {
      tree.forEach((d0) => {
        delete d0.children;
        tree.forEach((d1) => {
          if (d1.parent === d0) {
            if (d1.is_ancestry) {
              if (!d0.parents) d0.parents = [];
              d0.parents.push(d1);
            } else {
              if (!d0.children) d0.children = [];
              d0.children.push(d1);
            }
          }
        });
      });
    }

    function calculateTreeDim(
      tree,
      node_separation,
      level_separation,
      is_vertical
    ) {
      if (!is_vertical)
        [node_separation, level_separation] = [
          level_separation,
          node_separation,
        ];
      const w_extent = d3.extent(tree, (d) => d.x),
        h_extent = d3.extent(tree, (d) => d.y);
      return {
        width: w_extent[1] - w_extent[0] + node_separation,
        height: h_extent[1] - h_extent[0] + level_separation,
        x_off: -w_extent[0] + node_separation / 2,
        y_off: -h_extent[0] + level_separation / 2,
      };
    }

    function createRelsToAdd(data) {
      const to_add_spouses = [];
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        if (d.rels.children && d.rels.children.length > 0) {
          if (!d.rels.spouses) d.rels.spouses = [];
          const is_father = d.data.gender === "M";
          let spouse;

          d.rels.children.forEach((d0) => {
            const child = data.find((d1) => d1.id === d0);
            if (child.rels[is_father ? "father" : "mother"] !== d.id) return;
            if (child.rels[!is_father ? "father" : "mother"]) return;
            if (!spouse) {
              spouse = createToAddSpouse(d);
              d.rels.spouses.push(spouse.id);
            }
            spouse.rels.children.push(child.id);
            child.rels[!is_father ? "father" : "mother"] = spouse.id;
          });
        }
      }
      to_add_spouses.forEach((d) => data.push(d));
      return data;

      function createToAddSpouse(d) {
        const spouse = createNewPerson({
          data: { gender: d.data.gender === "M" ? "F" : "M" },
          rels: { spouses: [d.id], children: [] },
        });
        spouse.to_add = true;
        to_add_spouses.push(spouse);
        return spouse;
      }
    }
  }

  function setupSvg(svg, zoom_polite) {
    setupZoom();

    function setupZoom() {
      if (svg.__zoom) return;
      const view = svg.querySelector(".view"),
        zoom = d3.zoom().on("zoom", zoomed);

      d3.select(svg).call(zoom);
      svg.__zoomObj = zoom;

      if (zoom_polite) zoom.filter(zoomFilter);

      function zoomed(e) {
        d3.select(view).attr("transform", e.transform);
      }

      function zoomFilter(e) {
        if (e.type === "wheel" && !e.ctrlKey) return false;
        else if (e.touches && e.touches.length < 2) return false;
        else return true;
      }
    }
  }

  function positionTree({ t, svg, transition_time = 2000 }) {
    const zoom = svg.__zoomObj;

    // d3.select(svg).call(zoom.transform, d3.zoomIdentity.translate(x*k, y*k))

    d3.select(svg)
      .transition()
      .duration(transition_time || 0)
      .delay(transition_time ? 100 : 0) // delay 100 because of weird error of undefined something in d3 zoom
      .call(zoom.transform, d3.zoomIdentity.scale(t.k).translate(t.x, t.y));
  }

  function treeFit({
    svg,
    svg_dim,
    tree_dim,
    with_transition,
    transition_time,
  }) {
    const t = calculateTreeFit(svg_dim, tree_dim);
    positionTree({ t, svg, with_transition, transition_time });
  }

  function calculateTreeFit(svg_dim, tree_dim) {
    let k = Math.min(
        svg_dim.width / tree_dim.width,
        svg_dim.height / tree_dim.height
      ),
      x = tree_dim.x_off + (svg_dim.width - tree_dim.width * k) / k / 2,
      y = tree_dim.y_off + (svg_dim.height - tree_dim.height * k) / k / 2;

    if (k > 1) {
      x *= k;
      y *= k;
      k = 1;
    }
    return { k, x, y };
  }

  function mainToMiddle({ datum, svg, svg_dim, scale, transition_time }) {
    const k = scale || 1,
      x = svg_dim.width / 2 - datum.x * k,
      y = svg_dim.height / 2 - datum.y,
      t = { k, x: x / k, y: y / k };
    positionTree({ t, svg, with_transition: true, transition_time });
  }
  // function createPath(d, is_) {
  //   const line = d3.line().curve(d3.curveMonotoneY),
  //     lineCurve = d3.line().curve(d3.curveBasis),
  //     path_data = is_ ? d._d() : d.d;

  //   if (!d.curve) return line(path_data);
  //   else if (d.curve === true) return lineCurve(path_data);
  // }
  function createPath(d, is_) {
    const line = d3.line();
    const path_data = is_ ? d._d() : d.d;

    if (
      !Array.isArray(path_data) ||
      path_data.some(
        (point) =>
          !Array.isArray(point) ||
          point.length !== 2 ||
          point.some((val) => isNaN(val))
      )
    ) {
      // console.error("Invalid path data:", path_data);
      return ""; // Return an empty string or handle this case as needed
    }

    return line(path_data);
  }

  function createLinks({ d, tree, is_vertical, adminId }) {
    const links = [];

    // Step 1: Process child-parent relationships first
    handleProgenySide({ d });

    // Step 2: Handle ancestry relationships (if applicable)
    handleAncestrySide({ d });

    // Step 3: Process spouse relationships last, after all parent-child and ancestry links are established
    if (d.data.rels.spouses && d.data.rels.spouses.length > 0) {
      handleSpouse({ d });
    }

    return links;

    function handleAncestrySide({ d }) {
      if (!d.parents || d.parents.length === 0) return;

      const fathers = [];
      const mothers = [];
      const fosterFathers = [];
      const fosterMothers = [];
      const adoptedFather = [];
      const adoptedMother = [];
      const godFather = [];
      const godMother = [];
      const secondaryFather = [];
      const secondaryMother = [];

      // Categorize parents
      d.parents.forEach((parent) => {
        if (
          parent &&
          parent.data &&
          parent.data.data &&
          parent.data.data.gender
        ) {
          if (
            parent.data.data.gender === "M" &&
            !parent.data.rels.is_foster_parent &&
            !parent.data.rels.is_adopted_parent &&
            !parent.data.rels.is_god_parent &&
            !parent.data.rels.is_secondary_parent
          ) {
            fathers.push(parent); // Biological father
          } else if (
            parent.data.data.gender === "F" &&
            !parent.data.rels.is_foster_parent &&
            !parent.data.rels.is_adopted_parent &&
            !parent.data.rels.is_god_parent &&
            !parent.data.rels.is_secondary_parent
          ) {
            mothers.push(parent); // Biological mother
          } else if (parent.data.rels.is_foster_parent) {
            if (parent.data.data.gender === "M") {
              fosterFathers.push(parent); // Foster father
            } else if (parent.data.data.gender === "F") {
              fosterMothers.push(parent); // Foster mother
            }
          } else if (parent.data.rels.is_adopted_parent) {
            if (parent.data.data.gender === "M") {
              adoptedFather.push(parent); // Adoptive father
            } else if (parent.data.data.gender === "F") {
              adoptedMother.push(parent); // Adoptive mother
            }
          } else if (parent.data.rels.is_god_parent) {
            if (parent.data.data.gender === "M") {
              godFather.push(parent); // Godfather
            } else if (parent.data.data.gender === "F") {
              godMother.push(parent); // Godmother
            }
          } else if (parent.data.rels.is_secondary_parent) {
            if (parent.data.data.gender === "M") {
              secondaryFather.push(parent); // secondary Father
            } else if (parent.data.data.gender === "F") {
              secondaryMother.push(parent); // secondary Mother
            }
          }
        }
      });

      // Draw line for single parent
      function drawSingleParent(child, parent, type = "biological") {
        const parentNode = tree.find(
          (node) => node.data?.id === parent.data?.id
        );
        if (!parentNode) return;

        let midLineColor = "#000";
        let zIndexParentLine = 3;
        let dashedLine = false;
        let thicknessOfLine = 3;

        if (type === "foster") {
          midLineColor = "#808080";
          zIndexParentLine = 1;
          thicknessOfLine = 1;
        }
        if (type === "adoptive") {
          midLineColor = "#616342";
          zIndexParentLine = 3;
          thicknessOfLine = 1;
        }
        if (type === "god") {
          midLineColor = "#098612";
          zIndexParentLine = 1;
          thicknessOfLine = 1;
        }
        if (type === "secondary") {
          midLineColor = "red";
          zIndexParentLine = 1;
          thicknessOfLine = 1;
        }

        // Draw a direct line from the child to the single parent
        links.push({
          d: Link(child, parentNode),
          _d: () =>
            Link(
              { x: child.x, y: child.y },
              { x: parentNode.x, y: parentNode.y }
            ),
          curve: true,
          id: linkId(child, parentNode),
          depth: child.depth + 1,
          is_ancestry: true,
          lineStyle: {
            thickness: thicknessOfLine,
            blur: 0,
            color: midLineColor,
            zIndex: zIndexParentLine,
            isDashed: type !== "biological",
          },
        });
      }

      // Draw line for parent with or without spouse
      function drawParentAndSpouse(
        child,
        parent,
        parentsList,
        type = "biological"
      ) {
        const parentNode = tree.find(
          (node) => node.data?.id === parent.data?.id
        );
        if (!parentNode) return;

        // Determine line color based on parent type
        let midLineColor = "#000";
        let zIndexParentLine = 3;
        let dashedLine = false;
        let thicknessOfLine = 3;
        if (type === "foster") {
          midLineColor = "#808080";
          zIndexParentLine = 1;
          thicknessOfLine = 1;
        }
        if (type === "adoptive") {
          midLineColor = "#808080";
          zIndexParentLine = 2;
          thicknessOfLine = 2;
        }
        if (type === "god") {
          midLineColor = "#808080";
          zIndexParentLine = 1;
          thicknessOfLine = 1;
        }
        if (type === "secondary") {
          midLineColor = "#808080";
          zIndexParentLine = 1;
          thicknessOfLine = 1;
        }

        // Find a spouse for this parent
        const spouse = parentsList.find((spouseCandidate) =>
          checkSpouseRelationship(parent, spouseCandidate)
        );

        if (spouse) {
          const spouseNode = tree.find(
            (node) => node.data?.id === spouse.data?.id
          );

          if (spouseNode) {
            const midpoint = {
              x: (parentNode.x + spouseNode.x) / 2,
              y: (parentNode.y + spouseNode.y) / 2,
            };

            // Draw line to midpoint for the child
            links.push({
              d: Link(child, midpoint),
              _d: () => Link({ x: child.x, y: child.y }, midpoint),
              curve: true,
              id: linkId(child, midpoint),
              depth: child.depth + 1,
              is_ancestry: true,
              lineStyle: {
                thickness: thicknessOfLine,
                blur: 0,
                color: midLineColor,
                zIndex: zIndexParentLine,
                isDashed: dashedLine,
              },
            });
          }
        } else {
          // Handle cases where the parent has no spouse
          drawSingleParent(child, parent, type);
        }

        // Remove the spouse from the list to avoid duplicate processing
        if (spouse) {
          const spouseIndex = parentsList.indexOf(spouse);
          if (spouseIndex !== -1) parentsList.splice(spouseIndex, 1);
        }
      }

      // Automatically place biological parents first
      if (fathers.length > 0 && mothers.length > 0) {
        fathers.forEach((father) => drawParentAndSpouse(d, father, mothers));
        mothers.forEach((mother) => drawParentAndSpouse(d, mother, fathers));
      } else {
        fathers.forEach((father) => drawSingleParent(d, father, "biological"));
        mothers.forEach((mother) => drawSingleParent(d, mother, "biological"));
      }

      // Handle other parent types similarly
      fosterFathers.forEach((fosterFather) => {
        drawParentAndSpouse(d, fosterFather, fosterMothers, "foster");
      });
      fosterMothers.forEach((fosterMother) => {
        drawParentAndSpouse(d, fosterMother, fosterFathers, "foster");
      });

      adoptedFather.forEach((adoptedFather) => {
        drawParentAndSpouse(d, adoptedFather, adoptedMother, "adoptive");
      });
      adoptedMother.forEach((adoptedMother) => {
        drawParentAndSpouse(d, adoptedMother, adoptedFather, "adoptive");
      });

      godFather.forEach((godFather) => {
        drawParentAndSpouse(d, godFather, godMother, "god");
      });
      godMother.forEach((godMother) => {
        drawParentAndSpouse(d, godMother, godFather, "god");
      });

      secondaryFather.forEach((secondaryFather) => {
        drawParentAndSpouse(d, secondaryFather, secondaryMother, "secondary");
      });
      secondaryMother.forEach((secondaryMother) => {
        drawParentAndSpouse(d, secondaryMother, secondaryFather, "secondary");
      });
    }

    // Helper function to check spouse relationships
    function checkSpouseRelationship(parent1, parent2) {
      return (
        parent1.data.rels.spouses &&
        parent1.data.rels.spouses.includes(parent2.data.id)
      );
    }

    function handleProgenySide({ d }) {
      if (!d.children || d.children.length === 0) return;

      d.children.forEach((child) => {
        const other_parent = otherParent(child, d, tree);
        const sx = other_parent?.sx;

        // Determine the relationship type, now including "god" and "secondary"
        const relationshipType = determineRelationshipType(
          child,
          d,
          other_parent
        );

        // Define line styles based on relationship type
        const lineStyle =
          relationshipType === "biological"
            ? {
                thickness: 3,
                blur: 0,
                color: "#000",
                isDashed: false,
                zIndex: 4,
              }
            : relationshipType === "adoptive"
            ? {
                thickness: 2,
                blur: 0,
                color: "#808080",
                isDashed: false,
                zIndex: 3,
              }
            : relationshipType === "foster"
            ? {
                thickness: 1,
                blur: 1,
                color: "#808080",
                isDashed: true,
                zIndex: 1,
              }
            : relationshipType === "god"
            ? {
                thickness: 1,
                blur: 0.5,
                color: "#808080",
                isDashed: false,
                zIndex: 2,
              }
            : relationshipType === "secondary"
            ? {
                thickness: 1,
                blur: 0.3,
                color: "#808080",
                isDashed: false,
                zIndex: 1,
              }
            : null;

        if (!lineStyle) return; // Skip if the relationship type is invalid

        const parentNode = tree.find((node) => node.data.id === d.data.id);
        const childNode = tree.find((node) => node.data.id === child.data.id);

        if (!parentNode || !childNode) return;

        const midpoint = calculateMidpoint(child, parentNode, tree);

        // Check if the link already exists to prevent duplicates
        const existingLink = links.find(
          (link) =>
            link.id === linkId(child, d, other_parent) ||
            (link.source === midpoint && link.target === childNode)
        );

        if (!existingLink) {
          links.push({
            d: Link({ x: childNode.x, y: childNode.y }, midpoint),
            _d: () => Link({ x: childNode.x, y: childNode.y }, midpoint),
            curve: true,
            id: linkId(child, d, other_parent),
            depth: d.depth + 1,
            lineStyle: lineStyle,
          });
        }

        // Recursively handle progeny for this child
        if (child.children && child.children.length > 0) {
          child.children.forEach((grandChild) => {
            if (grandChild.parents && grandChild.parents.length > 0) {
              grandChild.parents.forEach((parent) => {
                if (parent && parent.data) {
                  handleProgenySide({ d: parent });
                }
              });
            }
          });
        }
      });
    }

    // Helper function to calculate the midpoint
    function calculateMidpoint(child, parentNode, tree) {
      const fatherNodes = child.data.rels.father
        .map((fatherId) =>
          tree.find(
            (node) => node.data.id === fatherId && node.data.gender === "M"
          )
        )
        .filter((fatherNode) => fatherNode);

      const motherNodes = child.data.rels.mother
        .map((motherId) =>
          tree.find(
            (node) => node.data.id === motherId && node.data.gender === "F"
          )
        )
        .filter((motherNode) => motherNode);

      if (fatherNodes.length > 0 && motherNodes.length > 0) {
        return {
          x: (fatherNodes[0].x + motherNodes[0].x) / 2,
          y: (fatherNodes[0].y + motherNodes[0].y) / 2,
        };
      } else if (fatherNodes.length > 0) {
        return { x: fatherNodes[0].x, y: fatherNodes[0].y };
      } else if (motherNodes.length > 0) {
        return { x: motherNodes[0].x, y: motherNodes[0].y };
      } else {
        return { x: parentNode.x, y: parentNode.y };
      }
    }

    // Placeholder function for relationship determination
    function determineRelationshipType(child, parent, otherParent) {
      // Add logic to identify "god" and "secondary" relationships
      if (child.data.type === "godchild") return "god";
      if (child.data.type === "secondaryChild") return "secondary";
      return isBiologicalRelationship(child, parent, otherParent);
    }

    function handleSpouse({ d }) {
      // Ensure that only valid spouses are processed, after all parent-child relationships are set
      if (!d.data.rels.spouses || d.data.rels.spouses.length === 0) return;

      // Only link spouses after parents and children are handled
      d.data.rels.spouses.forEach((sp_id) => {
        const spouse = tree.find((d0) => d0.data.id === sp_id);

        if (!spouse || d.spouse) return; // Prevent duplicating spouses

        const lineStyle = {
          thickness: 3,
          blur: 0,
          color: "#000",
          isDashed: false,
          zIndex: 1,
        };

        // Check if the link between this spouse and parent already exists
        const existingLink = links.find(
          (link) =>
            link.id === [d.data.id, spouse.data.id].join(", ") ||
            link.id === [spouse.data.id, d.data.id].join(", ")
        );

        if (existingLink) return; // Skip adding the link if already exists

        links.push({
          d: [
            [d.x, d.y],
            [spouse.x, spouse.y],
          ],
          _d: () => [
            d.is_ancestry ? [_or(d, "x") - 0.0001, _or(d, "y")] : [d.x, d.y],
            d.is_ancestry
              ? [_or(spouse, "x"), _or(spouse, "y")]
              : [spouse.x - 0.0001, spouse.y],
          ],
          curve: false,
          id: [d.data.id, spouse.data.id].join(", "),
          depth: d.depth,
          spouse: true,
          is_ancestry: spouse.is_ancestry,
          lineStyle: lineStyle,
        });
      });
    }

    // Check if the relationship is biological, adoptive, or foster
    function isBiologicalRelationship(child, parent, other_parent) {
      // Check if the child is explicitly marked as foster
      if (child.data.rels.is_foster_child) {
        return "foster"; // Foster relationship
      }

      // Check if the child is explicitly marked as adopted
      if (child.data.rels.is_adopted_child) {
        return "adoptive"; // Adoptive relationship
      }

      // Check if the child is explicitly marked as a godchild
      if (child.data.rels.is_god_child) {
        return "god"; // Godchild relationship
      }

      // Check if the child is explicitly marked as a secondary child
      if (child.data.rels.is_secondary_child) {
        return "secondary"; // Secondary relationship
      }

      // Check if the parent is listed in the mother's or father's array
      const motherArray = child.data.rels.mother || [];
      const fatherArray = child.data.rels.father || [];

      // Check biological relationship for the current parent
      if (
        motherArray.includes(parent.data.id) ||
        fatherArray.includes(parent.data.id)
      ) {
        return "biological"; // Biological relationship
      }

      // Optionally check the other parent
      if (
        other_parent &&
        (motherArray.includes(other_parent.data.id) ||
          fatherArray.includes(other_parent.data.id))
      ) {
        return "biological"; // Biological relationship via the other parent
      }

      // Default to adoptive if no other relationship type is found
      return "adoptive";
    }

    function getMid(nodes, side) {
      // Average all nodes' coordinates on the given side
      const total = nodes.reduce((sum, node) => sum + node[side], 0);
      return total / nodes.length;
    }

    function _or(d, k) {
      return d.hasOwnProperty("_" + k) ? d["_" + k] : d[k];
    }

    function Link(d, p) {
      const hy = d.y + (p.y - d.y) / 2;
      return [
        [d.x, d.y],
        [d.x, hy],
        [d.x, hy],
        [p.x, hy],
        [p.x, hy],
        [p.x, p.y],
      ];
    }

    function linkId(...args) {
      return args
        .filter((d) => d?.data?.id) // Filter out undefined or null elements
        .map((d) => d.data.id) // Safely access id
        .sort() // Sort the IDs
        .join(", "); // Join them to form a unique ID
    }

    function otherParent(d, p1, data) {
      return data.find(
        (d0) =>
          d0.data.id !== p1.data.id &&
          (d0.data.id === d.data.rels.mother ||
            d0.data.id === d.data.rels.father)
      );
    }
  }

  function CardBody({ d, card_dim, card_display }) {
    // console.log("nndkq", d?.data);
    // const fill_color2 =
    //   d?.data?.data?.color_class === "root"
    //     ? "#f45a28"
    //     : d?.data?.data?.color_class == "searchedNode"
    //     ? "#1c2d51"
    //     : "url(#grad1)";

    // const fill_color2 =
    //   d?.data?.data?.color_class === "root" ? "#f45a28" : "url(#grad1)";
    const fill_color2 =
      d?.data?.data?.birthDay === "D"
        ? "#60463d"
        : d?.data?.data?.color_class === "root"
        ? "#f45a28"
        : "url(#grad1)";
    
    const admin =
      d?.data?.data?.color_class === "root" ? "(administrator)" : "";
    // Define hover effect color and border
    const hover_fill_color =
      d?.data?.data?.color_class === "root"
        ? "#e03d2f"
        : d?.data?.data?.color_class == "searchedNode"
        ? "#1c2d51"
        : "url(#grad2)";
    const border_color = "#000000";
    // <tspan x="0" dy="14" font-size="10">${card_display[4](d.data)}</tspan>
    return {
      template: `
        <style>
          .card-body-rect {
            padding:8px;
          }
          .card-body-rect:hover {
            fill: ${hover_fill_color};
            stroke: ${border_color};
            stroke-width: 5;
            cursor: pointer;
          }
        </style>
        <g class="card-body">
          <rect width="${card_dim.w}" height="${card_dim.h}" class="card-body-rect" fill="${fill_color2}" />
          <g transform="translate(${card_dim.text_x}, ${card_dim.text_y})">
            <text clip-path="url(#card_text_clip)">
              ${wrapText(`${card_display[1](d.data)} ${card_display[2](d.data)} ${card_display[0](d.data)}`, 18)
                .map((line, index) => `<tspan x="0" dy="${index === 0 ? 14 : 12}">${line}</tspan>`)
                .join('')}
              <tspan x="0" dy="14">${admin}</tspan>
              <tspan x="0" dy="14" font-size="10">${card_display[3](d.data)}</tspan>
             
            </text>
            <rect width="${card_dim.w - card_dim.text_x + 100}" height="${card_dim.h - 20}" style="mask: url(#fade)" class="text-overflow-mask" /> 
          </g>
        </g>      
        <line x1="0" y1="70" x2="300" y2="70" stroke="white" stroke-width="1.5"/>
      `,
    };
    
  }

  function wrapText(text, maxCharsPerLine) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];
  
    for (let i = 1; i < words.length; i++) {
      if ((currentLine + ' ' + words[i]).length <= maxCharsPerLine) {
        currentLine += ' ' + words[i];
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);
    return lines;
  }

  function CardBodyAddNew({ d, card_dim, card_add, label }) {
    return {
      template: `
      <g class="card-body ${card_add ? "card_add" : "card-unknown"}">
        <rect class="card-body-rect" fill="url(#grad1)"  width="${
          card_dim.w
        }" height="${card_dim.h}" fill="rgb(59, 85, 96)" />
        <text transform="translate(${card_dim.w / 2}, ${
        card_dim.h / 2
      })" text-anchor="middle" fill="#fff">
          <tspan font-size="18" dy="${8}">${label}</tspan>
        </text>
      </g>
    `,
    };
  }

  function setupLongPressTooltips() {
    const tooltip = document.createElement("div");
    tooltip.style.cssText = `
      position: absolute;
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      display: none;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(tooltip);
  
    let pressTimer;
  
    function showTooltip(e, text) {
      const x = e.pageX || e.touches?.[0]?.pageX;
      const y = e.pageY || e.touches?.[0]?.pageY;
      tooltip.textContent = text;
      tooltip.style.left = `${x + 10}px`;
      tooltip.style.top = `${y + 10}px`;
      tooltip.style.display = "block";
    }
  
    function hideTooltip() {
      clearTimeout(pressTimer);
      tooltip.style.display = "none";
    }
  
    // Apply to all elements with `data-tooltip`
    document.querySelectorAll("[data-tooltip]").forEach((el) => {
      const text = el.getAttribute("data-tooltip");
  
      el.addEventListener("mousedown", (e) => {
        pressTimer = setTimeout(() => showTooltip(e, text), 600);
      });
  
      el.addEventListener("mouseup", hideTooltip);
      el.addEventListener("mouseleave", hideTooltip);
  
      el.addEventListener("touchstart", (e) => {
        pressTimer = setTimeout(() => showTooltip(e, text), 600);
      });
  
      el.addEventListener("touchend", hideTooltip);
    });
  }  

  function CardBodyOutline({ d, card_dim, is_new }) {
    return {
      template: `
      <rect width="${card_dim.w}" height="${
        card_dim.h
      }" rx="4" ry="4" class="card-outline ${
        d?.data?.main && !is_new ? "card-main-outline" : ""
      } ${is_new ? "card-new-outline" : ""}" />
    `,
    };
  }

  function PencilIcon({ d, card_dim, x, y }) {
    setTimeout(() => {
      setupLongPressTooltips();
    }, 0);
    return {
      template: `
      <g id="pencil-icon" data-tooltip="EDIT PROFILE" transform="translate(${x || card_dim.w - 20},${
        y || card_dim.h - 20
      })scale(1.3)" style="cursor: pointer" class="card_edit pencil_icon">
        <title>EDIT PROFILE</title>
        <circle fill="rgba(0,0,0,0)" r="17" cx="8.5" cy="8.5" />
        <path fill="currentColor" transform="translate(-1.5, -1.5)"
           d="M19.082,2.123L17.749,0.79c-1.052-1.052-2.766-1.054-3.819,0L1.925,12.794c-0.06,0.06-0.104,0.135-0.127,0.216
            l-1.778,6.224c-0.05,0.175-0.001,0.363,0.127,0.491c0.095,0.095,0.223,0.146,0.354,0.146c0.046,0,0.092-0.006,0.137-0.02
            l6.224-1.778c0.082-0.023,0.156-0.066,0.216-0.127L19.082,5.942C20.134,4.89,20.134,3.176,19.082,2.123z M3.076,13.057l9.428-9.428
            l3.738,3.739l-9.428,9.428L3.076,13.057z M2.566,13.961l3.345,3.344l-4.683,1.339L2.566,13.961z M18.375,5.235L16.95,6.66
            l-3.738-3.739l1.425-1.425c0.664-0.663,1.741-0.664,2.405,0l1.333,1.333C19.038,3.493,19.038,4.572,18.375,5.235z"/>
      </g>
    `,
    };
  }

  function InfoIcon({ d, card_dim, x, y }) {
    setTimeout(() => {
      setupLongPressTooltips();
    }, 0);
    return {
      template: `
       <g id="info-icon" data-tooltip="CONTACT INFORMATION" transform="translate(${x || card_dim.w - 20},${
        y || card_dim.h - 10
      })scale(1.9)" style="cursor: pointer" class="card_edit info_icon">
      <title>CONTACT INFORMATION</title>
      <path fill="currentColor" transform="translate(-1.5, -1.5)"
        d="M10,0 C4.486,0 0,4.486 0,10 C0,15.514 4.486,20 10,20 C15.514,20 20,15.514 20,10 C20,4.486 15.514,0 10,0 ZM11,15 L9,15 L9,9 L11,9 L11,15 ZM11,7 L9,7 L9,5 L11,5 L11,7 Z"/>
    </g>
      `,
    };
  }

  function ChatIcon({ d, card_dim, x, y }) {
    return {
      template: `
        <g transform="translate(${x || card_dim.w - 40},${
        y || card_dim.h - 20
      })scale(1.9)" style="cursor: pointer" class="card_edit chat_icon">
      <path fill="currentColor" transform="translate(-1.5, -1.5)"
        d="M2,0 L18,0 C19.1046,0 20,0.89543 20,2 L20,14 C20,15.1046 19.1046,16 18,16 L6,16 L2,20 L2,2 Z"/>
      <circle cx="8" cy="7" r="1.5" fill="white" />
      <circle cx="12" cy="7" r="1.5" fill="white" />
      <circle cx="16" cy="7" r="1.5" fill="white" />
    </g>
      `,
    };
  }

  function HideIcon({ d, card_dim }) {
    return {
      template: `
      <g transform="translate(${card_dim.w - 50},${
        card_dim.h - 20
      })scale(.035)" style="cursor: pointer" class="card_hide_rels hide_rels_icon">
        <circle fill="rgba(0,0,0,0)" r="256" cx="256" cy="256" />
        <g fill="currentColor">
          <path d="m34,256l26.2,26.2c108,108 283.7,108 391.7,0l26.1-26.2-26.2-26.2c-108-108-283.7-108-391.7,0l-26.1,
            26.2zm222,126.2c-75.8,0-151.6-28.9-209.3-86.6l-32.9-32.9c-3.7-3.7-3.7-9.7 0-13.5l32.9-32.9c115.4-115.4 303.2-115.4 418.6,
            0l32.9,32.9c3.7,3.7 3.7,9.7 0,13.5l-32.9,32.9c-57.7,57.7-133.5,86.6-209.3,86.6z"/>
          <path d="m256,183.5c-40,0-72.5,32.5-72.5,72.5s32.5,72.5 72.5,72.5c40,0 72.5-32.5 72.5-72.5s-32.5-72.5-72.5-72.5zm0,
            164c-50.5,0-91.5-41.1-91.5-91.5 0-50.5 41.1-91.5 91.5-91.5s91.5,41.1 91.5,91.5c0,50.5-41,91.5-91.5,91.5z"/>
        </g>
      </g>
    `,
    };
  }

  function MiniTree({ d, card_dim }) {
    return {
      template: `
      <g class="card_family_tree" style="cursor: pointer">
        <rect x="-31" y="-25" width="72" height="15" fill="rgba(0,0,0,0)"></rect>
        <g transform="translate(${card_dim.w * 0.8},6)scale(.9)">
          <rect x="-31" y="-25" width="72" height="15" fill="rgba(0,0,0,0)"></rect>
          <line y2="-17.5" stroke="#fff" />
          <line x1="-20" x2="20" y1="-17.5" y2="-17.5" stroke="#fff" />
          <rect x="-31" y="-25" width="25" height="15" rx="5" ry="5" class="card-male" />
          <rect x="6" y="-25" width="25" height="15" rx="5" ry="5" class="card-female" />
        </g>
      </g>
    `,
    };
  }

  function PlusIcon({ d, card_dim, x, y }) {
    // Check if any of the bits are true
    const isUnclickable = Object.keys(d.data.rels).some(
      (key) =>
        key.startsWith("is_") && // Check for keys starting with 'is_'
        d.data.rels[key] === true // Ensure the value is true
    );   
    setTimeout(() => {
      setupLongPressTooltips();
    }, 0);
    return {
      template: `
           <g id="plus-icon-${d?.data?.id}" data-tooltip="ADD FAMILY MEMBER"
             class="card_add_relative ${
               d?.data?.id ? "card_add_popup_" + d.data.id : ""
             } ${isUnclickable ? "unclickable" : ""}" 
             style="${
               isUnclickable
                 ? "pointer-events: none; opacity: 0.6; color: #b6adb4;"
                 : ""
             }"
           >
           <title>ADD FAMILY MEMBER</title>
            <g transform="translate(${x || card_dim.w / 2},${
        y || card_dim.h
      })scale(.20)">
             <circle r="100" cx="40" cy="40" stroke="currentColor" stroke-width="10" fill="none" />
              <g transform="translate(-10, -8)">
                <line
                  x1="10" x2="90" y1="50" y2="50"
                  stroke="currentColor" stroke-width="15" stroke-linecap="round"
                />
                <line
                  x1="50" x2="50" y1="10" y2="90"
                  stroke="currentColor" stroke-width="15" stroke-linecap="round"
                />
              </g>
            </g>
          </g>
        `,
    };
  }

  function LinkBreakIcon({ x, y, rt, closed }) {
    return {
      template: `
      <g style="
            transform: translate(-12.2px, -.5px);
            cursor: pointer;
          " 
          fill="currentColor" class="card_break_link${closed ? " closed" : ""}"
        >
        <g style="transform: translate(${x}px,${y}px)scale(.02)rotate(${
        rt + "deg"
      })">
          <rect width="1000" height="700" y="150" style="opacity: 0" />
          <g class="link_upper">
            <g>
              <path d="M616.3,426.4c19,4.5,38.1-7.4,42.6-26.4c4.4-19-7.4-38-26.5-42.5L522.5,332c-18,11.1-53.9,33.4-53.9,33.4l80.4,18.6c-7.8,4.9-19.5,12.1-31.3,19.4L616.3,426.4L616.3,426.4z"/>
              <path d="M727.4,244.2c-50.2-11.6-100.3,3.3-135.7,35.4c28.6,22.6,64.5,30.2,116.4,51.3l141,32.6c23.9,5.6,56.6,47.2,51.1,71l-4.1,17c-5.6,23.7-47.3,56.4-71.2,51l-143.4-33.2c-66.8-8.6-104.1-16.6-132.9-7.5c17.4,44.9,55.9,80.8,106.5,92.4L800.9,588c81.3,18.8,162.3-31.5,181.2-112.4l4-17c18.8-81.1-31.7-161.8-112.9-180.6L727.4,244.2z"/>
            </g>
          </g>
          <g class="link_lower">
            <path d="M421.2,384.9l-128,127.6c-13.9,13.8-13.9,36.2,0,50s36.3,13.8,50.2,0.1l136.2-135.8v-36.7l-58.4,58.1V384.9L421.2,384.9z"/>
            <path d="M204.6,742.8c-17.4,17.3-63.3,17.2-80.6,0.1l-12.3-12.3c-17.3-17.3,0.6-81.2,17.9-98.5l100.2-99.9c12.5-14.9,45.8-40.8,66.1-103.7c-47.7-9.4-98.9,4.2-135.8,40.9L54.2,575c-58.9,58.8-58.9,154,0,212.8L66.6,800c58.9,58.8,154.5,58.8,213.4,0l105.8-105.6c38.4-38.3,51.3-91.9,39.7-141c-44,22.7-89,62.3-116,84.8L204.6,742.8z"/>
          </g>
          <g class="link_particles">
            <path d="M351.9,248.4l-26.5,63.4l80.6,30.1L351.9,248.4z"/>
            <path d="M529.3,208l-43,26.6l35.4,52.3L529.3,208z"/>
            <path d="M426.6,158.8l-44-2.9l61.7,134.6L426.6,158.8z"/>
          </g>
        </g>
      </g>
    `,
    };
  }

  function LinkBreakIconWrapper({ d, card_dim }) {
    let g = "",
      r = d.data.rels,
      _r = d.data._rels || {},
      closed = d.data.hide_rels,
      areParents = (r) =>
        (r.father && r.father.length > 0) || (r.mother && r.mother.length > 0),
      areChildren = (r) => r.children && r.children.length > 0;
    if ((d.is_ancestry || d.data.main) && (areParents(r) || areParents(_r))) {
      g += LinkBreakIcon({ x: card_dim.w / 2, y: 0, rt: -45, closed }).template;
    }
    if (!d.is_ancestry && d.added) {
      const sp = d.spouse,
        sp_r = sp.data.rels,
        _sp_r = sp.data._rels || {};
      if (
        (areChildren(r) || areChildren(_r)) &&
        (areChildren(sp_r) || areChildren(_sp_r))
      ) {
        g += LinkBreakIcon({
          x: d.sx - d.x + card_dim.w / 2 + 24.4,
          y: (d.x !== d.sx ? card_dim.h / 2 : card_dim.h) + 1,
          rt: 135,
          closed,
        }).template;
      }
    }
    return g;
  }

  function CardImage({ d, image, card_dim, maleIcon, femaleIcon }) {
    return {
      template: `
      <svg width="${card_dim.img_w + 10}" height="${card_dim.img_h + 10}">
        <defs>
          <clipPath id="circleClip">
            <circle cx="35" cy="35" r="32" />
          </clipPath>
        </defs>
        <circle cx="35" cy="35" r="32" fill="white" />
        <g class="card_image" clip-path="url(#circleClip)">
          ${
            image
              ? `<image href="${image}" x="3" y="3" height="${
                  card_dim.img_h + 3
                }" width="${
                  card_dim.img_w + 10
                }" preserveAspectRatio="xMidYMid slice" />`
              : d?.data?.data?.gender === "F" && !!femaleIcon
              ? femaleIcon({ card_dim })
              : d.data.data.gender === "M" && !!maleIcon
              ? maleIcon({ card_dim })
              : GenderlessIcon()
          }
        </g>
      </svg>
      `,
    };

    function GenderlessIcon() {
      return `
        <g class="genderless-icon">
          <svg width="${card_dim.img_w}" height="${card_dim.img_h}">
               <circle cx="30" cy="30" r="30" fill="rgba(206,176,62,255)" />
          </svg>
          <g transform="scale(${card_dim.img_w * 0.001496})">
           <path transform="translate(50,40)" fill="#fffeff" d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 
              64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 
              0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z" />
          </g>
        </g>
      `;
    }
  }

  function CalculateTree$1({ datum, data_stash, card_dim, labels }) {
    const sx = card_dim.w + 40,
      y = card_dim.h + 50,
      lbls = labels || {};
    datum = datum
      ? datum
      : { id: "0", data: { fn: "FN", ln: "LN", gender: "M" } };
    const data = [
      { x: 0, y: 0, data: datum },
      {
        x: -100,
        y: -y,
        data: {
          rel_type: "father",
          data: { label: lbls.father || "Add father", gender: "M" },
        },
      },
      {
        x: 100,
        y: -y,
        data: {
          rel_type: "mother",
          data: { label: lbls.mother || "Add mother", gender: "F" },
        },
      },

      {
        x: sx,
        y: 0,
        data: {
          rel_type: "spouse",
          data: { label: lbls.spouse || "Add spouse", gender: "F" },
        },
      },

      {
        x: -100,
        y: y,
        data: {
          rel_type: "son",
          data: { label: lbls.son || "Add son", gender: "M" },
        },
      },
      {
        x: 100,
        y: y,
        data: {
          rel_type: "daughter",
          data: { label: lbls.daughter || "Add daughter", gender: "F" },
        },
      },
    ].filter((d) => shouldAddRel(d.data.rel_type));

    function shouldAddRel(rel_type) {
      if (rel_type === "father")
        return (
          !datum.rels.father ||
          data_stash.find((d) => d.id === datum.rels.father).to_add
        );
      else if (rel_type === "mother")
        return (
          !datum.rels.mother ||
          data_stash.find((d) => d.id === datum.rels.mother).to_add
        );
      else return true;
    }

    return { data };
  }

  function View(
    tree,
    {
      store,
      data_stash,
      cont,
      datum,
      card_dim,
      cardAddform,
      cardEditForm,
      memberInfo,
      scale,
    }
  ) {
    const svg_dim = cont.getBoundingClientRect(),
      tree_fit = calculateTreeFit(svg_dim),
      mounted = (node) => {
        addEventListeners(node);
      };

    return {
      template: `
        <svg id="family-tree-svg" style="width: 100%; height: 100%">
          <rect width="${svg_dim.width}" height="${
        svg_dim.height
      }" fill="transparent" />
          <g class="view">
            <g transform="translate(${tree_fit.x}, ${tree_fit.y})scale(${
        tree_fit.k
      })">
              ${tree.data.slice(1).map(
                (d, i) =>
                  Link({
                    d,
                    is_vertical: !["spouse"].includes(d.data.rel_type),
                  }).template
              )}
              ${tree.data.slice(1).map((d, i) => Card({ d }).template)}
            </g>
          </g>
        </svg>
      `,
      mounted,
    };

    function calculateTreeFit(svg_dim) {
      const k = scale || 1;
      return { k, x: svg_dim.width / 2, y: svg_dim.height / 2 };
    }

    function Card({ d, is_main }) {
      const [w, h] = is_main ? [160, 60] : [160, 40],
        pos = { x: d.x, y: d.y };

      return {
        template: `
        <g transform="translate(${pos.x}, ${
          pos.y
        })" class="card" data-rel_type="${
          d.data.rel_type
        }" style="cursor: pointer">
          <g transform="translate(${-w / 2}, ${-h / 2})">
            ${CardBody({ d, w, h }).template}
          </g>
        </g>
      `,
      };

      function CardBody({ d, w, h }) {
        if (d.data.data.color_class) {
          let color_class = d.data.data.color_class;
        } else {
          let color_class =
            d.data.data.gender === "M"
              ? "card-male"
              : d.data.data.gender === "F"
              ? "card-female"
              : "card-genderless";
        }
        return {
          template: `
          <g>
            <rect width="${w}" height="${h}" fill="#fff" rx="${10}" ${
            d.data.main ? 'stroke="#000"' : ""
          } class="${color_class}" />
            <text transform="translate(${0}, ${h / 4})">
              <tspan x="${10}" dy="${14}">${d.data.data.label}</tspan>
            </text>
          </g>
        `,
        };
      }
    }

    function Link({ d, is_vertical }) {
      return {
        template: `
        <path d="${createPath()}" fill="none" stroke="#fff" />
      `,
      };

      function createPath() {
        const { w, h } = card_dim;
        let parent =
          is_vertical && d.y < 0
            ? { x: 0, y: -h / 2 }
            : is_vertical && d.y > 0
            ? { x: 0, y: h / 2 }
            : !is_vertical && d.x < 0
            ? { x: -w / 2, y: 0 }
            : !is_vertical && d.x > 0
            ? { x: w / 2, y: 0 }
            : { x: 0, y: 0 };

        if (is_vertical) {
          return (
            "M" +
            d.x +
            "," +
            d.y +
            "C" +
            d.x +
            "," +
            (d.y + (d.y < 0 ? 50 : -50)) +
            " " +
            parent.x +
            "," +
            (parent.y + (d.y < 0 ? -50 : 50)) +
            " " +
            parent.x +
            "," +
            parent.y
          );
        } else {
          const s = d.x > 0 ? +1 : -1;
          return (
            "M" +
            d.x +
            "," +
            d.y +
            "C" +
            (parent.x + 50 * s) +
            "," +
            d.y +
            " " +
            (parent.x + 150 * s) +
            "," +
            parent.y +
            " " +
            parent.x +
            "," +
            parent.y
          );
        }
      }
    }

    function addEventListeners(view) {
      view.addEventListener("click", (e) => {
        const node = e.target;
        handleCardClick(node) || view.remove();
      });

      function handleCardClick(node) {
        if (!node.closest(".card")) return;
        const card = node.closest(".card"),
          rel_type = card.getAttribute("data-rel_type"),
          rel_datum = datum,
          new_datum = createNewPersonWithGenderFromRel({ rel_datum, rel_type }),
          postSubmit = () => {
            view.remove();
            addNewPerson({ data_stash, datum: new_datum });
            handleRelsOfNewDatum({
              datum: new_datum,
              data_stash,
              rel_datum,
              rel_type,
            });
            store.update.tree();
          };
        cardAddform({
          datum: new_datum,
          rel_datum,
          rel_type,
          postSubmit,
          store,
        });
        cardEditForm({
          datum: new_datum,
          rel_datum,
          rel_type,
          postSubmit,
          store,
        });
        memberInfo({
          datum: new_datum,
          rel_datum,
          rel_type,
          postSubmit,
          store,
        });
        return true;
      }
    }
  }

  function AddRelativeTree(props) {
    const tree = CalculateTree$1(props),
      view = View(tree, props);

    const div_add_relative = document.createElement("div");
    div_add_relative.style.cssText =
      "width: 100%; height: 100%; position: absolute; top: 0; left: 0;background-color: rgba(0,0,0,.3);opacity: 0";
    div_add_relative.innerHTML = view.template;

    props.cont.appendChild(div_add_relative);
    view.mounted(div_add_relative);
    d3.select(div_add_relative)
      .transition()
      .duration(props.transition_time)
      .delay(props.transition_time / 4)
      .style("opacity", 1);
  }

  function cardChangeMain(store, { card, d }) {
    toggleAllRels(store.getTree().data, false);
    store.update.mainId(d.data.id);
    store.update.tree({ tree_position: "inherit" });
    return true;
  }

  function cardEdit(store, { card, d, cardEditForm }) {
    const datum = d.data,
      postSubmit = (props) => {
        if (datum.to_add) moveToAddToAdded(datum, store.getData());
        if (props && props.delete) {
          if (datum.main) store.update.mainId(null);
          deletePerson(datum, store.getData());
        }
        store.update.tree();
      };
    cardEditForm({ datum, postSubmit, store });
  }
  function memberinfoDetails(store, { card, d, memberInfo }) {
    const datum = d.data,
      postSubmit = (props) => {
        if (datum.to_add) moveToAddToAdded(datum, store.getData());
        if (props && props.delete) {
          if (datum.main) store.update.mainId(null);
          deletePerson(datum, store.getData());
        }
        store.update.tree();
      };
     
      memberInfo({ datum, postSubmit, store });
  }


  function cardAdd(store, { card, d, cardAddform }) {
    const datum = d.data,
      postSubmit = (props) => {
        if (datum.to_add) moveToAddToAdded(datum, store.getData());
        if (props && props.delete) {
          if (datum.main) store.update.mainId(null);
          deletePerson(datum, store.getData());
        }
        store.update.tree();
      };
    cardAddform({ datum, postSubmit, store });
  }

  function cardShowHideRels(store, { card, d }) {
    d.data.hide_rels = !d.data.hide_rels;
    toggleRels(d, d.data.hide_rels);
    store.update.tree({ tree_position: "inherit" });
  }

  function Card(props) {
    props = setupProps(props);
    const store = props.store;
    setupSvgDefs();

    return function ({ node, d }) {
      const el = document.createElementNS("http://www.w3.org/2000/svg", "g"),
        gender_class = d?.data?.data?.color_class
          ? d?.data?.data?.color_class
          : d?.data?.data?.gender === "M"
          ? "card-male"
          : d?.data?.data.gender === "F"
          ? "card-female"
          : "card-genderless",
        card_dim = props.card_dim,
        show_mini_tree = !isAllRelativeDisplayed(d, store.state.tree.data),
        unknown_lbl = props.cardEditForm ? "ADD" : "UNKNOWN",
        mini_tree = () =>
          !d?.data?.to_add && show_mini_tree
            ? MiniTree({ d, card_dim }).template
            : "",
        card_body_outline = () =>
          CardBodyOutline({ d, card_dim, is_new: d?.data?.to_add }).template,
        card_body = () =>
          !d?.data?.to_add
            ? CardBody({ d, card_dim, card_display: props.card_display })
                .template
            : CardBodyAddNew({
                d,
                card_dim,
                card_add: props.cardEditForm,
                label: unknown_lbl,
              }).template,
        card_image = () =>
          !d?.data?.to_add
            ? CardImage({
                d,
                image: d?.data?.data.image || null,
                card_dim,
                maleIcon: null,
                femaleIcon: null,
              }).template
            : "",
        info_icon = () =>
            !d?.data?.to_add && props.memberInfo
              ? InfoIcon({ card_dim, x: card_dim.w - 130, y: card_dim.h - 40 })
                  .template
              : "",
        edit_icon = () =>
          !d.data.to_add && props.cardEditForm
            ? PencilIcon({ card_dim, x: card_dim.w - 46, y: card_dim.h - 40 })
                .template
            : "",
        // chat_icon = () =>
        //   !d.data.to_add && props.cardEditForm
        //     ? ChatIcon({ card_dim, x: card_dim.w - 130, y: card_dim.h - 40 })
        //         .template
        //     : "",
        add_icon = () =>
          !d?.data?.to_add && props.cardAddform
            ? PlusIcon({ d, card_dim, x: card_dim.w - 210, y: card_dim.h - 32 })
                .template
            : "",
        link_break_icon = () => LinkBreakIconWrapper({ d, card_dim });
      const fill_color =
        d?.data?.data?.color_class == "root"
          ? "#f45a28"
          : d?.data?.data?.color_class == "searchedNode"
          ? "#1c2d51"
          : "url(#grad1)";
      //if(!d.data.to_add && props.cardEditForm){
      el.innerHTML = `
          <g class="memeberSearch_${
            d?.data?.id
          } card ${gender_class}" data-id="${
        d?.data?.id
      }" fill="${fill_color}" data-cy="card">
            <g transform="translate(${-card_dim.w / 2}, ${-card_dim.h / 2})">
              ${props.mini_tree ? mini_tree() : ""}
              ${card_body_outline()}
              
              <g clip-path="url(#card_clip)">
                ${card_body()}
                ${card_image()}
                ${edit_icon()}
                ${info_icon()}
                ${add_icon()}
                
              </g>
              ${props.link_break ? link_break_icon() : ""}
            </g>
          </g>
        `;
      //}else{
      //  el.innerHTML = ``;

      //}

      setupListeners(el, d, store);

      return el;
    };

    function setupListeners(el, d, store) {
      let p;

      p = el.querySelector(".card");
      if (p)
        p.addEventListener("click", (e) => {
          e.stopPropagation();
          cardChangeMain(store, { card: el, d });
        });

      p = el.querySelector(".pencil_icon");
      if (p && props.cardEditForm)
        p.addEventListener("click", (e) => {
          e.stopPropagation();
          cardEdit(store, { card: el, d, cardEditForm: props.cardEditForm });
        });

        p = el.querySelector(".info_icon");
        if (p && props.memberInfo)
          p.addEventListener("click", (e) => {
            e.stopPropagation();         
            memberinfoDetails(store, { card: el, d, memberInfo: props.memberInfo });
          });
  

      //if (d?.data?.data?.color_class == "root")
       // cardEdit(store, { card: el, d, cardEditForm: props.cardEditForm });

      p = el.querySelector(".card_add");
      if (p && props.cardAddform)
        p.addEventListener("click", (e) => {
          e.stopPropagation();
          //cardAdd(store, { card: el, d, cardAddform: props.cardAddform });
        });

      // p = el.querySelector(".card_info");
      // if (p && props.cardEditForm)
      //   p.addEventListener("click", (e) => {
      //     e.stopPropagation();
      //     cardEdit(store, { card: el, d, cardEditForm: props.cardEditForm });
      //   });

      p = el.querySelector(".card_add_relative");
      if (p && props.cardAddform)
        p.addEventListener("click", (e) => {
          e.stopPropagation();
          cardAdd(store, { card: el, d, cardAddform: props.cardAddform });
        });

      p = el.querySelector(".card_family_tree");
      if (p)
        p.addEventListener("click", (e) => {
          e.stopPropagation();
          cardChangeMain(store, { card: el, d });
        });

      p = el.querySelector(".card_break_link");
      if (p)
        p.addEventListener("click", (e) => {
          e.stopPropagation();
          cardShowHideRels(store, { card: el, d });
        });
    }

    function setupSvgDefs() {
      if (props.svg.querySelector("defs#f3CardDef")) return;
      const card_dim = props.card_dim;
      props.svg.insertAdjacentHTML(
        "afterbegin",
        `
        <defs id="f3CardDef">
          <linearGradient id="fadeGrad">
            <stop offset="0.9" stop-color="white" stop-opacity="0"/>
            <stop offset=".91" stop-color="white" stop-opacity=".5"/>
            <stop offset="1" stop-color="white" stop-opacity="1"/>
          </linearGradient>
          <mask id="fade" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="url(#fadeGrad)"/></mask>
          <clipPath id="card_clip"><path d="${curvedRectPath(
            { w: card_dim.w, h: card_dim.h },
            5
          )}"></clipPath>
          <clipPath id="card_text_clip"><rect width="${
            card_dim.w - card_dim.text_x - 10
          }" height="${card_dim.h - 10}"></rect></clipPath>
          <clipPath id="card_image_clip"><path d="M0,0 Q 0,0 0,0 H${
            card_dim.img_w
          } V${card_dim.img_h} H0 Q 0,${card_dim.img_h} 0,${
          card_dim.img_h
        } z"></clipPath>
          <clipPath id="card_image_clip_curved"><path d="${curvedRectPath(
            { w: card_dim.img_w, h: card_dim.img_h },
            5,
            ["rx", "ry"]
          )}"></clipPath>
        </defs>
      `
      );

      function curvedRectPath(dim, curve, no_curve_corners) {
        const { w, h } = dim,
          c = curve,
          ncc = no_curve_corners || [],
          ncc_check = (corner) => ncc.includes(corner),
          lx = ncc_check("lx") ? `M0,0` : `M0,${c} Q 0,0 5,0`,
          rx = ncc_check("rx") ? `H${w}` : `H${w - c} Q ${w},0 ${w},5`,
          ry = ncc_check("ry")
            ? `V${h}`
            : `V${h - c} Q ${w},${h} ${w - c},${h}`,
          ly = ncc_check("ly") ? `H0` : `H${c} Q 0,${h} 0,${h - c}`;

        return `${lx} ${rx} ${ry} ${ly} z`;
      }
    }

    function setupProps(props) {
      const default_props = {
        mini_tree: true,
        link_break: true,
        card_dim: {
          w: 220,
          h: 70,
          text_x: 75,
          text_y: 15,
          img_w: 60,
          img_h: 60,
          img_x: 5,
          img_y: 5,
        },
      };
      if (!props) props = {};
      for (const k in default_props) {
        if (typeof props[k] === "undefined") props[k] = default_props[k];
      }
      return props;
    }
  }

  function d3AnimationView({ store, cont, Card: Card$1 }) {
    const svg = createSvg();
    setupSvg(svg, store.state.zoom_polite);

    return { update: updateView, svg, setCard: (card) => (Card$1 = card) };

    function updateView(props) {
      if (!props) props = {};
      const tree = store.state.tree,
        view = d3.select(svg).select(".view"),
        tree_position = props.tree_position || "fit",
        transition_time = props.hasOwnProperty("transition_time")
          ? props.transition_time
          : 2000;

      updateCards();
      updateLinks("primary");
      updateLinks("secondary");

      if (props.initial)
        treeFit({
          svg,
          svg_dim: svg.getBoundingClientRect(),
          tree_dim: tree.dim,
          transition_time: 0,
        });
      else if (tree_position === "fit")
        treeFit({
          svg,
          svg_dim: svg.getBoundingClientRect(),
          tree_dim: tree.dim,
          transition_time,
        });
      else if (tree_position === "main_to_middle")
        mainToMiddle({
          datum: tree.data[0],
          svg,
          svg_dim: svg.getBoundingClientRect(),
          scale: props.scale,
          transition_time,
        });
      else;

      return true;

      function updateLinks(linkType = "primary") {
        const linkStyles = {
          primary: { color: "#f45a28", class: "primary" },
          secondary: { color: "#4287f5", class: "secondary" },
        };

        const style = linkStyles[linkType];
        if (!style) return console.warn(`Invalid linkType: ${linkType}`);

        // Generate links data based on tree data
        const links_data = tree.data.reduce(
          (acc, d) => acc.concat(createLinks({ d, tree: tree.data, linkType })),
          []
        );

        // Ensure each link type has its own container
        let linkContainer = view.select(`.links_view.${style.class}`);
        if (linkContainer.empty()) {
          linkContainer = view
            .append("g")
            .attr("class", `links_view ${style.class}`);
        }

        const link = linkContainer
          .selectAll(`path.link.${style.class}`)
          .data(links_data, (d) => d.id);

        link.exit().remove();

        // Enter phase: Create new links with initial state (invisible)
        const linkEnter = link
          .enter()
          .append("path")
          .attr("class", `link ${style.class}`)
          .attr("fill", "none")
          .style("opacity", 0)
          .attr("stroke", style.color)
          .attr("d", (d) => createPath(d, true))
          .attr("stroke-dasharray", (d) =>
            d.lineStyle.isDashed ? "4, 4" : "none"
          )
          .attr("stroke-linecap", "round");

        // Merge: Transition existing and new paths to final state
        link
          .merge(linkEnter)
          .sort((a, b) => (a.lineStyle.zIndex || 0) - (b.lineStyle.zIndex || 0))
          .transition("path")
          .duration(transition_time)
          .delay((d, i) => calculateDelay(d, i))
          .attr("d", (d) => createPath(d))
          .style("opacity", 1)
          .attr("stroke-width", (d) => d.lineStyle.thickness)
          .attr("stroke-opacity", (d) => (d.lineStyle.blur ? 0.5 : 1))
          .attr("filter", (d) => (d.lineStyle.blur ? "url(#blur-effect)" : ""))
          .attr("stroke-dasharray", (d) =>
            d.lineStyle.isDashed ? "4, 4" : "none"
          )
          .attr("stroke", (d) => d.lineStyle.color);
      }

      function updateCards() {
        const card = view
            .select(".cards_view")
            .selectAll("g.card_cont")
            .data(tree?.data, (d) => d?.data?.id),
          card_exit = card.exit(),
          card_enter = card.enter().append("g").attr("class", "card_cont"),
          card_update = card_enter.merge(card);

        card_exit.each((d) => calculateEnterAndExitPositions(d, false, true));
        card_enter.each((d) => calculateEnterAndExitPositions(d, true, false));

        card_exit.each(cardExit);
        card.each(cardUpdateNoEnter);
        card_enter.each(cardEnter);
        card_update.each(cardUpdate);

        function cardEnter(d) {
          const x = d._x !== undefined ? d._x : 0;
          const y = d._y !== undefined ? d._y : 0;

          d3.select(this)
            .attr("transform", `translate(${x}, ${y})`)
            .style("opacity", 0)
            .node()
            .appendChild(CardElement(this, d));
        }

        function cardUpdateNoEnter(d) {}

        function cardUpdate(d) {
          this.innerHTML = "";
          this.appendChild(CardElement(this, d));
          const delay = calculateDelay(d);
          d3.select(this)
            .transition()
            .duration(transition_time)
            .delay(delay)
            .attr("transform", `translate(${d.x}, ${d.y})`)
            .style("opacity", 1);
        }

        function cardExit(d) {
          const g = d3.select(this);
          g.transition()
            .duration(transition_time)
            .style("opacity", 0)
            .attr("transform", `translate(${d._x}, ${d._y})`)
            .on("end", () => g.remove());
        }

        function CardElement(node, d) {
          if (Card$1) return Card$1({ node, d });
          else return Card({ store, svg })({ node, d });
        }
      }

      function calculateDelay(d) {
        if (!props.initial) return 0;
        const delay_level = 800,
          ancestry_levels = Math.max(
            ...tree.data.map((d) => (d.is_ancestry ? d.depth : 0))
          );
        let delay = d.depth * delay_level;
        if ((d.depth !== 0 || !!d.spouse) && !d.is_ancestry) {
          delay += ancestry_levels * delay_level; // after ancestry
          if (d.spouse) delay += delay_level; // spouse after bloodline
          delay += d.depth * delay_level; // double the delay for each level because of additional spouse delay
        }
        return delay;
      }
    }

    function createSvg() {
      const svg_dim = cont.getBoundingClientRect();
      const svg_html = `
        <svg class="main_svg" width="${svg_dim.width}" height="${
        svg_dim.height
      }">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#F15A24;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#39B54A;stop-opacity:1" />
            </linearGradient>
            <clipPath id="circleClip">
              <circle cx="35" cy="35" r="30" />
            </clipPath>
          </defs>
          <rect width="${svg_dim.width}" height="${
        svg_dim.height
      }" fill="transparent" fill="url(#grad1)" />
          <g class="view">
            <g class="links_view primary"></g>
            <g class="links_view secondary"></g>
            <g class="cards_view"></g>
          </g>
          <g style="transform: translate(100%, 100%)">
            <g class="fit_screen_icon cursor-pointer" style="transform: translate(-50px, -50px); display: none">
              <rect width="27" height="27" stroke-dasharray="${
                27 / 2
              }" stroke-dashoffset="${27 / 4}" 
                style="stroke:#fff;stroke-width:4px;fill:transparent;"/>
              <circle r="5" cx="${27 / 2}" cy="${
        27 / 2
      }" style="fill:#fff" />          
            </g>
          </g>
        </svg>
      `;

      const fake_cont = document.createElement("div");
      fake_cont.innerHTML = svg_html;
      const svg = fake_cont.firstElementChild;
      cont.innerHTML = "";
      cont.appendChild(svg);

      return svg;
    }
  }

  function createStore(initial_state) {
    let onUpdate;
    const state = initial_state,
      update = {
        tree: (props) => {
          state.tree = calcTree();
          if (onUpdate) onUpdate(props);
        },
        mainId: (main_id) => (state.main_id = main_id),
        data: (data) => (state.data = data),
      },
      getData = () => state.data,
      getTree = () => state.tree,
      setOnUpdate = (f) => (onUpdate = f),
      methods = {};

    return { state, update, getData, getTree, setOnUpdate, methods };

    function calcTree() {
      return CalculateTree({
        data_stash: state.data,
        main_id: state.main_id,
        node_separation: state.node_separation,
        level_separation: state.level_separation,
      });
    }
  }

  function AddRelative({ store, cont, card_dim, cardEditForm, labels }) {
    return function ({ d, scale }) {
      const transition_time = 1000;

      if (!scale && window.innerWidth < 650) scale = window.innerWidth / 650;
      toggleAllRels(store.getTree().data, false);
      store.update.mainId(d.data.id);
      store.update.tree({
        tree_position: "main_to_middle",
        transition_time,
        scale,
      });
      const props = {
        store,
        data_stash: store.getData(),
        cont,
        datum: d.data,
        transition_time,
        scale,
        card_dim,
        cardEditForm,
        cardAddform,
        memberInfo,
        labels,
      };
      AddRelativeTree(props);
    };
  }

  var handlers = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    moveToAddToAdded: moveToAddToAdded,
    removeToAdd: removeToAdd,
    deletePerson: deletePerson,
    manualZoom: manualZoom,
    isAllRelativeDisplayed: isAllRelativeDisplayed,
    generateUUID: generateUUID,
    cardChangeMain: cardChangeMain,
    cardEdit: cardEdit,
    cardShowHideRels: cardShowHideRels,
    handleRelsOfNewDatum: handleRelsOfNewDatum,
    createNewPerson: createNewPerson,
    createNewPersonWithGenderFromRel: createNewPersonWithGenderFromRel,
    addNewPerson: addNewPerson,
    createTreeDataWithMainNode: createTreeDataWithMainNode,
    addNewPersonAndHandleRels: addNewPersonAndHandleRels,
    checkIfRelativesConnectedWithoutPerson:
      checkIfRelativesConnectedWithoutPerson,
    AddRelative: AddRelative,
  });

  var elements = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    CardBody: CardBody,
    CardBodyAddNew: CardBodyAddNew,
    CardBodyOutline: CardBodyOutline,
    PencilIcon: PencilIcon,
    InfoIcon: InfoIcon,
    ChatIcon: ChatIcon,
    HideIcon: HideIcon,
    MiniTree: MiniTree,
    PlusIcon: PlusIcon,
    LinkBreakIcon: LinkBreakIcon,
    LinkBreakIconWrapper: LinkBreakIconWrapper,
    CardImage: CardImage,
    Card: Card,
  });

  var index = {
    CalculateTree,
    createStore,
    d3AnimationView,
    handlers,
    elements,
  };

  return index;
});
