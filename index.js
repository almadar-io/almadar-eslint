"use strict";

const noRawDomElements = require("./rules/no-raw-dom-elements");
const templateNoHooks = require("./rules/template-no-hooks");
const templateNoCallbacks = require("./rules/template-no-callbacks");
const templateNoLocalVariables = require("./rules/template-no-local-variables");
const templateNoIteration = require("./rules/template-no-iteration");
const templateSerializableProps = require("./rules/template-serializable-props");
const noTypeProp = require("./rules/no-type-prop");
const noAsAny = require("./rules/no-as-any");
const noImportGenerated = require("./rules/no-import-generated");
const requireEventBus = require("./rules/require-event-bus");
const requireDisplayName = require("./rules/require-display-name");
const requireClosedCircuitProps = require("./rules/require-closed-circuit-props");
const requireStories = require("./rules/require-stories");
const eventNamingConvention = require("./rules/event-naming-convention");
const templateExtendsBase = require("./rules/template-extends-base");
const requireTranslate = require("./rules/require-translate");
const organismNoDataState = require("./rules/organism-no-data-state");
const organismNoAutoFetch = require("./rules/organism-no-auto-fetch");
const organismNoCallbackProps = require("./rules/organism-no-callback-props");
const organismExtendsEntityDisplay = require("./rules/organism-extends-entity-display");
const organismRenderingStateOnly = require("./rules/organism-rendering-state-only");

// Service rules
const serviceLazySingleton = require("./rules/service-lazy-singleton");
const serviceSingletonResettable = require("./rules/service-singleton-resettable");
const serviceNoModuleSideEffects = require("./rules/service-no-module-side-effects");
const serviceEventbusSingleton = require("./rules/service-eventbus-singleton");
const serviceEventNameScreaming = require("./rules/service-event-name-screaming");
const serviceIntegrationExtendsBase = require("./rules/service-integration-extends-base");
const serviceStoreIsolation = require("./rules/service-store-isolation");

const plugin = {
  meta: {
    name: "@almadar/eslint-plugin",
    version: "2.1.0",
  },

  rules: {
    "no-raw-dom-elements": noRawDomElements,
    "template-no-hooks": templateNoHooks,
    "template-no-callbacks": templateNoCallbacks,
    "template-no-local-variables": templateNoLocalVariables,
    "template-no-iteration": templateNoIteration,
    "template-serializable-props": templateSerializableProps,
    "no-type-prop": noTypeProp,
    "no-as-any": noAsAny,
    "no-import-generated": noImportGenerated,
    "require-event-bus": requireEventBus,
    "require-display-name": requireDisplayName,
    "require-closed-circuit-props": requireClosedCircuitProps,
    "require-stories": requireStories,
    "event-naming-convention": eventNamingConvention,
    "template-extends-base": templateExtendsBase,
    "require-translate": requireTranslate,
    "organism-no-data-state": organismNoDataState,
    "organism-no-auto-fetch": organismNoAutoFetch,
    "organism-no-callback-props": organismNoCallbackProps,
    "organism-extends-entity-display": organismExtendsEntityDisplay,
    "organism-rendering-state-only": organismRenderingStateOnly,

    // Service rules
    "service-lazy-singleton": serviceLazySingleton,
    "service-singleton-resettable": serviceSingletonResettable,
    "service-no-module-side-effects": serviceNoModuleSideEffects,
    "service-eventbus-singleton": serviceEventbusSingleton,
    "service-event-name-screaming": serviceEventNameScreaming,
    "service-integration-extends-base": serviceIntegrationExtendsBase,
    "service-store-isolation": serviceStoreIsolation,
  },

  configs: {},
};

// Recommended config — all rules at their intended severity
plugin.configs.recommended = {
  plugins: {
    almadar: plugin,
  },
  rules: {
    // Error-level — breaks the pipeline or violates hard rules
    "almadar/no-raw-dom-elements": "error",
    "almadar/template-no-hooks": "error",
    "almadar/template-no-callbacks": "error",
    "almadar/template-no-local-variables": "error",
    "almadar/template-no-iteration": "error",
    "almadar/template-serializable-props": "error",
    "almadar/no-type-prop": "error",
    "almadar/no-as-any": "error",
    "almadar/no-import-generated": "error",

    // Warn-level — conventions that should be followed
    "almadar/require-event-bus": "warn",
    "almadar/require-display-name": "warn",
    "almadar/require-closed-circuit-props": "warn",
    "almadar/require-stories": "warn",
    "almadar/event-naming-convention": "warn",
    "almadar/template-extends-base": "warn",
    "almadar/require-translate": "warn",

    // Organism rules — enforce dumb organism pattern
    "almadar/organism-no-data-state": "error",
    "almadar/organism-no-auto-fetch": "error",
    "almadar/organism-no-callback-props": "error",
    "almadar/organism-extends-entity-display": "error",
    "almadar/organism-rendering-state-only": "warn",
  },
};

// Strict config — everything as error
plugin.configs.strict = {
  plugins: {
    almadar: plugin,
  },
  rules: Object.fromEntries(
    Object.keys(plugin.rules).map((name) => [`almadar/${name}`, "error"])
  ),
};

// Templates-only config — just the template rules (for CI on design-system dirs)
plugin.configs.templates = {
  plugins: {
    almadar: plugin,
  },
  rules: {
    "almadar/template-no-hooks": "error",
    "almadar/template-no-callbacks": "error",
    "almadar/template-no-local-variables": "error",
    "almadar/template-no-iteration": "error",
    "almadar/template-serializable-props": "error",
    "almadar/template-extends-base": "error",
  },
};

// Organisms-only config — enforce dumb organism pattern
plugin.configs.organisms = {
  plugins: { almadar: plugin },
  rules: {
    "almadar/organism-no-data-state": "error",
    "almadar/organism-no-auto-fetch": "error",
    "almadar/organism-no-callback-props": "error",
    "almadar/organism-extends-entity-display": "error",
    "almadar/organism-rendering-state-only": "warn",
    "almadar/require-event-bus": "error",
    "almadar/require-closed-circuit-props": "error",
  },
};

// Services config — service package structure rules
plugin.configs.services = {
  plugins: { almadar: plugin },
  rules: {
    "almadar/service-lazy-singleton": "error",
    "almadar/service-singleton-resettable": "error",
    "almadar/service-no-module-side-effects": "error",
    "almadar/service-eventbus-singleton": "error",
    "almadar/service-event-name-screaming": "error",
    "almadar/service-integration-extends-base": "error",
    "almadar/service-store-isolation": "error",
  },
};

// Services strict config — all service rules as error (same for now, diverges as warn-level rules are added)
plugin.configs["services-strict"] = {
  plugins: { almadar: plugin },
  rules: {
    "almadar/service-lazy-singleton": "error",
    "almadar/service-singleton-resettable": "error",
    "almadar/service-no-module-side-effects": "error",
    "almadar/service-eventbus-singleton": "error",
    "almadar/service-event-name-screaming": "error",
    "almadar/service-integration-extends-base": "error",
    "almadar/service-store-isolation": "error",
  },
};

module.exports = plugin;
