import { Heading } from "@tiptap/extension-heading";
import { Plugin } from "prosemirror-state";
import { v4 as uuidv4 } from "uuid";

export const HeadingWithId = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("id"),
        renderHTML: (attributes) => {
          if (!attributes.id) return {};
          return { id: attributes.id };
        }
      }
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        appendTransaction: (transactions, oldState, newState) => {
          const tr = newState.tr;
          let modified = false;

          newState.doc.descendants((node, pos) => {
            if (node.type.name === this.name && !node.attrs.id) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                id: uuidv4()
              });
              modified = true;
            }
          });

          return modified ? tr : null;
        }
      })
    ];
  }
});
