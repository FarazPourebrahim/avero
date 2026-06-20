/**
 * Shared helpers for rules that inspect string content (class lists, style values).
 * Module specifiers are skipped so import paths never trigger class-based rules.
 */

function isModuleSpecifier(node) {
  const parent = node.parent;
  if (!parent) return false;
  return (
    ((parent.type === "ImportDeclaration" ||
      parent.type === "ExportNamedDeclaration" ||
      parent.type === "ExportAllDeclaration") &&
      parent.source === node) ||
    (parent.type === "ImportExpression" && parent.source === node) ||
    parent.type === "TSExternalModuleReference" ||
    parent.type === "TSImportType"
  );
}

/**
 * Calls `check(text, node)` for every string literal and template chunk in the file.
 */
export function createStringVisitor(check) {
  return {
    Literal(node) {
      if (typeof node.value !== "string" || isModuleSpecifier(node)) return;
      check(node.value, node);
    },
    TemplateElement(node) {
      check(node.value.cooked ?? node.value.raw, node);
    },
  };
}
