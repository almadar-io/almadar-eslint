"use strict";

/**
 * Check if a file path is a template file (*Template.tsx).
 */
function isTemplateFile(filename) {
  return /Template\.(tsx|jsx)$/.test(filename);
}

/**
 * Check if a file is inside an atoms/ or molecules/ directory
 * (these are allowed to use raw DOM elements).
 */
function isAtomOrMolecule(filename) {
  return /\/atoms\//.test(filename) || /\/molecules\//.test(filename);
}

/**
 * Check if a file is inside an organisms/ directory.
 */
function isOrganism(filename) {
  return /\/organisms\//.test(filename);
}

/**
 * Check if a file is a Storybook story.
 */
function isStoryFile(filename) {
  return /\.stories\.(tsx|jsx|ts|js)$/.test(filename);
}

/**
 * HTML elements that should be replaced with @almadar/ui components.
 */
const BLOCKED_HTML_ELEMENTS = new Set([
  "div", "span", "section", "main", "article", "aside", "nav",
  "header", "footer", "p", "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "label", "input", "button", "textarea",
  "select", "table", "tr", "td", "th", "thead", "tbody", "tfoot",
  "form", "img", "a",
]);

/**
 * HTML elements that are always allowed (media, SVG, canvas).
 */
const ALLOWED_HTML_ELEMENTS = new Set([
  "svg", "path", "circle", "rect", "g", "line", "polygon", "polyline",
  "text", "tspan", "defs", "clipPath", "mask", "use", "symbol",
  "linearGradient", "radialGradient", "stop", "filter", "feGaussianBlur",
  "canvas", "video", "audio", "source", "track", "iframe",
  "br", "hr", "wbr",
]);

/**
 * React hooks that templates must never use.
 */
const BANNED_TEMPLATE_HOOKS = new Set([
  "useState", "useEffect", "useMemo", "useCallback", "useRef",
  "useReducer", "useContext", "useLayoutEffect", "useImperativeHandle",
  "useDebugValue", "useDeferredValue", "useTransition", "useId",
  "useSyncExternalStore", "useInsertionEffect",
  "useAssets", "useAssetsOptional", "useEntityData", "useEntityList",
  "useEntityMutations", "useUISlots", "useUIEvents",
]);

/**
 * Hook that gets a warning (not error) in templates.
 */
const WARNED_TEMPLATE_HOOKS = new Set([
  "useEventBus",
]);

/**
 * Generated code paths that should never be imported from.
 */
const GENERATED_PATHS = [
  /projects\/[^/]+\/app\//,
  /orbital-rust\/test-output\//,
];

/**
 * Generated code paths that should never be committed.
 */
const GENERATED_COMMIT_PATHS = [
  "projects/*/app/",
  "orbital-rust/test-output/",
  "apps/builder/packages/client/design-system/",
];

module.exports = {
  isTemplateFile,
  isAtomOrMolecule,
  isOrganism,
  isStoryFile,
  BLOCKED_HTML_ELEMENTS,
  ALLOWED_HTML_ELEMENTS,
  BANNED_TEMPLATE_HOOKS,
  WARNED_TEMPLATE_HOOKS,
  GENERATED_PATHS,
  GENERATED_COMMIT_PATHS,
};
