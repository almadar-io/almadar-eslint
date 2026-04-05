"use strict";

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow Record<string, unknown>, Record<string, any>, and 'as unknown as' double casts. Use @almadar/core types instead.",
      category: "Almadar Architecture",
    },
    messages: {
      noRecordStringUnknown:
        "Use a typed interface from @almadar/core instead of Record<string, unknown>. Common replacements: OrbitalSchema, Entity, Trait, Field, PatternConfig, Effect, Transition, PayloadField.",
      noRecordStringAny:
        "Record<string, any> is never acceptable. Use Record<string, unknown> at minimum, or a proper @almadar/core type.",
      noDoubleUnknownCast:
        "Avoid 'as unknown as' double casts. Use a type guard, define a proper interface, or extend @almadar/core types.",
    },
    schema: [],
  },

  create(context) {
    return {
      // Catch: Record<string, unknown> and Record<string, any> in type annotations
      TSTypeReference(node) {
        if (
          node.typeName &&
          node.typeName.type === "Identifier" &&
          node.typeName.name === "Record" &&
          node.typeArguments &&
          node.typeArguments.params &&
          node.typeArguments.params.length === 2
        ) {
          const [keyType, valueType] = node.typeArguments.params;

          // Check key is 'string'
          if (keyType.type !== "TSStringKeyword") return;

          // Record<string, any>
          if (valueType.type === "TSAnyKeyword") {
            context.report({ node, messageId: "noRecordStringAny" });
            return;
          }

          // Record<string, unknown>
          if (valueType.type === "TSUnknownKeyword") {
            context.report({ node, messageId: "noRecordStringUnknown" });
          }
        }
      },

      // Catch: as unknown as X (double cast)
      TSAsExpression(node) {
        if (
          node.typeAnnotation &&
          node.typeAnnotation.type === "TSUnknownKeyword" &&
          node.parent &&
          node.parent.type === "TSAsExpression"
        ) {
          context.report({ node: node.parent, messageId: "noDoubleUnknownCast" });
        }
      },
    };
  },
};
