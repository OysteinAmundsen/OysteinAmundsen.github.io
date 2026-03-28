import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  It,
  a,
  c,
  f,
  i,
  s,
  w
} from "./chunk-TZYRBE7Q.js";
import {
  FormGroup
} from "./chunk-TLI7X7KK.js";
import "./chunk-FEHIYCXN.js";
import "./chunk-WMCIWDJY.js";
import {
  ApplicationRef,
  ContentChild,
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  Injectable,
  InjectionToken,
  Input,
  Output,
  TemplateRef,
  ViewContainerRef,
  afterNextRender,
  assertInInjectionContext,
  computed,
  contentChild,
  createComponent,
  effect,
  forwardRef,
  inject,
  input,
  makeEnvironmentProviders,
  output,
  require_operators,
  setClassMetadata,
  signal,
  ɵɵInheritDefinitionFeature,
  ɵɵcontentQuerySignal,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵgetInheritedFactory,
  ɵɵqueryAdvance
} from "./chunk-TIPPOAWF.js";
import {
  require_cjs
} from "./chunk-O5J3CNTX.js";
import {
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-6DU2HRTW.js";

// node_modules/@angular/core/fesm2022/rxjs-interop.mjs
var import_rxjs = __toESM(require_cjs(), 1);
var import_operators = __toESM(require_operators(), 1);
function takeUntilDestroyed(destroyRef) {
  if (!destroyRef) {
    ngDevMode && assertInInjectionContext(takeUntilDestroyed);
    destroyRef = inject(DestroyRef);
  }
  const destroyed$ = new import_rxjs.Observable((subscriber) => {
    if (destroyRef.destroyed) {
      subscriber.next();
      return;
    }
    const unregisterFn = destroyRef.onDestroy(subscriber.next.bind(subscriber));
    return unregisterFn;
  });
  return (source) => {
    return source.pipe((0, import_operators.takeUntil)(destroyed$));
  };
}

// node_modules/@toolbox-web/grid-angular/fesm2022/toolbox-web-grid-angular.mjs
var import_operators2 = __toESM(require_operators(), 1);
function isComponentClass(value) {
  if (typeof value !== "function" || value.prototype === void 0) {
    return false;
  }
  if (Object.prototype.hasOwnProperty.call(value, "ɵcmp") || Object.prototype.hasOwnProperty.call(value, "ɵfac")) {
    return true;
  }
  const fnString = Function.prototype.toString.call(value);
  return fnString.startsWith("class ") || fnString.startsWith("class{");
}
var editorTemplateRegistry = /* @__PURE__ */ new Map();
function getEditorTemplate(element) {
  return editorTemplateRegistry.get(element);
}
var GridColumnEditor = class _GridColumnEditor {
  elementRef = inject(ElementRef);
  /**
   * Query for the ng-template content child.
   */
  template = contentChild(TemplateRef, ...ngDevMode ? [{
    debugName: "template"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** Effect that triggers when the template is available */
  onTemplateReceived = effect(() => {
    const template = this.template();
    if (template) {
      editorTemplateRegistry.set(this.elementRef.nativeElement, template);
    }
  }, ...ngDevMode ? [{
    debugName: "onTemplateReceived"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Static type guard for template context.
   * Enables type inference in templates.
   */
  static ngTemplateContextGuard(dir, ctx) {
    return true;
  }
  static ɵfac = function GridColumnEditor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridColumnEditor)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridColumnEditor,
    selectors: [["tbw-grid-column-editor"]],
    contentQueries: function GridColumnEditor_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuerySignal(dirIndex, ctx.template, TemplateRef, 5);
      }
      if (rf & 2) {
        ɵɵqueryAdvance();
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridColumnEditor, [{
    type: Directive,
    args: [{
      selector: "tbw-grid-column-editor"
    }]
  }], null, {
    template: [{
      type: ContentChild,
      args: [forwardRef(() => TemplateRef), {
        isSignal: true
      }]
    }]
  });
})();
var templateRegistry = /* @__PURE__ */ new Map();
function getViewTemplate(element) {
  return templateRegistry.get(element);
}
var GridColumnView = class _GridColumnView {
  elementRef = inject(ElementRef);
  /**
   * Query for the ng-template content child.
   */
  template = contentChild(TemplateRef, ...ngDevMode ? [{
    debugName: "template"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** Effect that triggers when the template is available */
  onTemplateReceived = effect(() => {
    const template = this.template();
    if (template) {
      templateRegistry.set(this.elementRef.nativeElement, template);
    }
  }, ...ngDevMode ? [{
    debugName: "onTemplateReceived"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Static type guard for template context.
   * Enables type inference in templates.
   */
  static ngTemplateContextGuard(dir, ctx) {
    return true;
  }
  static ɵfac = function GridColumnView_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridColumnView)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridColumnView,
    selectors: [["tbw-grid-column-view"]],
    contentQueries: function GridColumnView_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuerySignal(dirIndex, ctx.template, TemplateRef, 5);
      }
      if (rf & 2) {
        ɵɵqueryAdvance();
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridColumnView, [{
    type: Directive,
    args: [{
      selector: "tbw-grid-column-view"
    }]
  }], null, {
    template: [{
      type: ContentChild,
      args: [forwardRef(() => TemplateRef), {
        isSignal: true
      }]
    }]
  });
})();
var detailTemplateRegistry = /* @__PURE__ */ new Map();
function getDetailTemplate(gridElement) {
  const detailElement = gridElement.querySelector("tbw-grid-detail");
  if (detailElement) {
    return detailTemplateRegistry.get(detailElement);
  }
  return void 0;
}
var GridDetailView = class _GridDetailView {
  elementRef = inject(ElementRef);
  /** Whether to show the expand/collapse column. Default: true */
  showExpandColumn = input(true, ...ngDevMode ? [{
    debugName: "showExpandColumn"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** Animation style for expand/collapse. Default: 'slide' */
  animation = input("slide", ...ngDevMode ? [{
    debugName: "animation"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Query for the ng-template content child.
   */
  template = contentChild(TemplateRef, ...ngDevMode ? [{
    debugName: "template"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** Effect that triggers when the template is available */
  onTemplateReceived = effect(() => {
    const template = this.template();
    if (template) {
      detailTemplateRegistry.set(this.elementRef.nativeElement, template);
    }
  }, ...ngDevMode ? [{
    debugName: "onTemplateReceived"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Static type guard for template context.
   * Enables type inference in templates.
   */
  static ngTemplateContextGuard(dir, ctx) {
    return true;
  }
  static ɵfac = function GridDetailView_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridDetailView)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridDetailView,
    selectors: [["tbw-grid-detail"]],
    contentQueries: function GridDetailView_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuerySignal(dirIndex, ctx.template, TemplateRef, 5);
      }
      if (rf & 2) {
        ɵɵqueryAdvance();
      }
    },
    inputs: {
      showExpandColumn: [1, "showExpandColumn"],
      animation: [1, "animation"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridDetailView, [{
    type: Directive,
    args: [{
      selector: "tbw-grid-detail"
    }]
  }], null, {
    showExpandColumn: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "showExpandColumn",
        required: false
      }]
    }],
    animation: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "animation",
        required: false
      }]
    }],
    template: [{
      type: ContentChild,
      args: [forwardRef(() => TemplateRef), {
        isSignal: true
      }]
    }]
  });
})();
var FORM_ARRAY_CONTEXT$1 = /* @__PURE__ */ Symbol("formArrayContext");
function getFormArrayContext(gridElement) {
  return gridElement[FORM_ARRAY_CONTEXT$1];
}
var GridFormArray = class _GridFormArray {
  destroyRef = inject(DestroyRef);
  elementRef = inject(ElementRef);
  cellCommitUnsub = null;
  cellCancelUnsub = null;
  rowCommitUnsub = null;
  touchListener = null;
  valueChangesSubscription = null;
  statusChangesSubscriptions = [];
  /**
   * The FormArray to bind to the grid.
   */
  formArray = input.required(...ngDevMode ? [{
    debugName: "formArray"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Whether to automatically sync Angular validation state to grid's visual invalid styling.
   *
   * When enabled:
   * - After a cell commit, if the FormControl is invalid, the cell is marked with `setInvalid()`
   * - When a FormControl becomes valid, `clearInvalid()` is called
   * - On `row-commit`, if the row's FormGroup has invalid controls, the commit is prevented
   * - In grid mode: validation state is synced on initial render and updated reactively
   *
   * @default true
   */
  syncValidation = input(true, ...ngDevMode ? [{
    debugName: "syncValidation"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Effect that sets up valueChanges subscription when FormArray changes.
   * This handles both initial binding and when the FormArray reference changes.
   */
  syncFormArrayToGrid = effect(() => {
    const formArray = this.formArray();
    const grid = this.elementRef.nativeElement;
    if (!grid || !formArray) return;
    this.valueChangesSubscription?.unsubscribe();
    this.valueChangesSubscription = formArray.valueChanges.pipe((0, import_operators2.startWith)(formArray.getRawValue()), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.#isEditorFocused(grid)) return;
      grid.rows = formArray.getRawValue();
    });
  }, ...ngDevMode ? [{
    debugName: "syncFormArrayToGrid"
  }] : (
    /* istanbul ignore next */
    []
  ));
  ngOnInit() {
    const grid = this.elementRef.nativeElement;
    if (!grid) return;
    this.#storeFormContext(grid);
    this.cellCommitUnsub = grid.on("cell-commit", (detail) => {
      this.#handleCellCommit(detail);
    });
    this.cellCancelUnsub = grid.on("cell-cancel", (detail) => {
      this.#handleCellCancel(detail);
    });
    this.rowCommitUnsub = grid.on("row-commit", (detail, event) => {
      if (!this.syncValidation()) return;
      this.#handleRowCommit(event, detail);
    });
    this.touchListener = () => {
      this.formArray().markAsTouched();
      if (this.touchListener) {
        grid.removeEventListener("click", this.touchListener);
        this.touchListener = null;
      }
    };
    grid.addEventListener("click", this.touchListener);
    grid.ready?.().then(() => {
      if (this.syncValidation() && this.#isGridMode()) {
        this.#setupReactiveValidation();
        this.#syncAllValidationState();
      }
    });
  }
  ngOnDestroy() {
    const grid = this.elementRef.nativeElement;
    if (!grid) return;
    this.cellCommitUnsub?.();
    this.cellCancelUnsub?.();
    this.rowCommitUnsub?.();
    if (this.touchListener) {
      grid.removeEventListener("click", this.touchListener);
    }
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
    this.statusChangesSubscriptions.forEach((sub) => sub.unsubscribe());
    this.statusChangesSubscriptions = [];
    this.#clearFormContext(grid);
  }
  /**
   * Checks if the EditingPlugin is in 'grid' mode.
   */
  #isGridMode() {
    const grid = this.elementRef.nativeElement;
    if (!grid) return false;
    const editingPlugin = grid.getPluginByName?.("editing");
    return editingPlugin?.config?.mode === "grid";
  }
  /**
   * Checks if a focusable editor element inside the grid currently has focus.
   * Used to skip valueChanges → grid.rows sync while a user is actively editing,
   * preventing editor destruction (which orphans overlay panels like autocomplete/select).
   */
  #isEditorFocused(grid) {
    if (!this.#isGridMode()) return false;
    const active = document.activeElement;
    if (!active) return false;
    return grid.contains(active) && active.closest(".editing") != null;
  }
  /**
   * Sets up reactive validation syncing for grid mode.
   * Subscribes to statusChanges on all FormControls to update validation state in real-time.
   */
  #setupReactiveValidation() {
    const formArray = this.formArray();
    const grid = this.elementRef.nativeElement;
    if (!grid) return;
    this.statusChangesSubscriptions.forEach((sub) => sub.unsubscribe());
    this.statusChangesSubscriptions = [];
    for (let rowIndex = 0; rowIndex < formArray.length; rowIndex++) {
      const rowFormGroup = this.#getRowFormGroup(rowIndex);
      if (!rowFormGroup) continue;
      const rowId = this.#getRowId(grid, rowIndex);
      if (!rowId) continue;
      Object.keys(rowFormGroup.controls).forEach((field) => {
        const control = rowFormGroup.get(field);
        if (!control) return;
        const sub = control.statusChanges.pipe((0, import_operators2.debounceTime)(50), takeUntilDestroyed(this.destroyRef)).subscribe(() => {
          this.#syncControlValidationToGrid(rowId, field, control);
        });
        this.statusChangesSubscriptions.push(sub);
      });
    }
  }
  /**
   * Syncs validation state for all controls in the FormArray.
   * Called once on init in grid mode to show pre-existing validation errors.
   */
  #syncAllValidationState() {
    const formArray = this.formArray();
    const grid = this.elementRef.nativeElement;
    if (!grid) return;
    for (let rowIndex = 0; rowIndex < formArray.length; rowIndex++) {
      const rowFormGroup = this.#getRowFormGroup(rowIndex);
      if (!rowFormGroup) continue;
      const rowId = this.#getRowId(grid, rowIndex);
      if (!rowId) continue;
      Object.keys(rowFormGroup.controls).forEach((field) => {
        const control = rowFormGroup.get(field);
        if (control) {
          this.#syncControlValidationToGrid(rowId, field, control);
        }
      });
    }
  }
  /**
   * Gets the row ID for a given row index using the grid's getRowId method.
   */
  #getRowId(grid, rowIndex) {
    try {
      const rows = grid.rows;
      const row = rows?.[rowIndex];
      if (!row) return void 0;
      return grid.getRowId?.(row);
    } catch {
      return void 0;
    }
  }
  /**
   * Checks if the FormArray contains FormGroups.
   */
  #isFormArrayOfFormGroups() {
    const formArray = this.formArray();
    if (formArray.length === 0) return false;
    return formArray.at(0) instanceof FormGroup;
  }
  /**
   * Gets the FormGroup at a specific row index.
   */
  #getRowFormGroup(rowIndex) {
    const formArray = this.formArray();
    const rowControl = formArray.at(rowIndex);
    return rowControl instanceof FormGroup ? rowControl : void 0;
  }
  /**
   * Stores the FormArrayContext on the grid element.
   */
  #storeFormContext(grid) {
    const getRowFormGroup = (rowIndex) => this.#getRowFormGroup(rowIndex);
    const self = this;
    const context = {
      getRow: (rowIndex) => {
        const formArray = this.formArray();
        const rowControl = formArray.at(rowIndex);
        return rowControl ? rowControl.value : null;
      },
      updateField: (rowIndex, field, value) => {
        const rowFormGroup = getRowFormGroup(rowIndex);
        if (rowFormGroup) {
          const control = rowFormGroup.get(field);
          if (control) {
            control.setValue(value);
            control.markAsDirty();
          }
        }
      },
      getValue: () => {
        return this.formArray().getRawValue();
      },
      get hasFormGroups() {
        return self.#isFormArrayOfFormGroups();
      },
      getControl: (rowIndex, field) => {
        const rowFormGroup = getRowFormGroup(rowIndex);
        if (!rowFormGroup) return void 0;
        return rowFormGroup.get(field) ?? void 0;
      },
      getRowFormGroup,
      isRowValid: (rowIndex) => {
        const rowFormGroup = getRowFormGroup(rowIndex);
        if (!rowFormGroup) return true;
        return rowFormGroup.valid;
      },
      isRowTouched: (rowIndex) => {
        const rowFormGroup = getRowFormGroup(rowIndex);
        if (!rowFormGroup) return false;
        return rowFormGroup.touched;
      },
      isRowDirty: (rowIndex) => {
        const rowFormGroup = getRowFormGroup(rowIndex);
        if (!rowFormGroup) return false;
        return rowFormGroup.dirty;
      },
      getRowErrors: (rowIndex) => {
        const rowFormGroup = getRowFormGroup(rowIndex);
        if (!rowFormGroup) return null;
        const errors = {};
        let hasErrors = false;
        Object.keys(rowFormGroup.controls).forEach((field) => {
          const control = rowFormGroup.get(field);
          if (control?.errors) {
            errors[field] = control.errors;
            hasErrors = true;
          }
        });
        if (rowFormGroup.errors) {
          errors["_group"] = rowFormGroup.errors;
          hasErrors = true;
        }
        return hasErrors ? errors : null;
      }
    };
    grid[FORM_ARRAY_CONTEXT$1] = context;
  }
  /**
   * Clears the FormArrayContext from the grid element.
   */
  #clearFormContext(grid) {
    delete grid[FORM_ARRAY_CONTEXT$1];
  }
  /**
   * Handles cell-commit events by updating the FormControl in the FormGroup.
   */
  #handleCellCommit(detail) {
    const {
      rowIndex,
      field,
      value,
      rowId
    } = detail;
    const rowFormGroup = this.#getRowFormGroup(rowIndex);
    if (rowFormGroup) {
      const control = rowFormGroup.get(field);
      if (control) {
        control.setValue(value);
        control.markAsDirty();
        control.markAsTouched();
        if (this.syncValidation() && rowId) {
          this.#syncControlValidationToGrid(rowId, field, control);
        }
      }
    }
  }
  /**
   * Handles row-commit events - prevents commit if FormGroup has invalid controls.
   */
  #handleRowCommit(event, detail) {
    const {
      rowIndex
    } = detail;
    const rowFormGroup = this.#getRowFormGroup(rowIndex);
    if (rowFormGroup && rowFormGroup.invalid) {
      event.preventDefault();
    }
  }
  /**
   * Handles cell-cancel events (grid mode Escape) — reverts the FormControl
   * to the value it had before the edit session began.
   */
  #handleCellCancel(detail) {
    const {
      rowIndex,
      field,
      previousValue
    } = detail;
    const rowFormGroup = this.#getRowFormGroup(rowIndex);
    if (rowFormGroup) {
      const control = rowFormGroup.get(field);
      if (control) {
        control.setValue(previousValue, {
          emitEvent: false
        });
        control.markAsPristine();
      }
    }
  }
  /**
   * Syncs a FormControl's validation state to the grid's visual invalid styling.
   */
  #syncControlValidationToGrid(rowId, field, control) {
    const grid = this.elementRef.nativeElement;
    if (!grid) return;
    const editingPlugin = grid.getPluginByName?.("editing");
    if (!editingPlugin) return;
    if (control.invalid) {
      const errorMessage = this.#getFirstErrorMessage(control);
      editingPlugin.setInvalid(rowId, field, errorMessage);
    } else {
      editingPlugin.clearInvalid(rowId, field);
    }
  }
  /**
   * Gets a human-readable error message from the first validation error.
   */
  #getFirstErrorMessage(control) {
    const errors = control.errors;
    if (!errors) return "";
    const firstKey = Object.keys(errors)[0];
    const error = errors[firstKey];
    switch (firstKey) {
      case "required":
        return "This field is required";
      case "minlength":
        return `Minimum length is ${error.requiredLength}`;
      case "maxlength":
        return `Maximum length is ${error.requiredLength}`;
      case "min":
        return `Minimum value is ${error.min}`;
      case "max":
        return `Maximum value is ${error.max}`;
      case "email":
        return "Invalid email address";
      case "pattern":
        return "Invalid format";
      default:
        return typeof error === "string" ? error : error?.message ?? `Validation error: ${firstKey}`;
    }
  }
  static ɵfac = function GridFormArray_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridFormArray)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridFormArray,
    selectors: [["tbw-grid", "formArray", ""]],
    inputs: {
      formArray: [1, "formArray"],
      syncValidation: [1, "syncValidation"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridFormArray, [{
    type: Directive,
    args: [{
      selector: "tbw-grid[formArray]"
    }]
  }], null, {
    formArray: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "formArray",
        required: true
      }]
    }],
    syncValidation: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "syncValidation",
        required: false
      }]
    }]
  });
})();
var responsiveCardTemplateRegistry = /* @__PURE__ */ new Map();
function getResponsiveCardTemplate(gridElement) {
  const cardElement = gridElement.querySelector("tbw-grid-responsive-card");
  if (!cardElement) return void 0;
  return responsiveCardTemplateRegistry.get(cardElement);
}
var GridResponsiveCard = class _GridResponsiveCard {
  elementRef = inject(ElementRef);
  /**
   * The ng-template containing the card content.
   */
  template = contentChild(TemplateRef, ...ngDevMode ? [{
    debugName: "template"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Effect that registers the template when it becomes available.
   */
  onTemplateReceived = effect(() => {
    const template = this.template();
    if (template) {
      responsiveCardTemplateRegistry.set(this.elementRef.nativeElement, template);
    }
  }, ...ngDevMode ? [{
    debugName: "onTemplateReceived"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Type guard for template context inference.
   */
  static ngTemplateContextGuard(_directive, context) {
    return true;
  }
  static ɵfac = function GridResponsiveCard_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridResponsiveCard)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridResponsiveCard,
    selectors: [["tbw-grid-responsive-card"]],
    contentQueries: function GridResponsiveCard_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuerySignal(dirIndex, ctx.template, TemplateRef, 5);
      }
      if (rf & 2) {
        ɵɵqueryAdvance();
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridResponsiveCard, [{
    type: Directive,
    args: [{
      selector: "tbw-grid-responsive-card"
    }]
  }], null, {
    template: [{
      type: ContentChild,
      args: [forwardRef(() => TemplateRef), {
        isSignal: true
      }]
    }]
  });
})();
var toolPanelTemplateRegistry = /* @__PURE__ */ new Map();
function getToolPanelTemplate(panelElement) {
  return toolPanelTemplateRegistry.get(panelElement);
}
var GridToolPanel = class _GridToolPanel {
  elementRef = inject(ElementRef);
  /** Unique panel identifier (required) */
  id = input.required(__spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "id"
  } : (
    /* istanbul ignore next */
    {}
  )), {
    alias: "id"
  }));
  /** Panel title shown in accordion header (required) */
  title = input.required(__spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "title"
  } : (
    /* istanbul ignore next */
    {}
  )), {
    alias: "title"
  }));
  /** Icon for accordion section header (emoji or text) */
  icon = input(...ngDevMode ? [void 0, {
    debugName: "icon"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** Tooltip for accordion section header */
  tooltip = input(...ngDevMode ? [void 0, {
    debugName: "tooltip"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** Panel order priority (lower = first, default: 100) */
  order = input(100, ...ngDevMode ? [{
    debugName: "order"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Query for the ng-template content child.
   */
  template = contentChild(TemplateRef, ...ngDevMode ? [{
    debugName: "template"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** Effect that triggers when the template is available */
  onTemplateReceived = effect(() => {
    const template = this.template();
    const element = this.elementRef.nativeElement;
    if (template) {
      element.setAttribute("id", this.id());
      element.setAttribute("title", this.title());
      const icon = this.icon();
      if (icon) element.setAttribute("icon", icon);
      const tooltip = this.tooltip();
      if (tooltip) element.setAttribute("tooltip", tooltip);
      element.setAttribute("order", String(this.order()));
      toolPanelTemplateRegistry.set(element, template);
    }
  }, ...ngDevMode ? [{
    debugName: "onTemplateReceived"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Static type guard for template context.
   * Enables type inference in templates.
   */
  static ngTemplateContextGuard(dir, ctx) {
    return true;
  }
  static ɵfac = function GridToolPanel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridToolPanel)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridToolPanel,
    selectors: [["tbw-grid-tool-panel"]],
    contentQueries: function GridToolPanel_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuerySignal(dirIndex, ctx.template, TemplateRef, 5);
      }
      if (rf & 2) {
        ɵɵqueryAdvance();
      }
    },
    inputs: {
      id: [1, "id"],
      title: [1, "title"],
      icon: [1, "icon"],
      tooltip: [1, "tooltip"],
      order: [1, "order"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridToolPanel, [{
    type: Directive,
    args: [{
      selector: "tbw-grid-tool-panel"
    }]
  }], null, {
    id: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "id",
        required: true
      }]
    }],
    title: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "title",
        required: true
      }]
    }],
    icon: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "icon",
        required: false
      }]
    }],
    tooltip: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "tooltip",
        required: false
      }]
    }],
    order: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "order",
        required: false
      }]
    }],
    template: [{
      type: ContentChild,
      args: [forwardRef(() => TemplateRef), {
        isSignal: true
      }]
    }]
  });
})();
var structuralViewRegistry = /* @__PURE__ */ new Map();
var structuralEditorRegistry = /* @__PURE__ */ new Map();
function getStructuralViewTemplate(columnElement) {
  const template = structuralViewRegistry.get(columnElement);
  if (template) return template;
  const viewEl = columnElement.querySelector("tbw-grid-column-view");
  if (viewEl) {
    return getViewTemplate(viewEl);
  }
  return void 0;
}
function getStructuralEditorTemplate(columnElement) {
  const template = structuralEditorRegistry.get(columnElement);
  if (template) return template;
  const editorEl = columnElement.querySelector("tbw-grid-column-editor");
  if (editorEl) {
    return getEditorTemplate(editorEl);
  }
  return void 0;
}
var TbwRenderer = class _TbwRenderer {
  template = inject(TemplateRef);
  elementRef = inject(ElementRef);
  columnElement = null;
  constructor() {
    effect(() => {
      this.registerTemplate();
    });
  }
  registerTemplate() {
    let parent = this.elementRef.nativeElement?.parentElement;
    while (parent && parent.tagName !== "TBW-GRID-COLUMN") {
      parent = parent.parentElement;
    }
    if (parent) {
      this.columnElement = parent;
      structuralViewRegistry.set(parent, this.template);
    }
  }
  ngOnDestroy() {
    if (this.columnElement) {
      structuralViewRegistry.delete(this.columnElement);
    }
  }
  /**
   * Static type guard for template context.
   * Uses `any` defaults for ergonomic template usage.
   */
  static ngTemplateContextGuard(dir, ctx) {
    return true;
  }
  static ɵfac = function TbwRenderer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TbwRenderer)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _TbwRenderer,
    selectors: [["", "tbwRenderer", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TbwRenderer, [{
    type: Directive,
    args: [{
      selector: "[tbwRenderer]"
    }]
  }], () => [], null);
})();
var TbwEditor = class _TbwEditor {
  template = inject(TemplateRef);
  elementRef = inject(ElementRef);
  columnElement = null;
  constructor() {
    effect(() => {
      this.registerTemplate();
    });
  }
  registerTemplate() {
    let parent = this.elementRef.nativeElement?.parentElement;
    while (parent && parent.tagName !== "TBW-GRID-COLUMN") {
      parent = parent.parentElement;
    }
    if (parent) {
      this.columnElement = parent;
      structuralEditorRegistry.set(parent, this.template);
    }
  }
  ngOnDestroy() {
    if (this.columnElement) {
      structuralEditorRegistry.delete(this.columnElement);
    }
  }
  /**
   * Static type guard for template context.
   * Uses `any` defaults for ergonomic template usage.
   */
  static ngTemplateContextGuard(dir, ctx) {
    return true;
  }
  static ɵfac = function TbwEditor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TbwEditor)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _TbwEditor,
    selectors: [["", "tbwEditor", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TbwEditor, [{
    type: Directive,
    args: [{
      selector: "[tbwEditor]"
    }]
  }], () => [], null);
})();
function subscribeToOutput(instance, outputName, callback) {
  const output2 = instance[outputName];
  if (!output2) return false;
  if (typeof output2.subscribe === "function") {
    output2.subscribe(callback);
    return true;
  }
  return false;
}
function wireEditorCallbacks(hostElement, instance, commit, cancel) {
  let commitHandledByOutput = false;
  let cancelHandledByOutput = false;
  subscribeToOutput(instance, "commit", (value) => {
    commitHandledByOutput = true;
    commit(value);
  });
  subscribeToOutput(instance, "cancel", () => {
    cancelHandledByOutput = true;
    cancel();
  });
  hostElement.addEventListener("commit", (e) => {
    e.stopPropagation();
    if (commitHandledByOutput) {
      commitHandledByOutput = false;
      return;
    }
    const customEvent = e;
    commit(customEvent.detail);
  });
  hostElement.addEventListener("cancel", (e) => {
    e.stopPropagation();
    if (cancelHandledByOutput) {
      cancelHandledByOutput = false;
      return;
    }
    cancel();
  });
}
var GRID_TYPE_DEFAULTS = new InjectionToken("GRID_TYPE_DEFAULTS");
var GridTypeRegistry = class _GridTypeRegistry {
  defaults = /* @__PURE__ */ new Map();
  constructor() {
    const initial = inject(GRID_TYPE_DEFAULTS, {
      optional: true
    });
    if (initial) {
      for (const [type, config] of Object.entries(initial)) {
        this.defaults.set(type, config);
      }
    }
  }
  /**
   * Register type-level defaults for a custom type.
   *
   * @param type - The type name (e.g., 'country', 'currency')
   * @param defaults - Renderer/editor configuration
   */
  register(type, defaults) {
    this.defaults.set(type, defaults);
  }
  /**
   * Get type defaults for a given type.
   */
  get(type) {
    return this.defaults.get(type);
  }
  /**
   * Remove type defaults for a type.
   */
  unregister(type) {
    this.defaults.delete(type);
  }
  /**
   * Check if a type has registered defaults.
   */
  has(type) {
    return this.defaults.has(type);
  }
  /**
   * Get all registered type names.
   */
  getRegisteredTypes() {
    return Array.from(this.defaults.keys());
  }
  /**
   * Convert to TypeDefault for use with grid's typeDefaults.
   * This is used internally by the adapter.
   *
   * @internal
   */
  getAsTypeDefault(type) {
    const config = this.defaults.get(type);
    if (!config) return void 0;
    return {
      editorParams: config.editorParams
      // renderer and editor are handled by the adapter which creates
      // the actual functions that instantiate Angular components
    };
  }
  static ɵfac = function GridTypeRegistry_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridTypeRegistry)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _GridTypeRegistry,
    factory: _GridTypeRegistry.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridTypeRegistry, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function provideGridTypeDefaults(defaults) {
  return makeEnvironmentProviders([{
    provide: GRID_TYPE_DEFAULTS,
    useValue: defaults
  }]);
}
function getAnyViewTemplate(element) {
  const structuralTemplate = getStructuralViewTemplate(element);
  if (structuralTemplate) return structuralTemplate;
  return getViewTemplate(element);
}
function getAnyEditorTemplate(element) {
  const structuralTemplate = getStructuralEditorTemplate(element);
  if (structuralTemplate) return structuralTemplate;
  return getEditorTemplate(element);
}
function syncRootNodes(viewRef, container) {
  const rootNodes = viewRef.rootNodes;
  const children = container.childNodes;
  let needsSync = children.length !== rootNodes.length;
  if (!needsSync) {
    for (let i2 = 0; i2 < rootNodes.length; i2++) {
      if (children[i2] !== rootNodes[i2]) {
        needsSync = true;
        break;
      }
    }
  }
  if (needsSync) {
    container.replaceChildren(...rootNodes);
  }
}
var GridAdapter = class {
  injector;
  appRef;
  viewContainerRef;
  viewRefs = [];
  componentRefs = [];
  /** Editor-specific view refs tracked separately for per-cell cleanup via releaseCell. */
  editorViewRefs = [];
  /** Editor-specific component refs tracked separately for per-cell cleanup via releaseCell. */
  editorComponentRefs = [];
  typeRegistry = null;
  constructor(injector, appRef, viewContainerRef) {
    this.injector = injector;
    this.appRef = appRef;
    this.viewContainerRef = viewContainerRef;
    window.__ANGULAR_GRID_ADAPTER__ = this;
    try {
      this.typeRegistry = this.injector.get(GridTypeRegistry, null);
    } catch {
    }
  }
  /**
   * Processes an Angular grid configuration, converting component class references
   * to actual renderer/editor functions.
   *
   * Call this method on your gridConfig before passing it to the grid.
   *
   * @example
   * ```typescript
   * import { GridAdapter, type GridConfig } from '@toolbox-web/grid-angular';
   *
   * const config: GridConfig<Employee> = {
   *   columns: [
   *     { field: 'status', renderer: StatusBadgeComponent, editor: StatusEditorComponent },
   *   ],
   * };
   *
   * // In component
   * constructor() {
   *   const adapter = inject(GridAdapter); // or create new instance
   *   this.processedConfig = adapter.processGridConfig(config);
   * }
   * ```
   *
   * @param config - Angular grid configuration with possible component class references
   * @returns Processed GridConfig with actual renderer/editor functions
   */
  processGridConfig(config) {
    return this.processConfig(config);
  }
  /**
   * FrameworkAdapter.processConfig implementation.
   * Called automatically by the grid's `set gridConfig` setter.
   */
  processConfig(config) {
    const angularConfig = config;
    const result = __spreadValues({}, angularConfig);
    if (angularConfig.columns) {
      result.columns = angularConfig.columns.map((col) => this.processColumn(col));
    }
    if (angularConfig.typeDefaults) {
      result.typeDefaults = this.processTypeDefaults(angularConfig.typeDefaults);
    }
    if (angularConfig.loadingRenderer && isComponentClass(angularConfig.loadingRenderer)) {
      result.loadingRenderer = this.createComponentLoadingRenderer(angularConfig.loadingRenderer);
    }
    return result;
  }
  /**
   * Processes typeDefaults configuration, converting component class references
   * to actual renderer/editor functions.
   *
   * @param typeDefaults - Angular type defaults with possible component class references
   * @returns Processed TypeDefault record
   */
  processTypeDefaults(typeDefaults) {
    const processed = {};
    for (const [type, config] of Object.entries(typeDefaults)) {
      const processedConfig = __spreadValues({}, config);
      if (config.renderer && isComponentClass(config.renderer)) {
        processedConfig.renderer = this.createComponentRenderer(config.renderer);
      }
      if (config.editor && isComponentClass(config.editor)) {
        processedConfig.editor = this.createComponentEditor(config.editor);
      }
      if (config.filterPanelRenderer && isComponentClass(config.filterPanelRenderer)) {
        processedConfig.filterPanelRenderer = this.createComponentFilterPanelRenderer(config.filterPanelRenderer);
      }
      processed[type] = processedConfig;
    }
    return processed;
  }
  /**
   * Processes a single column configuration, converting component class references
   * to actual renderer/editor functions.
   *
   * @param column - Angular column configuration
   * @returns Processed ColumnConfig
   */
  processColumn(column) {
    const processed = __spreadValues({}, column);
    if (column.renderer && isComponentClass(column.renderer)) {
      processed.renderer = this.createComponentRenderer(column.renderer);
    }
    if (column.editor && isComponentClass(column.editor)) {
      processed.editor = this.createComponentEditor(column.editor);
    }
    if (column.headerRenderer && isComponentClass(column.headerRenderer)) {
      processed.headerRenderer = this.createComponentHeaderRenderer(column.headerRenderer);
    }
    if (column.headerLabelRenderer && isComponentClass(column.headerLabelRenderer)) {
      processed.headerLabelRenderer = this.createComponentHeaderLabelRenderer(column.headerLabelRenderer);
    }
    return processed;
  }
  /**
   * Determines if this adapter can handle the given element.
   * Checks if a template is registered for this element (structural or nested).
   */
  canHandle(element) {
    return getAnyViewTemplate(element) !== void 0 || getAnyEditorTemplate(element) !== void 0;
  }
  /**
   * Creates a view renderer function that creates an embedded view
   * from the registered template and returns its DOM element.
   *
   * Returns undefined if no template is registered for this element,
   * allowing the grid to use its default rendering.
   */
  createRenderer(element) {
    const template = getAnyViewTemplate(element);
    if (!template) {
      return void 0;
    }
    const cellCache = /* @__PURE__ */ new WeakMap();
    return (ctx) => {
      if (ctx.cellEl?.classList.contains("editing")) {
        return null;
      }
      const cellEl = ctx.cellEl;
      if (cellEl) {
        const cached = cellCache.get(cellEl);
        if (cached) {
          cached.viewRef.context.$implicit = ctx.value;
          cached.viewRef.context.value = ctx.value;
          cached.viewRef.context.row = ctx.row;
          cached.viewRef.context.column = ctx.column;
          cached.viewRef.detectChanges();
          syncRootNodes(cached.viewRef, cached.container);
          return cached.container;
        }
      }
      const context = {
        $implicit: ctx.value,
        value: ctx.value,
        row: ctx.row,
        column: ctx.column
      };
      const viewRef = this.viewContainerRef.createEmbeddedView(template, context);
      this.viewRefs.push(viewRef);
      viewRef.detectChanges();
      const container = document.createElement("span");
      container.style.display = "contents";
      syncRootNodes(viewRef, container);
      if (cellEl) {
        cellCache.set(cellEl, {
          viewRef,
          container
        });
      }
      return container;
    };
  }
  /**
   * Creates an editor spec that creates an embedded view.
   *
   * **Auto-wiring**: The adapter automatically listens for `commit` and `cancel`
   * CustomEvents on the rendered component. If the component emits these events,
   * the adapter will call the grid's commit/cancel functions automatically.
   *
   * This means templates can be simplified from:
   * ```html
   * <app-editor *tbwEditor="let value; onCommit as onCommit"
   *   [value]="value" (commit)="onCommit($event)" />
   * ```
   * To just:
   * ```html
   * <app-editor *tbwEditor="let value" [value]="value" />
   * ```
   * As long as the component emits `(commit)` with the new value.
   */
  createEditor(element) {
    const template = getAnyEditorTemplate(element);
    const gridElement = element.closest("tbw-grid");
    if (!template) {
      return void 0;
    }
    return (ctx) => {
      const onCommit = (value) => ctx.commit(value);
      const onCancel = () => ctx.cancel();
      const commitEmitter = new EventEmitter();
      const cancelEmitter = new EventEmitter();
      commitEmitter.subscribe((value) => ctx.commit(value));
      cancelEmitter.subscribe(() => ctx.cancel());
      let control;
      if (gridElement) {
        const formContext = getFormArrayContext(gridElement);
        if (formContext?.hasFormGroups) {
          const gridRows = gridElement.rows;
          if (gridRows) {
            const rowIndex = gridRows.indexOf(ctx.row);
            if (rowIndex >= 0) {
              control = formContext.getControl(rowIndex, ctx.field);
            }
          }
        }
      }
      const context = {
        $implicit: ctx.value,
        value: ctx.value,
        row: ctx.row,
        field: ctx.field,
        column: ctx.column,
        rowId: ctx.rowId ?? "",
        // Preferred: simple callback functions
        onCommit,
        onCancel,
        updateRow: ctx.updateRow,
        onValueChange: ctx.onValueChange,
        // FormControl from FormArray (if available)
        control,
        // Deprecated: EventEmitters (for backwards compatibility)
        commit: commitEmitter,
        cancel: cancelEmitter
      };
      const viewRef = this.viewContainerRef.createEmbeddedView(template, context);
      this.editorViewRefs.push(viewRef);
      viewRef.detectChanges();
      const container = document.createElement("span");
      container.style.display = "contents";
      syncRootNodes(viewRef, container);
      container.addEventListener("commit", (e) => {
        const customEvent = e;
        ctx.commit(customEvent.detail);
      });
      container.addEventListener("cancel", () => {
        ctx.cancel();
      });
      ctx.onValueChange?.((newVal) => {
        context.$implicit = newVal;
        context.value = newVal;
        viewRef.detectChanges();
        syncRootNodes(viewRef, container);
      });
      return container;
    };
  }
  /**
   * Creates a detail renderer function for MasterDetailPlugin.
   * Renders Angular templates for expandable detail rows.
   */
  createDetailRenderer(gridElement) {
    const template = getDetailTemplate(gridElement);
    if (!template) {
      return void 0;
    }
    return (row) => {
      const context = {
        $implicit: row,
        row
      };
      const viewRef = this.viewContainerRef.createEmbeddedView(template, context);
      this.viewRefs.push(viewRef);
      viewRef.detectChanges();
      const container = document.createElement("div");
      viewRef.rootNodes.forEach((node) => container.appendChild(node));
      return container;
    };
  }
  /**
   * Framework adapter hook called by MasterDetailPlugin during attach().
   * Parses the <tbw-grid-detail> element and returns an Angular template-based renderer.
   *
   * This enables MasterDetailPlugin to automatically use Angular templates
   * without manual configuration in the Grid directive.
   */
  parseDetailElement(detailElement) {
    const template = getDetailTemplate(detailElement.closest("tbw-grid"));
    if (!template) {
      return void 0;
    }
    return (row) => {
      const context = {
        $implicit: row,
        row
      };
      const viewRef = this.viewContainerRef.createEmbeddedView(template, context);
      this.viewRefs.push(viewRef);
      viewRef.detectChanges();
      const container = document.createElement("div");
      viewRef.rootNodes.forEach((node) => container.appendChild(node));
      return container;
    };
  }
  /**
   * Creates a responsive card renderer function for ResponsivePlugin.
   * Renders Angular templates for card layout in responsive mode.
   *
   * @param gridElement - The grid element to look up the template for
   * @returns A card renderer function or undefined if no template is found
   */
  createResponsiveCardRenderer(gridElement) {
    const template = getResponsiveCardTemplate(gridElement);
    if (!template) {
      return void 0;
    }
    return (row, rowIndex) => {
      const context = {
        $implicit: row,
        row,
        index: rowIndex
      };
      const viewRef = this.viewContainerRef.createEmbeddedView(template, context);
      this.viewRefs.push(viewRef);
      viewRef.detectChanges();
      const container = document.createElement("div");
      viewRef.rootNodes.forEach((node) => container.appendChild(node));
      return container;
    };
  }
  /**
   * Creates a tool panel renderer from a light DOM element.
   * The renderer creates an Angular template-based panel content.
   */
  createToolPanelRenderer(element) {
    const template = getToolPanelTemplate(element);
    if (!template) {
      return void 0;
    }
    const gridElement = element.closest("tbw-grid");
    return (container) => {
      const context = {
        $implicit: gridElement ?? container,
        grid: gridElement ?? container
      };
      const viewRef = this.viewContainerRef.createEmbeddedView(template, context);
      this.viewRefs.push(viewRef);
      viewRef.detectChanges();
      viewRef.rootNodes.forEach((node) => container.appendChild(node));
      return () => {
        const index = this.viewRefs.indexOf(viewRef);
        if (index > -1) {
          this.viewRefs.splice(index, 1);
        }
        viewRef.destroy();
      };
    };
  }
  /**
   * Gets type-level defaults from the application's GridTypeRegistry.
   *
   * This enables application-wide type defaults configured via `provideGridTypeDefaults()`.
   * The returned TypeDefault contains renderer/editor functions that instantiate
   * Angular components dynamically.
   *
   * @example
   * ```typescript
   * // app.config.ts
   * export const appConfig: ApplicationConfig = {
   *   providers: [
   *     provideGridTypeDefaults({
   *       country: {
   *         renderer: CountryCellComponent,
   *         editor: CountryEditorComponent
   *       }
   *     })
   *   ]
   * };
   *
   * // Any grid with type: 'country' columns will use these components
   * gridConfig = {
   *   columns: [{ field: 'country', type: 'country' }]
   * };
   * ```
   */
  getTypeDefault(type) {
    if (!this.typeRegistry) {
      return void 0;
    }
    const config = this.typeRegistry.get(type);
    if (!config) {
      return void 0;
    }
    const typeDefault = {
      editorParams: config.editorParams
    };
    if (config.renderer) {
      typeDefault.renderer = this.createComponentRenderer(config.renderer);
    }
    if (config.editor) {
      typeDefault.editor = this.createComponentEditor(config.editor);
    }
    if (config.filterPanelRenderer && isComponentClass(config.filterPanelRenderer)) {
      typeDefault.filterPanelRenderer = this.createComponentFilterPanelRenderer(config.filterPanelRenderer);
    } else if (config.filterPanelRenderer) {
      typeDefault.filterPanelRenderer = config.filterPanelRenderer;
    }
    return typeDefault;
  }
  /**
   * Creates and mounts an Angular component dynamically.
   * Shared logic between renderer and editor component creation.
   * @internal
   */
  mountComponent(componentClass, inputs, isEditor = false) {
    const hostElement = document.createElement("span");
    hostElement.style.display = "contents";
    const componentRef = createComponent(componentClass, {
      environmentInjector: this.injector,
      hostElement
    });
    this.setComponentInputs(componentRef, inputs);
    this.appRef.attachView(componentRef.hostView);
    if (isEditor) {
      this.editorComponentRefs.push(componentRef);
    } else {
      this.componentRefs.push(componentRef);
    }
    componentRef.changeDetectorRef.detectChanges();
    return {
      hostElement,
      componentRef
    };
  }
  /**
   * Creates a renderer function from an Angular component class.
   * @internal
   */
  createComponentRenderer(componentClass) {
    const cellCache = /* @__PURE__ */ new WeakMap();
    return (ctx) => {
      const cellEl = ctx.cellEl;
      if (cellEl) {
        const cached = cellCache.get(cellEl);
        if (cached) {
          this.setComponentInputs(cached.componentRef, {
            value: ctx.value,
            row: ctx.row,
            column: ctx.column
          });
          cached.componentRef.changeDetectorRef.detectChanges();
          return cached.hostElement;
        }
      }
      const {
        hostElement,
        componentRef
      } = this.mountComponent(componentClass, {
        value: ctx.value,
        row: ctx.row,
        column: ctx.column
      });
      if (cellEl) {
        cellCache.set(cellEl, {
          componentRef,
          hostElement
        });
      }
      return hostElement;
    };
  }
  /**
   * Creates an editor function from an Angular component class.
   * @internal
   */
  createComponentEditor(componentClass) {
    return (ctx) => {
      const {
        hostElement,
        componentRef
      } = this.mountComponent(componentClass, {
        value: ctx.value,
        row: ctx.row,
        column: ctx.column
      }, true);
      wireEditorCallbacks(hostElement, componentRef.instance, (value) => ctx.commit(value), () => ctx.cancel());
      ctx.onValueChange?.((newVal) => {
        try {
          const instance = componentRef.instance;
          if (typeof instance["onExternalValueChange"] === "function") {
            instance.onExternalValueChange(newVal);
          }
          componentRef.setInput("value", newVal);
          componentRef.changeDetectorRef.detectChanges();
        } catch {
        }
      });
      return hostElement;
    };
  }
  /**
   * Creates a header renderer function from an Angular component class.
   * Mounts the component with full header context (column, value, sortState, etc.).
   * @internal
   */
  createComponentHeaderRenderer(componentClass) {
    return (ctx) => {
      const hostElement = document.createElement("span");
      hostElement.style.display = "contents";
      const componentRef = createComponent(componentClass, {
        environmentInjector: this.injector,
        hostElement
      });
      this.setComponentInputs(componentRef, {
        column: ctx.column,
        value: ctx.value,
        sortState: ctx.sortState,
        filterActive: ctx.filterActive,
        renderSortIcon: ctx.renderSortIcon,
        renderFilterButton: ctx.renderFilterButton
      });
      this.appRef.attachView(componentRef.hostView);
      this.componentRefs.push(componentRef);
      componentRef.changeDetectorRef.detectChanges();
      return hostElement;
    };
  }
  /**
   * Creates a header label renderer function from an Angular component class.
   * Mounts the component with label context (column, value).
   * @internal
   */
  createComponentHeaderLabelRenderer(componentClass) {
    return (ctx) => {
      const hostElement = document.createElement("span");
      hostElement.style.display = "contents";
      const componentRef = createComponent(componentClass, {
        environmentInjector: this.injector,
        hostElement
      });
      this.setComponentInputs(componentRef, {
        column: ctx.column,
        value: ctx.value
      });
      this.appRef.attachView(componentRef.hostView);
      this.componentRefs.push(componentRef);
      componentRef.changeDetectorRef.detectChanges();
      return hostElement;
    };
  }
  /**
   * Creates a group header renderer function from an Angular component class.
   *
   * The component should accept group header inputs (id, label, columns, firstIndex, isImplicit).
   * Returns the host element directly (groupHeaderRenderer returns an element, not void).
   * @internal
   */
  createComponentGroupHeaderRenderer(componentClass) {
    return (params) => {
      const hostElement = document.createElement("span");
      hostElement.style.display = "contents";
      const componentRef = createComponent(componentClass, {
        environmentInjector: this.injector,
        hostElement
      });
      this.setComponentInputs(componentRef, {
        id: params.id,
        label: params.label,
        columns: params.columns,
        firstIndex: params.firstIndex,
        isImplicit: params.isImplicit
      });
      this.appRef.attachView(componentRef.hostView);
      this.componentRefs.push(componentRef);
      componentRef.changeDetectorRef.detectChanges();
      return hostElement;
    };
  }
  /**
   * Processes a GroupingColumnsConfig, converting component class references
   * to actual renderer functions.
   *
   * @param config - Angular grouping columns configuration with possible component class references
   * @returns Processed GroupingColumnsConfig with actual renderer functions
   */
  processGroupingColumnsConfig(config) {
    const processed = __spreadValues({}, config);
    let changed = false;
    if (config.groupHeaderRenderer && isComponentClass(config.groupHeaderRenderer)) {
      processed.groupHeaderRenderer = this.createComponentGroupHeaderRenderer(config.groupHeaderRenderer);
      changed = true;
    }
    if (Array.isArray(config.columnGroups)) {
      const mappedGroups = config.columnGroups.map((def) => {
        if (def.renderer && isComponentClass(def.renderer)) {
          changed = true;
          return __spreadProps(__spreadValues({}, def), {
            renderer: this.createComponentGroupHeaderRenderer(def.renderer)
          });
        }
        return def;
      });
      if (changed) processed.columnGroups = mappedGroups;
    }
    return changed ? processed : config;
  }
  /**
   * Processes a GroupingRowsConfig, converting component class references
   * to actual renderer functions.
   *
   * @param config - Angular grouping rows configuration with possible component class references
   * @returns Processed GroupingRowsConfig with actual renderer functions
   */
  processGroupingRowsConfig(config) {
    if (config.groupRowRenderer && isComponentClass(config.groupRowRenderer)) {
      return __spreadProps(__spreadValues({}, config), {
        groupRowRenderer: this.createComponentGroupRowRenderer(config.groupRowRenderer)
      });
    }
    return config;
  }
  /**
   * Processes a PinnedRowsConfig, converting component class references
   * in `customPanels[].render` to actual renderer functions.
   *
   * @param config - Angular pinned rows configuration with possible component class references
   * @returns Processed PinnedRowsConfig with actual renderer functions
   */
  processPinnedRowsConfig(config) {
    if (!Array.isArray(config.customPanels)) return config;
    const hasComponentRender = config.customPanels.some((panel) => isComponentClass(panel.render));
    if (!hasComponentRender) return config;
    return __spreadProps(__spreadValues({}, config), {
      customPanels: config.customPanels.map((panel) => {
        if (!isComponentClass(panel.render)) return panel;
        return __spreadProps(__spreadValues({}, panel), {
          render: this.createComponentPinnedRowsPanelRenderer(panel.render)
        });
      })
    });
  }
  /**
   * Creates a pinned rows panel renderer function from an Angular component class.
   *
   * The component should accept inputs from PinnedRowsContext (totalRows, filteredRows,
   * selectedRows, columns, rows, grid).
   * @internal
   */
  createComponentPinnedRowsPanelRenderer(componentClass) {
    return (ctx) => {
      const hostElement = document.createElement("span");
      hostElement.style.display = "contents";
      const componentRef = createComponent(componentClass, {
        environmentInjector: this.injector,
        hostElement
      });
      this.setComponentInputs(componentRef, {
        totalRows: ctx.totalRows,
        filteredRows: ctx.filteredRows,
        selectedRows: ctx.selectedRows,
        columns: ctx.columns,
        rows: ctx.rows,
        grid: ctx.grid
      });
      this.appRef.attachView(componentRef.hostView);
      this.componentRefs.push(componentRef);
      componentRef.changeDetectorRef.detectChanges();
      return hostElement;
    };
  }
  /**
   * Creates a loading renderer function from an Angular component class.
   *
   * The component should accept a `size` input ('large' | 'small').
   * @internal
   */
  createComponentLoadingRenderer(componentClass) {
    return (ctx) => {
      const hostElement = document.createElement("span");
      hostElement.style.display = "contents";
      const componentRef = createComponent(componentClass, {
        environmentInjector: this.injector,
        hostElement
      });
      this.setComponentInputs(componentRef, {
        size: ctx.size
      });
      this.appRef.attachView(componentRef.hostView);
      this.componentRefs.push(componentRef);
      componentRef.changeDetectorRef.detectChanges();
      return hostElement;
    };
  }
  /**
   * Creates a group row renderer function from an Angular component class.
   *
   * The component should accept group row inputs (key, value, depth, rows, expanded, toggleExpand).
   * Returns the host element directly (groupRowRenderer returns an element, not void).
   * @internal
   */
  createComponentGroupRowRenderer(componentClass) {
    return (params) => {
      const hostElement = document.createElement("span");
      hostElement.style.display = "contents";
      const componentRef = createComponent(componentClass, {
        environmentInjector: this.injector,
        hostElement
      });
      this.setComponentInputs(componentRef, {
        key: params.key,
        value: params.value,
        depth: params.depth,
        rows: params.rows,
        expanded: params.expanded,
        toggleExpand: params.toggleExpand
      });
      this.appRef.attachView(componentRef.hostView);
      this.componentRefs.push(componentRef);
      componentRef.changeDetectorRef.detectChanges();
      return hostElement;
    };
  }
  /**
   * Creates a filter panel renderer function from an Angular component class.
   *
   * The component must implement `FilterPanel` (i.e., have a `params` input).
   * The component is mounted into the filter panel container element.
   * @internal
   */
  createComponentFilterPanelRenderer(componentClass) {
    return (container, params) => {
      const hostElement = document.createElement("span");
      hostElement.style.display = "contents";
      const componentRef = createComponent(componentClass, {
        environmentInjector: this.injector,
        hostElement
      });
      try {
        componentRef.setInput("params", params);
      } catch {
      }
      this.appRef.attachView(componentRef.hostView);
      this.componentRefs.push(componentRef);
      componentRef.changeDetectorRef.detectChanges();
      container.appendChild(hostElement);
    };
  }
  /**
   * Sets component inputs using Angular's setInput API.
   * @internal
   */
  setComponentInputs(componentRef, inputs) {
    for (const [key, value] of Object.entries(inputs)) {
      try {
        componentRef.setInput(key, value);
      } catch {
      }
    }
  }
  /**
   * Called when a cell's content is about to be wiped (e.g., exiting edit mode,
   * scroll-recycling a row, or rebuilding a row).
   *
   * Destroys any editor embedded views or component refs whose DOM is
   * inside the given cell element. This prevents memory leaks from
   * orphaned Angular views that would otherwise stay in the change
   * detection tree indefinitely.
   */
  releaseCell(cellEl) {
    for (let i2 = this.editorViewRefs.length - 1; i2 >= 0; i2--) {
      const ref = this.editorViewRefs[i2];
      if (ref.rootNodes.some((n) => cellEl.contains(n))) {
        ref.destroy();
        this.editorViewRefs.splice(i2, 1);
      }
    }
    for (let i2 = this.editorComponentRefs.length - 1; i2 >= 0; i2--) {
      const ref = this.editorComponentRefs[i2];
      if (cellEl.contains(ref.location.nativeElement)) {
        ref.destroy();
        this.editorComponentRefs.splice(i2, 1);
      }
    }
  }
  /**
   * Unmount a specific container (e.g., detail panel, tool panel).
   * Finds the matching view or component ref whose DOM nodes are inside
   * the container and properly destroys it to prevent memory leaks.
   */
  unmount(container) {
    for (let i2 = this.viewRefs.length - 1; i2 >= 0; i2--) {
      const ref = this.viewRefs[i2];
      if (ref.rootNodes.some((n) => container.contains(n))) {
        ref.destroy();
        this.viewRefs.splice(i2, 1);
        return;
      }
    }
    for (let i2 = this.componentRefs.length - 1; i2 >= 0; i2--) {
      const ref = this.componentRefs[i2];
      if (container.contains(ref.location.nativeElement)) {
        ref.destroy();
        this.componentRefs.splice(i2, 1);
        return;
      }
    }
  }
  /**
   * Clean up all view references and component references.
   * Call this when your app/component is destroyed.
   */
  destroy() {
    this.viewRefs.forEach((ref) => ref.destroy());
    this.viewRefs = [];
    this.editorViewRefs.forEach((ref) => ref.destroy());
    this.editorViewRefs = [];
    this.componentRefs.forEach((ref) => ref.destroy());
    this.componentRefs = [];
    this.editorComponentRefs.forEach((ref) => ref.destroy());
    this.editorComponentRefs = [];
  }
};
var AngularGridAdapter = GridAdapter;
var GRID_ICONS = new InjectionToken("GRID_ICONS");
var GridIconRegistry = class _GridIconRegistry {
  icons = /* @__PURE__ */ new Map();
  constructor() {
    const initial = inject(GRID_ICONS, {
      optional: true
    });
    if (initial) {
      for (const [key, value] of Object.entries(initial)) {
        this.icons.set(key, value);
      }
    }
  }
  /**
   * Set an icon override.
   *
   * @param name - The icon name (e.g., 'expand', 'collapse', 'filter')
   * @param value - The icon value (string text or SVG markup)
   */
  set(name, value) {
    this.icons.set(name, value);
  }
  /**
   * Get an icon value.
   */
  get(name) {
    return this.icons.get(name);
  }
  /**
   * Remove an icon override.
   */
  remove(name) {
    this.icons.delete(name);
  }
  /**
   * Check if an icon has an override.
   */
  has(name) {
    return this.icons.has(name);
  }
  /**
   * Get all icon overrides as a GridIcons partial.
   * Used internally by the adapter.
   *
   * @internal
   */
  getAll() {
    const result = {};
    for (const [key, value] of this.icons) {
      result[key] = value;
    }
    return result;
  }
  /**
   * Get all registered icon names.
   */
  getRegisteredIcons() {
    return Array.from(this.icons.keys());
  }
  static ɵfac = function GridIconRegistry_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridIconRegistry)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _GridIconRegistry,
    factory: _GridIconRegistry.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridIconRegistry, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function provideGridIcons(icons) {
  return makeEnvironmentProviders([{
    provide: GRID_ICONS,
    useValue: icons
  }]);
}
function injectGrid() {
  const elementRef = inject(ElementRef);
  const isReady = signal(false, ...ngDevMode ? [{
    debugName: "isReady"
  }] : (
    /* istanbul ignore next */
    []
  ));
  const config = signal(null, ...ngDevMode ? [{
    debugName: "config"
  }] : (
    /* istanbul ignore next */
    []
  ));
  const element = signal(null, ...ngDevMode ? [{
    debugName: "element"
  }] : (
    /* istanbul ignore next */
    []
  ));
  afterNextRender(() => {
    const gridElement = elementRef.nativeElement.querySelector("tbw-grid");
    if (!gridElement) {
      console.warn("[injectGrid] No tbw-grid element found in component");
      return;
    }
    element.set(gridElement);
    gridElement.ready?.().then(async () => {
      isReady.set(true);
      const effectiveConfig = await gridElement.getConfig?.();
      if (effectiveConfig) {
        config.set(effectiveConfig);
      }
    });
  });
  const visibleColumns = computed(() => {
    const currentConfig = config();
    if (!currentConfig?.columns) return [];
    return currentConfig.columns.filter((col) => !col.hidden);
  }, ...ngDevMode ? [{
    debugName: "visibleColumns"
  }] : (
    /* istanbul ignore next */
    []
  ));
  const getConfig = async () => {
    const gridElement = element();
    if (!gridElement) return null;
    const effectiveConfig = gridElement.getConfig?.();
    return effectiveConfig ?? null;
  };
  const forceLayout = async () => {
    const gridElement = element();
    if (!gridElement) return;
    await gridElement.forceLayout?.();
  };
  const toggleGroup = async (key) => {
    const gridElement = element();
    if (!gridElement) return;
    await gridElement.toggleGroup?.(key);
  };
  const registerStyles = (id, css) => {
    element()?.registerStyles?.(id, css);
  };
  const unregisterStyles = (id) => {
    element()?.unregisterStyles?.(id);
  };
  const selectAll = () => {
    const gridElement = element();
    const plugin = gridElement?.getPluginByName?.("selection");
    if (!plugin) {
      console.warn("[injectGrid] selectAll requires SelectionPlugin");
      return;
    }
    if (plugin.config?.mode === "row") {
      const rows = gridElement?.rows ?? [];
      const allIndices = new Set(rows.map((_, i2) => i2));
      plugin.selected = allIndices;
      plugin.requestAfterRender?.();
    }
  };
  const clearSelection = () => {
    const gridElement = element();
    const plugin = gridElement?.getPluginByName?.("selection");
    if (!plugin) return;
    const mode = plugin.config?.mode;
    if (mode === "row") {
      plugin.selected = /* @__PURE__ */ new Set();
    } else if (mode === "range" || mode === "cell") {
      plugin.ranges = [];
    }
    plugin.requestAfterRender?.();
  };
  const getSelectedIndices = () => {
    const gridElement = element();
    const plugin = gridElement?.getPluginByName?.("selection");
    if (!plugin) return /* @__PURE__ */ new Set();
    if (plugin.config?.mode === "row") {
      return new Set(plugin.selected ?? []);
    }
    const ranges = plugin.ranges ?? [];
    const indices = /* @__PURE__ */ new Set();
    for (const range of ranges) {
      for (let r = range.startRow; r <= range.endRow; r++) {
        indices.add(r);
      }
    }
    return indices;
  };
  const getSelectedRows = () => {
    const gridElement = element();
    if (!gridElement) return [];
    const rows = gridElement.rows ?? [];
    const indices = getSelectedIndices();
    return Array.from(indices).filter((i2) => i2 >= 0 && i2 < rows.length).map((i2) => rows[i2]);
  };
  const exportToCsv = (filename) => {
    const gridElement = element();
    const plugin = gridElement?.getPluginByName?.("export");
    if (!plugin) {
      console.warn("[injectGrid] exportToCsv requires ExportPlugin");
      return;
    }
    plugin.exportToCsv?.(filename);
  };
  const exportToJson = (filename) => {
    const gridElement = element();
    const plugin = gridElement?.getPluginByName?.("export");
    if (!plugin) {
      console.warn("[injectGrid] exportToJson requires ExportPlugin");
      return;
    }
    plugin.exportToJson?.(filename);
  };
  return {
    element,
    isReady,
    config,
    visibleColumns,
    getConfig,
    forceLayout,
    toggleGroup,
    registerStyles,
    unregisterStyles,
    selectAll,
    clearSelection,
    getSelectedIndices,
    getSelectedRows,
    exportToCsv,
    exportToJson
  };
}
var BaseFilterPanel = class _BaseFilterPanel {
  /**
   * Filter panel parameters injected by the grid's filtering plugin.
   *
   * Provides access to:
   * - `field` — the column field name
   * - `column` — full column configuration
   * - `uniqueValues` — distinct values in the column
   * - `excludedValues` — currently excluded values (set filter)
   * - `searchText` — current search text
   * - `applySetFilter(excluded)` — apply a set-based (include/exclude) filter
   * - `applyTextFilter(operator, value, valueTo?)` — apply a text/number filter
   * - `clearFilter()` — clear the filter for this column
   * - `closePanel()` — close the filter panel
   */
  params = input.required(...ngDevMode ? [{
    debugName: "params"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Apply the filter then close the panel.
   *
   * Calls {@link applyFilter} followed by `params().closePanel()`.
   * Bind this to your "Apply" button or Enter key handler.
   */
  applyAndClose() {
    this.applyFilter();
    this.params().closePanel();
  }
  /**
   * Clear the filter then close the panel.
   *
   * Calls `params().clearFilter()` followed by `params().closePanel()`.
   * Bind this to your "Clear" / "Reset" button.
   */
  clearAndClose() {
    this.params().clearFilter();
    this.params().closePanel();
  }
  static ɵfac = function BaseFilterPanel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseFilterPanel)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _BaseFilterPanel,
    inputs: {
      params: [1, "params"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseFilterPanel, [{
    type: Directive
  }], null, {
    params: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "params",
        required: true
      }]
    }]
  });
})();
var BaseGridEditor = class _BaseGridEditor {
  elementRef = inject(ElementRef);
  _destroyRef = inject(DestroyRef);
  /** Cleanup function for the edit-close listener */
  _editCloseCleanup = null;
  // ============================================================================
  // Inputs
  // ============================================================================
  /**
   * The cell value. Used when FormControl is not available.
   * When a FormControl is provided, value is derived from control.value instead.
   */
  value = input(...ngDevMode ? [void 0, {
    debugName: "value"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * The full row data object.
   */
  row = input(...ngDevMode ? [void 0, {
    debugName: "row"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * The column configuration.
   */
  column = input(...ngDevMode ? [void 0, {
    debugName: "column"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * The FormControl for this cell, if the grid is bound to a FormArray.
   * When provided, the editor uses control.value instead of the value input.
   */
  control = input(...ngDevMode ? [void 0, {
    debugName: "control"
  }] : (
    /* istanbul ignore next */
    []
  ));
  // ============================================================================
  // Outputs
  // ============================================================================
  /**
   * Emits when the user commits a new value.
   * Emits `null` when a nullable field is cleared.
   */
  commit = output();
  /**
   * Emits when the user cancels editing.
   */
  cancel = output();
  // ============================================================================
  // Computed State
  // ============================================================================
  /**
   * The current value, derived from FormControl if available, otherwise from value input.
   * This is the recommended way to get the current value in your editor template.
   */
  currentValue = computed(() => {
    const ctrl = this.control();
    if (ctrl) {
      return ctrl.value;
    }
    return this.value();
  }, ...ngDevMode ? [{
    debugName: "currentValue"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Whether the control is invalid (has validation errors).
   * Returns false if no FormControl is available.
   */
  isInvalid = computed(() => {
    return this.control()?.invalid ?? false;
  }, ...ngDevMode ? [{
    debugName: "isInvalid"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Whether the control is dirty (has been modified).
   * Returns false if no FormControl is available.
   */
  isDirty = computed(() => {
    return this.control()?.dirty ?? false;
  }, ...ngDevMode ? [{
    debugName: "isDirty"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Whether the control has been touched.
   * Returns false if no FormControl is available.
   */
  isTouched = computed(() => {
    return this.control()?.touched ?? false;
  }, ...ngDevMode ? [{
    debugName: "isTouched"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Whether the control has any validation errors.
   */
  hasErrors = computed(() => {
    const ctrl = this.control();
    return ctrl?.errors != null && Object.keys(ctrl.errors).length > 0;
  }, ...ngDevMode ? [{
    debugName: "hasErrors"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * The first error message from the control's validation errors.
   * Returns an empty string if no errors.
   */
  firstErrorMessage = computed(() => {
    const ctrl = this.control();
    if (!ctrl?.errors) return "";
    const firstKey = Object.keys(ctrl.errors)[0];
    return this.getErrorMessage(firstKey, ctrl.errors[firstKey]);
  }, ...ngDevMode ? [{
    debugName: "firstErrorMessage"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * All error messages from the control's validation errors.
   */
  allErrorMessages = computed(() => {
    const ctrl = this.control();
    if (!ctrl?.errors) return [];
    return Object.entries(ctrl.errors).map(([key, value]) => this.getErrorMessage(key, value));
  }, ...ngDevMode ? [{
    debugName: "allErrorMessages"
  }] : (
    /* istanbul ignore next */
    []
  ));
  // ============================================================================
  // Lifecycle
  // ============================================================================
  constructor() {
    afterNextRender(() => this._initEditCloseListener());
    this._destroyRef.onDestroy(() => {
      this._editCloseCleanup?.();
      this._editCloseCleanup = null;
    });
  }
  _initEditCloseListener() {
    const grid = this.elementRef.nativeElement.closest("tbw-grid");
    if (!grid) return;
    let unsubBefore;
    let unsubClose;
    unsubBefore = grid.on("before-edit-close", () => {
      this.onBeforeEditClose();
      unsubBefore?.();
      unsubBefore = void 0;
    });
    unsubClose = grid.on("edit-close", () => {
      this.onEditClose();
      unsubClose?.();
      unsubClose = void 0;
    });
    this._editCloseCleanup = () => {
      unsubBefore?.();
      unsubClose?.();
    };
  }
  // ============================================================================
  // Methods
  // ============================================================================
  /**
   * Whether this editor's cell is the currently focused cell.
   *
   * In row editing mode the grid creates editors for every editable cell
   * in the row simultaneously. Use this to conditionally auto-focus inputs
   * or open panels only in the active cell.
   *
   * Performs a synchronous DOM check — safe to call from `ngAfterViewInit`.
   */
  isCellFocused() {
    return this.elementRef.nativeElement.closest('[part="cell"]')?.classList.contains("cell-focus") ?? false;
  }
  /**
   * Called **before** the grid clears editing state and destroys editor DOM.
   *
   * At this point the commit callback is still active, so subclasses can
   * call {@link commitValue} to flush any pending/deferred values.
   *
   * This fires only on the **commit** path (not on revert/cancel).
   * Use {@link onEditClose} for cleanup that should happen on both paths.
   */
  onBeforeEditClose() {
  }
  /**
   * Called when the grid ends the editing session for this cell.
   *
   * Override to perform cleanup such as closing overlay panels, autocomplete
   * dropdowns, or other floating UI that lives at `<body>` level and would
   * otherwise persist after the editor DOM is removed.
   *
   * The listener is set up automatically via `afterNextRender` — no manual
   * wiring required.
   */
  onEditClose() {
  }
  /**
   * Called by the grid adapter when the cell value changes externally
   * (e.g., via `updateRow()` cascade or undo/redo).
   *
   * Override in subclasses to reset internal state (search text, selection
   * flags, etc.) so the editor displays the updated value.
   *
   * This runs **synchronously** before the value input is updated, giving
   * the editor a chance to clear stale state before the next change-detection
   * pass re-reads the template.
   *
   * @param _newVal The new cell value being pushed from the grid
   */
  onExternalValueChange(_newVal) {
  }
  /**
   * Commit a new value. Emits the commit output AND dispatches a DOM event.
   * The DOM event enables the grid's auto-wiring to catch the commit.
   * Call this when the user confirms their edit.
   */
  commitValue(newValue) {
    this.commit.emit(newValue);
    this.elementRef.nativeElement.dispatchEvent(new CustomEvent("commit", {
      detail: newValue,
      bubbles: true
    }));
  }
  /**
   * Cancel editing. Emits the cancel output AND dispatches a DOM event.
   * Call this when the user cancels (e.g., presses Escape).
   */
  cancelEdit() {
    this.cancel.emit();
    this.elementRef.nativeElement.dispatchEvent(new CustomEvent("cancel", {
      bubbles: true
    }));
  }
  /**
   * Get a human-readable error message for a validation error.
   * Override this method to customize error messages for your editor.
   *
   * @param errorKey - The validation error key (e.g., 'required', 'minlength')
   * @param errorValue - The error value (e.g., { requiredLength: 5, actualLength: 3 })
   * @returns A human-readable error message
   */
  getErrorMessage(errorKey, errorValue) {
    switch (errorKey) {
      case "required":
        return "This field is required";
      case "minlength": {
        const err = errorValue;
        return `Minimum length is ${err?.requiredLength ?? "unknown"}`;
      }
      case "maxlength": {
        const err = errorValue;
        return `Maximum length is ${err?.requiredLength ?? "unknown"}`;
      }
      case "min": {
        const err = errorValue;
        return `Minimum value is ${err?.min ?? "unknown"}`;
      }
      case "max": {
        const err = errorValue;
        return `Maximum value is ${err?.max ?? "unknown"}`;
      }
      case "email":
        return "Invalid email address";
      case "pattern":
        return "Invalid format";
      default:
        return `Invalid value (${errorKey})`;
    }
  }
  static ɵfac = function BaseGridEditor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseGridEditor)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _BaseGridEditor,
    inputs: {
      value: [1, "value"],
      row: [1, "row"],
      column: [1, "column"],
      control: [1, "control"]
    },
    outputs: {
      commit: "commit",
      cancel: "cancel"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseGridEditor, [{
    type: Directive
  }], () => [], {
    value: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "value",
        required: false
      }]
    }],
    row: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "row",
        required: false
      }]
    }],
    column: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "column",
        required: false
      }]
    }],
    control: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "control",
        required: false
      }]
    }],
    commit: [{
      type: Output,
      args: ["commit"]
    }],
    cancel: [{
      type: Output,
      args: ["cancel"]
    }]
  });
})();
var BaseGridEditorCVA = class _BaseGridEditorCVA extends BaseGridEditor {
  // ============================================================================
  // CVA State
  // ============================================================================
  /** Internal onChange callback registered by the form control. */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onChange = () => {
  };
  /** Internal onTouched callback registered by the form control. */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onTouched = () => {
  };
  /**
   * Signal holding the value written by the form control via `writeValue()`.
   * Updated when the form control pushes a new value (e.g. `patchValue`, `setValue`).
   */
  cvaValue = signal(null, ...ngDevMode ? [{
    debugName: "cvaValue"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Signal tracking the disabled state set by the form control.
   * Updated when `setDisabledState()` is called by Angular's forms module.
   */
  disabledState = signal(false, ...ngDevMode ? [{
    debugName: "disabledState"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Resolved display value.
   *
   * Prefers `currentValue()` (grid context — from `control.value` or `value` input)
   * and falls back to `cvaValue()` (standalone form context — from `writeValue`).
   *
   * Use this in your template instead of reading `currentValue()` directly
   * so the component works in both grid and standalone form contexts.
   */
  displayValue = computed(() => {
    return this.currentValue() ?? this.cvaValue();
  }, ...ngDevMode ? [{
    debugName: "displayValue"
  }] : (
    /* istanbul ignore next */
    []
  ));
  // ============================================================================
  // ControlValueAccessor Implementation
  // ============================================================================
  /**
   * Called by Angular forms when the form control value changes programmatically.
   */
  writeValue(value) {
    this.cvaValue.set(value);
  }
  /**
   * Called by Angular forms to register a change callback.
   */
  registerOnChange(fn) {
    this._onChange = fn;
  }
  /**
   * Called by Angular forms to register a touched callback.
   */
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /**
   * Called by Angular forms to set the disabled state.
   */
  setDisabledState(isDisabled) {
    this.disabledState.set(isDisabled);
  }
  // ============================================================================
  // Dual-Commit Helpers
  // ============================================================================
  /**
   * Commit a value through both the CVA (form control) and the grid.
   *
   * - Calls the CVA `onChange` callback (updates the form control)
   * - Marks the control as touched
   * - Calls `commitValue()` (emits grid commit event + DOM `CustomEvent`)
   *
   * Use this instead of `commitValue()` when your editor doubles as a form control.
   *
   * @param value - The new value to commit
   */
  commitBoth(value) {
    this.cvaValue.set(value);
    this._onChange(value);
    this._onTouched();
    this.commitValue(value);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵBaseGridEditorCVA_BaseFactory;
    return function BaseGridEditorCVA_Factory(__ngFactoryType__) {
      return (ɵBaseGridEditorCVA_BaseFactory || (ɵBaseGridEditorCVA_BaseFactory = ɵɵgetInheritedFactory(_BaseGridEditorCVA)))(__ngFactoryType__ || _BaseGridEditorCVA);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _BaseGridEditorCVA,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseGridEditorCVA, [{
    type: Directive
  }], null, null);
})();
var overlayStylesInjected = false;
var OVERLAY_STYLES = (
  /* css */
  `
.tbw-overlay-panel {
  position: fixed;
  z-index: 10000;
  background: var(--tbw-overlay-bg, #fff);
  border: 1px solid var(--tbw-overlay-border, #ccc);
  border-radius: var(--tbw-overlay-radius, 4px);
  box-shadow: var(--tbw-overlay-shadow, 0 4px 12px rgba(0, 0, 0, 0.15));
  box-sizing: border-box;
  overflow: auto;
}

.tbw-overlay-panel:popover-open {
  display: block;
}

@supports (anchor-name: --a) {
  .tbw-overlay-panel[data-anchor-id] {
    position: fixed;
    position-anchor: var(--tbw-overlay-anchor);
    inset: unset;
  }
  .tbw-overlay-panel[data-pos="below"] {
    top: anchor(bottom);
    left: anchor(left);
    position-try-fallbacks: flip-block;
  }
  .tbw-overlay-panel[data-pos="above"] {
    bottom: anchor(top);
    left: anchor(left);
    position-try-fallbacks: flip-block;
  }
  .tbw-overlay-panel[data-pos="below-right"] {
    top: anchor(bottom);
    right: anchor(right);
    position-try-fallbacks: flip-block;
  }
  .tbw-overlay-panel[data-pos="over-top-left"] {
    top: anchor(top);
    left: anchor(left);
  }
  .tbw-overlay-panel[data-pos="over-bottom-left"] {
    bottom: anchor(bottom);
    left: anchor(left);
  }
}
`
);
function ensureOverlayStyles() {
  if (overlayStylesInjected) return;
  overlayStylesInjected = true;
  const style = document.createElement("style");
  style.setAttribute("data-tbw-overlay", "");
  style.textContent = OVERLAY_STYLES;
  document.head.appendChild(style);
}
var anchorCounter = 0;
var BaseOverlayEditor = class _BaseOverlayEditor extends BaseGridEditor {
  _elementRef = inject(ElementRef);
  _overlayDestroyRef = inject(DestroyRef);
  // ============================================================================
  // Configuration
  // ============================================================================
  /**
   * Position of the overlay panel relative to the anchor cell.
   * Override in subclasses to change the default position.
   *
   * @default 'below'
   */
  overlayPosition = "below";
  // ============================================================================
  // Internal State
  // ============================================================================
  /** The overlay panel element (set via `initOverlay()`). */
  _panel = null;
  /** Whether the overlay is currently visible. */
  _isOpen = false;
  /** Unique anchor ID for CSS Anchor Positioning. */
  _anchorId = "";
  /** Whether the browser supports CSS Anchor Positioning. */
  _supportsAnchor = false;
  /** AbortController for all overlay-related listeners. */
  _abortCtrl = null;
  /** MutationObserver watching cell focus class changes. */
  _focusObserver = null;
  // ============================================================================
  // Lifecycle
  // ============================================================================
  constructor() {
    super();
    this._supportsAnchor = typeof CSS !== "undefined" && CSS.supports("anchor-name", "--a");
    ensureOverlayStyles();
    afterNextRender(() => this._setupFocusObserver());
    this._overlayDestroyRef.onDestroy(() => this.teardownOverlay());
  }
  // ============================================================================
  // Public API — Subclass Interface
  // ============================================================================
  /**
   * Initialise the overlay with the panel element.
   *
   * Call this in an `effect()` or `afterNextRender()` with your `viewChild` panel reference.
   * The panel is moved to `<body>` and hidden until {@link showOverlay} is called.
   *
   * @param panel - The overlay panel DOM element
   */
  initOverlay(panel) {
    this._panel = panel;
    this._anchorId = `tbw-anchor-${++anchorCounter}`;
    panel.classList.add("tbw-overlay-panel");
    panel.setAttribute("data-pos", this.overlayPosition);
    panel.setAttribute("data-anchor-id", this._anchorId);
    panel.style.display = "none";
    if (this._supportsAnchor) {
      const cell = this._getCell();
      if (cell) {
        cell.style.setProperty("anchor-name", `--${this._anchorId}`);
        panel.style.setProperty("--tbw-overlay-anchor", `--${this._anchorId}`);
      }
    }
    document.body.appendChild(panel);
    this._getGridElement()?.registerExternalFocusContainer?.(panel);
    this._abortCtrl = new AbortController();
    document.addEventListener("pointerdown", (e) => this._onDocumentPointerDown(e), {
      signal: this._abortCtrl.signal
    });
  }
  /**
   * Show the overlay panel.
   *
   * If CSS Anchor Positioning is not supported, falls back to JS-based
   * positioning using `getBoundingClientRect()`.
   */
  showOverlay() {
    if (!this._panel || this._isOpen) return;
    this._isOpen = true;
    this._panel.style.display = "";
    if (!this._supportsAnchor) {
      this._positionWithJs();
    }
  }
  /**
   * Hide the overlay panel.
   *
   * @param suppressTabAdvance - When `true`, skip synthetic Tab dispatch
   *   (useful when hiding is triggered by an external focus change).
   */
  hideOverlay(suppressTabAdvance) {
    if (!this._panel || !this._isOpen) return;
    this._isOpen = false;
    this._panel.style.display = "none";
    if (!suppressTabAdvance) {
      this.getInlineInput()?.focus();
    }
  }
  /**
   * Close and immediately re-open the overlay.
   * Useful after the panel content changes size and needs repositioning.
   */
  reopenOverlay() {
    if (!this._panel) return;
    this._isOpen = false;
    this._panel.style.display = "none";
    this.showOverlay();
  }
  /**
   * Remove the overlay from the DOM and clean up all listeners.
   *
   * Called automatically on `DestroyRef.onDestroy`. Can also be called
   * manually if the editor needs early cleanup.
   */
  teardownOverlay() {
    this._abortCtrl?.abort();
    this._abortCtrl = null;
    this._focusObserver?.disconnect();
    this._focusObserver = null;
    if (this._panel) {
      this._getGridElement()?.unregisterExternalFocusContainer?.(this._panel);
    }
    if (this._panel?.parentNode) {
      this._panel.parentNode.removeChild(this._panel);
    }
    this._panel = null;
    this._isOpen = false;
    if (this._supportsAnchor) {
      const cell = this._getCell();
      if (cell) {
        cell.style.removeProperty("anchor-name");
      }
    }
  }
  /**
   * Override in `edit-close` handler to also hide the overlay.
   * This is called automatically by `BaseGridEditor` when the grid
   * ends the editing session.
   */
  onEditClose() {
    this.hideOverlay(true);
  }
  // ============================================================================
  // Keyboard & Click Helpers
  // ============================================================================
  /**
   * Keydown handler for the inline readonly input.
   *
   * - **Enter / Space / ArrowDown / F2** → open overlay
   * - **Escape** → calls {@link handleEscape}
   *
   * Bind this to `(keydown)` on your inline input element.
   */
  onInlineKeydown(event) {
    switch (event.key) {
      case "Enter":
      case " ":
      case "ArrowDown":
      case "F2":
        event.preventDefault();
        this.showOverlay();
        this.onOverlayOpened();
        break;
      case "Escape":
        this.handleEscape(event);
        break;
    }
  }
  /**
   * Click handler for the inline input.
   * Opens the overlay and calls {@link onOverlayOpened}.
   *
   * Bind this to `(click)` on your inline input element.
   */
  onInlineClick() {
    if (this._isOpen) {
      this.hideOverlay();
    } else {
      this.showOverlay();
      this.onOverlayOpened();
    }
  }
  /**
   * Handle Escape key press.
   *
   * If the overlay is open, closes it and returns focus to the inline input.
   * If the overlay is already closed, cancels the edit entirely.
   */
  handleEscape(event) {
    if (this._isOpen) {
      event.stopPropagation();
      this.hideOverlay();
    } else {
      this.cancelEdit();
    }
  }
  /**
   * Dispatch a synthetic Tab key event to advance grid focus.
   *
   * Call this after committing a value and closing the overlay so the
   * grid moves focus to the next cell.
   *
   * @param backward - When `true`, dispatch Shift+Tab to move backwards.
   */
  advanceGridFocus(backward = false) {
    const cell = this._getCell();
    if (!cell) return;
    cell.dispatchEvent(new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: backward,
      bubbles: true,
      cancelable: true
    }));
  }
  /**
   * Called after the overlay is shown.
   *
   * Override to focus an element inside the panel, start animations, etc.
   * Default implementation is a no-op.
   */
  onOverlayOpened() {
  }
  // ============================================================================
  // Private Helpers
  // ============================================================================
  /** Find the parent cell element for this editor. */
  _getCell() {
    return this._elementRef.nativeElement.closest('[part="cell"]') ?? null;
  }
  /** Find the parent `<tbw-grid>` element for this editor. */
  _getGridElement() {
    return this._elementRef.nativeElement.closest("tbw-grid") ?? null;
  }
  /**
   * JS fallback positioning for browsers without CSS Anchor Positioning.
   * Uses `getBoundingClientRect()` with viewport overflow detection.
   */
  _positionWithJs() {
    const cell = this._getCell();
    const panel = this._panel;
    if (!cell || !panel) return;
    const cellRect = cell.getBoundingClientRect();
    panel.style.visibility = "hidden";
    panel.style.display = "";
    const panelRect = panel.getBoundingClientRect();
    panel.style.visibility = "";
    const viewportH = window.innerHeight;
    const viewportW = window.innerWidth;
    let top;
    let left;
    switch (this.overlayPosition) {
      case "above": {
        top = cellRect.top - panelRect.height;
        left = cellRect.left;
        if (top < 0) top = cellRect.bottom;
        break;
      }
      case "below-right": {
        top = cellRect.bottom;
        left = cellRect.right - panelRect.width;
        if (top + panelRect.height > viewportH) top = cellRect.top - panelRect.height;
        break;
      }
      case "over-top-left": {
        top = cellRect.top;
        left = cellRect.left;
        break;
      }
      case "over-bottom-left": {
        top = cellRect.bottom - panelRect.height;
        left = cellRect.left;
        break;
      }
      case "below":
      default: {
        top = cellRect.bottom;
        left = cellRect.left;
        if (top + panelRect.height > viewportH) top = cellRect.top - panelRect.height;
        break;
      }
    }
    if (left + panelRect.width > viewportW) left = viewportW - panelRect.width - 4;
    if (left < 0) left = 4;
    if (top < 0) top = 4;
    panel.style.top = `${top}px`;
    panel.style.left = `${left}px`;
  }
  /**
   * Document pointerdown handler for click-outside detection.
   * Fires `onOverlayOutsideClick()` if the click is outside the panel
   * and outside the editor's host element.
   */
  _onDocumentPointerDown(event) {
    if (!this._isOpen || !this._panel) return;
    const target = event.target;
    const hostEl = this._elementRef.nativeElement;
    if (this._panel.contains(target) || hostEl.contains(target)) return;
    this.onOverlayOutsideClick();
  }
  /**
   * Set up a MutationObserver on the parent cell to watch for
   * `cell-focus` class changes. This handles row-editing mode where
   * all editors exist simultaneously but only the focused cell's
   * editor should have its overlay visible.
   *
   * A `justOpened` flash guard suppresses the observer from
   * immediately closing the overlay when `beginBulkEdit()` moves
   * focus to the first editable column. Without this guard,
   * double-click triggers a "flash open then close" effect.
   */
  _setupFocusObserver() {
    const cell = this._getCell();
    if (!cell) return;
    let justOpened = false;
    let pendingHideRaf = 0;
    const hostEl = this._elementRef.nativeElement;
    this._focusObserver = new MutationObserver((mutations) => {
      if (!cell.contains(hostEl)) {
        this._focusObserver?.disconnect();
        this._focusObserver = null;
        return;
      }
      for (const mutation of mutations) {
        if (mutation.type !== "attributes" || mutation.attributeName !== "class") continue;
        const isFocused = cell.classList.contains("cell-focus");
        if (isFocused && !this._isOpen) {
          if (pendingHideRaf) {
            cancelAnimationFrame(pendingHideRaf);
            pendingHideRaf = 0;
          }
          justOpened = true;
          this.showOverlay();
          this.onOverlayOpened();
          setTimeout(() => {
            justOpened = false;
          }, 0);
        } else if (!isFocused && this._isOpen && !justOpened) {
          if (pendingHideRaf) cancelAnimationFrame(pendingHideRaf);
          pendingHideRaf = requestAnimationFrame(() => {
            pendingHideRaf = 0;
            if (!cell.classList.contains("cell-focus") && this._isOpen) {
              this.hideOverlay(true);
            }
          });
        }
      }
    });
    this._focusObserver.observe(cell, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }
  static ɵfac = function BaseOverlayEditor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseOverlayEditor)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _BaseOverlayEditor,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseOverlayEditor, [{
    type: Directive
  }], () => [], null);
})();
var TbwGridColumn = class _TbwGridColumn {
  static ɵfac = function TbwGridColumn_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TbwGridColumn)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _TbwGridColumn,
    selectors: [["tbw-grid-column"]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TbwGridColumn, [{
    type: Directive,
    args: [{
      selector: "tbw-grid-column"
    }]
  }], null, null);
})();
var TbwGridHeader = class _TbwGridHeader {
  static ɵfac = function TbwGridHeader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TbwGridHeader)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _TbwGridHeader,
    selectors: [["tbw-grid-header"]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TbwGridHeader, [{
    type: Directive,
    args: [{
      selector: "tbw-grid-header"
    }]
  }], null, null);
})();
var FORM_ARRAY_CONTEXT = /* @__PURE__ */ Symbol("formArrayContext");
function getLazyFormContext(gridElement) {
  return gridElement[FORM_ARRAY_CONTEXT];
}
var GridLazyForm = class _GridLazyForm {
  elementRef = inject(ElementRef);
  // Cache of FormGroups by row reference
  formGroupCache = /* @__PURE__ */ new Map();
  // Map from row reference to rowIndex (needed for getControl)
  rowIndexMap = /* @__PURE__ */ new Map();
  // Track which row is currently being edited
  editingRowIndex = null;
  cellCommitUnsub = null;
  rowCommitUnsub = null;
  rowsChangeUnsub = null;
  /**
   * Factory function to create a FormGroup for a row.
   * Called lazily when the row first enters edit mode.
   *
   * @example
   * ```typescript
   * createRowForm = (row: Employee): FormGroup => this.fb.group({
   *   firstName: [row.firstName, Validators.required],
   *   lastName: [row.lastName],
   *   salary: [row.salary, [Validators.min(0)]],
   * });
   * ```
   */
  lazyForm = input.required(...ngDevMode ? [{
    debugName: "lazyForm"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Whether to automatically sync Angular validation state to grid's visual invalid styling.
   *
   * When enabled:
   * - After a cell commit, if the FormControl is invalid, the cell is marked with `setInvalid()`
   * - When a FormControl becomes valid, `clearInvalid()` is called
   * - On `row-commit`, if the row's FormGroup has invalid controls, the commit is prevented
   *
   * @default true
   */
  syncValidation = input(true, ...ngDevMode ? [{
    debugName: "syncValidation"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Whether to keep FormGroups cached after a row exits edit mode.
   *
   * - `true`: FormGroups are kept, preserving dirty/touched state across edit sessions
   * - `false`: FormGroups are disposed when the row exits edit mode (default)
   *
   * @default false
   */
  keepFormGroups = input(false, ...ngDevMode ? [{
    debugName: "keepFormGroups"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Emitted when a row's form values change.
   * Useful for auto-save, validation display, or syncing to external state.
   */
  rowFormChange = output();
  ngOnInit() {
    const grid = this.elementRef.nativeElement;
    if (!grid) return;
    this.#storeFormContext(grid);
    this.cellCommitUnsub = grid.on("cell-commit", (detail) => {
      this.#handleCellCommit(detail);
    });
    this.rowCommitUnsub = grid.on("row-commit", (detail, event) => {
      this.#handleRowCommit(event, detail);
    });
    this.rowsChangeUnsub = grid.on("rows-change", () => {
      this.#updateRowIndexMap();
    });
    this.#updateRowIndexMap();
  }
  ngOnDestroy() {
    const grid = this.elementRef.nativeElement;
    if (!grid) return;
    this.cellCommitUnsub?.();
    this.rowCommitUnsub?.();
    this.rowsChangeUnsub?.();
    this.#clearFormContext(grid);
    this.formGroupCache.clear();
    this.rowIndexMap.clear();
  }
  // #region FormArrayContext Implementation
  /**
   * Gets or creates the FormGroup for a row.
   * This is the core lazy initialization logic.
   */
  #getOrCreateFormGroup(row, rowIndex) {
    let formGroup = this.formGroupCache.get(row);
    if (!formGroup) {
      const factory = this.lazyForm();
      formGroup = factory(row, rowIndex);
      this.formGroupCache.set(row, formGroup);
      this.rowIndexMap.set(row, rowIndex);
    }
    return formGroup;
  }
  /**
   * Gets the FormGroup for a row if it exists (without creating).
   */
  #getRowFormGroup(rowIndex) {
    const grid = this.elementRef.nativeElement;
    const rows = grid?.rows;
    if (!rows || rowIndex < 0 || rowIndex >= rows.length) return void 0;
    const row = rows[rowIndex];
    return this.formGroupCache.get(row);
  }
  /**
   * Stores the FormArrayContext on the grid element.
   * This uses the same interface as GridFormArray for compatibility.
   */
  #storeFormContext(grid) {
    const context = {
      getRow: (rowIndex) => {
        const rows = grid.rows;
        if (!rows || rowIndex < 0 || rowIndex >= rows.length) return null;
        return rows[rowIndex];
      },
      updateField: (rowIndex, field, value) => {
        const formGroup = this.#getRowFormGroup(rowIndex);
        if (formGroup) {
          const control = formGroup.get(field);
          if (control) {
            control.setValue(value);
            control.markAsDirty();
          }
        }
      },
      getValue: () => {
        return grid.rows ?? [];
      },
      // Always true for lazy forms - we create FormGroups on demand
      hasFormGroups: true,
      getControl: (rowIndex, field) => {
        const rows = grid.rows;
        if (!rows || rowIndex < 0 || rowIndex >= rows.length) return void 0;
        const row = rows[rowIndex];
        const formGroup = this.#getOrCreateFormGroup(row, rowIndex);
        return formGroup.get(field) ?? void 0;
      },
      getRowFormGroup: (rowIndex) => {
        const rows = grid.rows;
        if (!rows || rowIndex < 0 || rowIndex >= rows.length) return void 0;
        const row = rows[rowIndex];
        return this.#getOrCreateFormGroup(row, rowIndex);
      },
      isRowValid: (rowIndex) => {
        const formGroup = this.#getRowFormGroup(rowIndex);
        if (!formGroup) return true;
        return formGroup.valid;
      },
      isRowTouched: (rowIndex) => {
        const formGroup = this.#getRowFormGroup(rowIndex);
        if (!formGroup) return false;
        return formGroup.touched;
      },
      isRowDirty: (rowIndex) => {
        const formGroup = this.#getRowFormGroup(rowIndex);
        if (!formGroup) return false;
        return formGroup.dirty;
      },
      getRowErrors: (rowIndex) => {
        const formGroup = this.#getRowFormGroup(rowIndex);
        if (!formGroup) return null;
        const errors = {};
        let hasErrors = false;
        Object.keys(formGroup.controls).forEach((field) => {
          const control = formGroup.get(field);
          if (control?.errors) {
            errors[field] = control.errors;
            hasErrors = true;
          }
        });
        if (formGroup.errors) {
          errors["_group"] = formGroup.errors;
          hasErrors = true;
        }
        return hasErrors ? errors : null;
      }
    };
    grid[FORM_ARRAY_CONTEXT] = context;
  }
  /**
   * Clears the FormArrayContext from the grid element.
   */
  #clearFormContext(grid) {
    delete grid[FORM_ARRAY_CONTEXT];
  }
  // #endregion
  // #region Event Handlers
  /**
   * Updates the row index map when rows change.
   * This ensures we can find FormGroups by row reference after sorting/filtering.
   */
  #updateRowIndexMap() {
    const grid = this.elementRef.nativeElement;
    const rows = grid?.rows;
    if (!rows) return;
    this.rowIndexMap.clear();
    rows.forEach((row, index) => {
      if (this.formGroupCache.has(row)) {
        this.rowIndexMap.set(row, index);
      }
    });
  }
  /**
   * Handles cell-commit events by updating the FormControl in the FormGroup.
   */
  #handleCellCommit(detail) {
    const {
      rowIndex,
      field,
      value,
      rowId
    } = detail;
    const formGroup = this.#getRowFormGroup(rowIndex);
    if (formGroup) {
      const control = formGroup.get(field);
      if (control) {
        control.setValue(value);
        control.markAsDirty();
        control.markAsTouched();
        if (this.syncValidation() && rowId) {
          this.#syncControlValidationToGrid(rowId, field, control);
        }
        const grid = this.elementRef.nativeElement;
        const row = grid?.rows?.[rowIndex];
        if (row) {
          this.rowFormChange.emit({
            rowIndex,
            rowId,
            row,
            formGroup,
            values: formGroup.value,
            valid: formGroup.valid,
            dirty: formGroup.dirty
          });
        }
      }
    }
  }
  /**
   * Handles row-commit events.
   * - Prevents commit if FormGroup is invalid (when syncValidation is true)
   * - Syncs FormGroup values back to the row
   * - Cleans up FormGroup if keepFormGroups is false
   */
  #handleRowCommit(event, detail) {
    const {
      rowIndex,
      rowId
    } = detail;
    const grid = this.elementRef.nativeElement;
    const rows = grid?.rows;
    if (!rows || rowIndex < 0 || rowIndex >= rows.length) return;
    const row = rows[rowIndex];
    const formGroup = this.formGroupCache.get(row);
    if (!formGroup) return;
    if (this.syncValidation() && formGroup.invalid) {
      formGroup.markAllAsTouched();
      event.preventDefault();
      return;
    }
    if (formGroup.dirty) {
      const formValue = formGroup.value;
      Object.keys(formValue).forEach((field) => {
        if (field in row) {
          row[field] = formValue[field];
        }
      });
    }
    if (!this.keepFormGroups()) {
      this.formGroupCache.delete(row);
      this.rowIndexMap.delete(row);
      if (rowId) {
        const editingPlugin = grid.getPluginByName?.("editing");
        editingPlugin?.clearRowInvalid(rowId);
      }
    }
  }
  // #endregion
  // #region Validation Sync
  /**
   * Syncs a FormControl's validation state to the grid's visual invalid styling.
   */
  #syncControlValidationToGrid(rowId, field, control) {
    const grid = this.elementRef.nativeElement;
    if (!grid) return;
    const editingPlugin = grid.getPluginByName?.("editing");
    if (!editingPlugin) return;
    if (control.invalid) {
      const errorMessage = this.#getFirstErrorMessage(control);
      editingPlugin.setInvalid(rowId, field, errorMessage);
    } else {
      editingPlugin.clearInvalid(rowId, field);
    }
  }
  /**
   * Gets a human-readable error message from the first validation error.
   */
  #getFirstErrorMessage(control) {
    const errors = control.errors;
    if (!errors) return "";
    const firstKey = Object.keys(errors)[0];
    const error = errors[firstKey];
    switch (firstKey) {
      case "required":
        return "This field is required";
      case "minlength":
        return `Minimum length is ${error.requiredLength}`;
      case "maxlength":
        return `Maximum length is ${error.requiredLength}`;
      case "min":
        return `Minimum value is ${error.min}`;
      case "max":
        return `Maximum value is ${error.max}`;
      case "email":
        return "Invalid email address";
      case "pattern":
        return "Invalid format";
      default:
        return typeof error === "string" ? error : error?.message ?? `Validation error: ${firstKey}`;
    }
  }
  // #endregion
  // #region Public API
  /**
   * Gets the FormGroup for a row, if it exists.
   * Unlike the context methods, this does NOT create a FormGroup lazily.
   *
   * @param rowIndex The row index
   * @returns The FormGroup or undefined
   */
  getFormGroup(rowIndex) {
    return this.#getRowFormGroup(rowIndex);
  }
  /**
   * Gets all cached FormGroups.
   * Useful for bulk validation or inspection.
   *
   * @returns Map of row objects to their FormGroups
   */
  getAllFormGroups() {
    return this.formGroupCache;
  }
  /**
   * Clears all cached FormGroups.
   * Useful when the underlying data changes significantly.
   */
  clearAllFormGroups() {
    this.formGroupCache.clear();
    this.rowIndexMap.clear();
  }
  /**
   * Validates all currently cached FormGroups.
   *
   * @returns true if all FormGroups are valid, false otherwise
   */
  validateAll() {
    for (const formGroup of this.formGroupCache.values()) {
      if (formGroup.invalid) {
        formGroup.markAllAsTouched();
        return false;
      }
    }
    return true;
  }
  static ɵfac = function GridLazyForm_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GridLazyForm)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _GridLazyForm,
    selectors: [["tbw-grid", "lazyForm", ""]],
    inputs: {
      lazyForm: [1, "lazyForm"],
      syncValidation: [1, "syncValidation"],
      keepFormGroups: [1, "keepFormGroups"]
    },
    outputs: {
      rowFormChange: "rowFormChange"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GridLazyForm, [{
    type: Directive,
    args: [{
      selector: "tbw-grid[lazyForm]"
    }]
  }], null, {
    lazyForm: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "lazyForm",
        required: true
      }]
    }],
    syncValidation: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "syncValidation",
        required: false
      }]
    }],
    keepFormGroups: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "keepFormGroups",
        required: false
      }]
    }],
    rowFormChange: [{
      type: Output,
      args: ["rowFormChange"]
    }]
  });
})();
var TbwGridToolButtons = class _TbwGridToolButtons {
  static ɵfac = function TbwGridToolButtons_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TbwGridToolButtons)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _TbwGridToolButtons,
    selectors: [["tbw-grid-tool-buttons"]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TbwGridToolButtons, [{
    type: Directive,
    args: [{
      selector: "tbw-grid-tool-buttons"
    }]
  }], null, null);
})();
var Grid = class _Grid {
  elementRef = inject(ElementRef);
  injector = inject(EnvironmentInjector);
  appRef = inject(ApplicationRef);
  viewContainerRef = inject(ViewContainerRef);
  iconRegistry = inject(GridIconRegistry, {
    optional: true
  });
  adapter = null;
  constructor() {
    effect(() => {
      const deprecatedAngularConfig = this.angularConfig();
      const userGridConfig = this.gridConfig();
      if (deprecatedAngularConfig && !userGridConfig) {
        console.warn("[tbw-grid] The [angularConfig] input is deprecated. Use [gridConfig] instead. The gridConfig input now accepts GridConfig directly.");
      }
      const angularCfg = userGridConfig ?? deprecatedAngularConfig;
      if (!this.adapter) return;
      const featurePlugins = this.createFeaturePlugins();
      const sortableValue = this.sortable();
      const filterableValue = this.filterable();
      const selectableValue = this.selectable();
      const coreConfigOverrides = {};
      if (sortableValue !== void 0) {
        coreConfigOverrides["sortable"] = sortableValue;
      }
      if (filterableValue !== void 0) {
        coreConfigOverrides["filterable"] = filterableValue;
      }
      if (selectableValue !== void 0) {
        coreConfigOverrides["selectable"] = selectableValue;
      }
      const grid = this.elementRef.nativeElement;
      const registryIcons = this.iconRegistry?.getAll();
      if (registryIcons && Object.keys(registryIcons).length > 0) {
        const existingIcons = angularCfg?.icons || {};
        coreConfigOverrides["icons"] = __spreadValues(__spreadValues({}, registryIcons), existingIcons);
      }
      const hasFeaturePlugins = featurePlugins.length > 0;
      const hasConfigOverrides = Object.keys(coreConfigOverrides).length > 0;
      if (!angularCfg && !hasFeaturePlugins && !hasConfigOverrides) {
        return;
      }
      const userConfig = angularCfg || {};
      const configPlugins = userConfig.plugins || [];
      const mergedPlugins = [...featurePlugins, ...configPlugins];
      grid.gridConfig = __spreadProps(__spreadValues(__spreadValues({}, userConfig), coreConfigOverrides), {
        plugins: mergedPlugins.length > 0 ? mergedPlugins : userConfig.plugins
      });
    });
    effect(() => {
      const loadingValue = this.loading();
      if (loadingValue === void 0) return;
      const grid = this.elementRef.nativeElement;
      grid.loading = loadingValue;
    });
    effect(() => {
      const rowsValue = this.rows();
      if (rowsValue === void 0) return;
      const grid = this.elementRef.nativeElement;
      grid.rows = rowsValue;
    });
    effect(() => {
      const columnsValue = this.columns();
      if (columnsValue === void 0) return;
      const grid = this.elementRef.nativeElement;
      const processed = this.adapter ? columnsValue.map((col) => this.adapter.processColumn(col)) : columnsValue;
      grid.columns = processed;
    });
    effect(() => {
      const fitModeValue = this.fitMode();
      if (fitModeValue === void 0) return;
      const grid = this.elementRef.nativeElement;
      grid.fitMode = fitModeValue;
    });
  }
  /**
   * Custom CSS styles to inject into the grid.
   * Use this to style custom cell renderers, editors, or detail panels.
   *
   * @example
   * ```typescript
   * // In your component
   * customStyles = `
   *   .my-detail-panel { padding: 16px; }
   *   .my-status-badge { border-radius: 4px; }
   * `;
   * ```
   *
   * ```html
   * <tbw-grid [customStyles]="customStyles">...</tbw-grid>
   * ```
   */
  customStyles = input(...ngDevMode ? [void 0, {
    debugName: "customStyles"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Grid-wide sorting toggle.
   * When false, disables sorting for all columns regardless of their individual `sortable` setting.
   * When true (default), columns with `sortable: true` can be sorted.
   *
   * This is a core grid config property, not a plugin feature.
   * For multi-column sorting, also add the `[multiSort]` feature.
   *
   * @default true
   *
   * @example
   * ```html
   * <!-- Disable all sorting -->
   * <tbw-grid [sortable]="false" />
   *
   * <!-- Enable sorting (default) - columns still need sortable: true -->
   * <tbw-grid [sortable]="true" />
   *
   * <!-- Enable multi-column sorting -->
   * <tbw-grid [sortable]="true" [multiSort]="true" />
   * ```
   */
  sortable = input(...ngDevMode ? [void 0, {
    debugName: "sortable"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Grid-wide filtering toggle.
   * When false, disables filtering for all columns regardless of their individual `filterable` setting.
   * When true (default), columns with `filterable: true` can be filtered.
   *
   * Requires the FilteringPlugin to be loaded.
   *
   * @default true
   *
   * @example
   * ```html
   * <!-- Disable all filtering -->
   * <tbw-grid [filterable]="false" [filtering]="true" />
   *
   * <!-- Enable filtering (default) -->
   * <tbw-grid [filterable]="true" [filtering]="true" />
   * ```
   */
  filterable = input(...ngDevMode ? [void 0, {
    debugName: "filterable"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Grid-wide selection toggle.
   * When false, disables selection for all rows/cells.
   * When true (default), selection is enabled based on plugin mode.
   *
   * Requires the SelectionPlugin to be loaded.
   *
   * @default true
   *
   * @example
   * ```html
   * <!-- Disable all selection -->
   * <tbw-grid [selectable]="false" [selection]="'range'" />
   *
   * <!-- Enable selection (default) -->
   * <tbw-grid [selectable]="true" [selection]="'range'" />
   * ```
   */
  selectable = input(...ngDevMode ? [void 0, {
    debugName: "selectable"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Show a loading overlay on the grid.
   * Use this during initial data fetch or refresh operations.
   *
   * For row/cell loading states, access the grid element directly:
   * - `grid.setRowLoading(rowId, true/false)`
   * - `grid.setCellLoading(rowId, field, true/false)`
   *
   * @default false
   *
   * @example
   * ```html
   * <!-- Show loading during data fetch -->
   * <tbw-grid [loading]="isLoading" [rows]="rows" />
   * ```
   *
   * ```typescript
   * isLoading = true;
   *
   * ngOnInit() {
   *   this.dataService.fetchData().subscribe(data => {
   *     this.rows = data;
   *     this.isLoading = false;
   *   });
   * }
   * ```
   */
  loading = input(...ngDevMode ? [void 0, {
    debugName: "loading"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * The data rows to display in the grid.
   *
   * Accepts an array of data objects. Each object represents one row.
   * The grid reads property values for each column's `field` from these objects.
   *
   * @example
   * ```html
   * <tbw-grid [rows]="employees()" [gridConfig]="config" />
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows = input(...ngDevMode ? [void 0, {
    debugName: "rows"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Column configuration array.
   *
   * Shorthand for setting columns without wrapping them in a full `gridConfig`.
   * If both `columns` and `gridConfig.columns` are set, `columns` takes precedence
   * (see configuration precedence system).
   *
   * @example
   * ```html
   * <tbw-grid [rows]="data" [columns]="[
   *   { field: 'id', header: 'ID', pinned: 'left', width: 80 },
   *   { field: 'name', header: 'Name' },
   *   { field: 'email', header: 'Email' }
   * ]" />
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns = input(...ngDevMode ? [void 0, {
    debugName: "columns"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Column sizing strategy.
   *
   * - `'stretch'` (default) — columns stretch to fill available width
   * - `'fixed'` — columns use their declared widths; enables horizontal scrolling
   * - `'auto-fit'` — columns auto-size to content, then stretch to fill
   *
   * @default 'stretch'
   *
   * @example
   * ```html
   * <tbw-grid [rows]="data" fitMode="fixed" />
   * <tbw-grid [rows]="data" [fitMode]="dynamicMode()" />
   * ```
   */
  fitMode = input(...ngDevMode ? [void 0, {
    debugName: "fitMode"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Grid configuration object with optional Angular-specific extensions.
   *
   * Accepts Angular-augmented `GridConfig` from `@toolbox-web/grid-angular`.
   * You can specify Angular component classes directly for renderers and editors.
   *
   * Component classes must implement the appropriate interfaces:
   * - Renderers: `CellRenderer<TRow, TValue>` - requires `value()` and `row()` signal inputs
   * - Editors: `CellEditor<TRow, TValue>` - adds `commit` and `cancel` outputs
   *
   * @example
   * ```typescript
   * // Simple config with plain renderers
   * config: GridConfig = {
   *   columns: [
   *     { field: 'name', header: 'Name' },
   *     { field: 'active', type: 'boolean' }
   *   ],
   *   typeDefaults: {
   *     boolean: { renderer: (ctx) => ctx.value ? '✓' : '✗' }
   *   }
   * };
   *
   * // Config with component classes
   * config: GridConfig<Employee> = {
   *   columns: [
   *     { field: 'name', header: 'Name' },
   *     { field: 'bonus', header: 'Bonus', editable: true, editor: BonusEditorComponent }
   *   ]
   * };
   * ```
   *
   * ```html
   * <tbw-grid [gridConfig]="config" [rows]="employees"></tbw-grid>
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gridConfig = input(...ngDevMode ? [void 0, {
    debugName: "gridConfig"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * @deprecated Use `gridConfig` instead. This input will be removed in v2.
   *
   * The `angularConfig` name was inconsistent with React and Vue adapters, which both use `gridConfig`.
   * The `gridConfig` input now accepts `GridConfig` directly.
   *
   * ```html
   * <!-- Before -->
   * <tbw-grid [angularConfig]="config" />
   *
   * <!-- After -->
   * <tbw-grid [gridConfig]="config" />
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  angularConfig = input(...ngDevMode ? [void 0, {
    debugName: "angularConfig"
  }] : (
    /* istanbul ignore next */
    []
  ));
  // ═══════════════════════════════════════════════════════════════════════════
  // FEATURE INPUTS - Declarative plugin configuration
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Enable cell/row/range selection.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/selection';
   * ```
   *
   * @example
   * ```html
   * <!-- Shorthand - just the mode -->
   * <tbw-grid [selection]="'range'" />
   *
   * <!-- Full config object -->
   * <tbw-grid [selection]="{ mode: 'range', checkbox: true }" />
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selection = input(...ngDevMode ? [void 0, {
    debugName: "selection"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable inline cell editing.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/editing';
   * ```
   *
   * @example
   * ```html
   * <!-- Enable with default trigger (dblclick) -->
   * <tbw-grid [editing]="true" />
   *
   * <!-- Specify trigger -->
   * <tbw-grid [editing]="'click'" />
   * <tbw-grid [editing]="'dblclick'" />
   * <tbw-grid [editing]="'manual'" />
   *
   * <!-- Full config with callbacks -->
   * <tbw-grid [editing]="{ editOn: 'dblclick', onBeforeEditClose: myCallback }" />
   * ```
   */
  editing = input(...ngDevMode ? [void 0, {
    debugName: "editing"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable clipboard copy/paste. Requires selection to be enabled.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/clipboard';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [selection]="'range'" [clipboard]="true" />
   * ```
   */
  clipboard = input(...ngDevMode ? [void 0, {
    debugName: "clipboard"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable right-click context menu.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/context-menu';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [contextMenu]="true" />
   * ```
   */
  contextMenu = input(...ngDevMode ? [void 0, {
    debugName: "contextMenu"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable multi-column sorting.
   *
   * Multi-sort allows users to sort by multiple columns simultaneously.
   * For basic single-column sorting, columns with `sortable: true` work without this plugin.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/multi-sort';
   * ```
   *
   * @example
   * ```html
   * <!-- Enable multi-column sorting -->
   * <tbw-grid [multiSort]="true" />
   *
   * <!-- Limit to single column (uses plugin but restricts to 1 column) -->
   * <tbw-grid [multiSort]="'single'" />
   *
   * <!-- Full config -->
   * <tbw-grid [multiSort]="{ maxSortColumns: 3 }" />
   * ```
   */
  multiSort = input(...ngDevMode ? [void 0, {
    debugName: "multiSort"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * @deprecated Use `[multiSort]` instead. Will be removed in v2.
   *
   * Enable column sorting. This is an alias for `[multiSort]`.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/multi-sort';
   * ```
   */
  sorting = input(...ngDevMode ? [void 0, {
    debugName: "sorting"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable column filtering.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/filtering';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [filtering]="true" />
   * <tbw-grid [filtering]="{ debounceMs: 200 }" />
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filtering = input(...ngDevMode ? [void 0, {
    debugName: "filtering"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable column drag-to-reorder.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/reorder-columns';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [reorderColumns]="true" />
   * ```
   */
  reorderColumns = input(...ngDevMode ? [void 0, {
    debugName: "reorderColumns"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * @deprecated Use `reorderColumns` instead. Will be removed in v2.
   */
  reorder = input(...ngDevMode ? [void 0, {
    debugName: "reorder"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable column visibility toggle panel.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/visibility';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [visibility]="true" />
   * ```
   */
  visibility = input(...ngDevMode ? [void 0, {
    debugName: "visibility"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable pinned/sticky columns.
   * Columns are pinned via the `sticky` column property.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/pinned-columns';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [pinnedColumns]="true" [columns]="[
   *   { field: 'id', pinned: 'left' },
   *   { field: 'name' },
   *   { field: 'actions', pinned: 'right' }
   * ]" />
   * ```
   */
  pinnedColumns = input(...ngDevMode ? [void 0, {
    debugName: "pinnedColumns"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable multi-level column headers (column groups).
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/grouping-columns';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [groupingColumns]="true" />
   * ```
   */
  groupingColumns = input(...ngDevMode ? [void 0, {
    debugName: "groupingColumns"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable horizontal column virtualization for wide grids.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/column-virtualization';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [columnVirtualization]="true" />
   * ```
   */
  columnVirtualization = input(...ngDevMode ? [void 0, {
    debugName: "columnVirtualization"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable row drag-to-reorder.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/reorder-rows';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [reorderRows]="true" />
   * ```
   */
  reorderRows = input(...ngDevMode ? [void 0, {
    debugName: "reorderRows"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * @deprecated Use `reorderRows` instead. Will be removed in v2.0.
   */
  rowReorder = input(...ngDevMode ? [void 0, {
    debugName: "rowReorder"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable row grouping by field values.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/grouping-rows';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [groupingRows]="{ groupBy: ['department'] }" />
   * ```
   */
  groupingRows = input(...ngDevMode ? [void 0, {
    debugName: "groupingRows"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable pinned rows (aggregation/status bar).
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/pinned-rows';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [pinnedRows]="{ bottom: [{ type: 'aggregation' }] }" />
   * ```
   */
  pinnedRows = input(...ngDevMode ? [void 0, {
    debugName: "pinnedRows"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable hierarchical tree view.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/tree';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [tree]="{ childrenField: 'children' }" />
   * ```
   */
  tree = input(...ngDevMode ? [void 0, {
    debugName: "tree"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable master-detail expandable rows.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/master-detail';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [masterDetail]="{ detailRenderer: detailFn }" />
   * ```
   */
  masterDetail = input(...ngDevMode ? [void 0, {
    debugName: "masterDetail"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable responsive card layout for narrow viewports.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/responsive';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [responsive]="{ breakpoint: 768 }" />
   * ```
   */
  responsive = input(...ngDevMode ? [void 0, {
    debugName: "responsive"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable undo/redo for cell edits. Requires editing to be enabled.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/undo-redo';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [editing]="'dblclick'" [undoRedo]="true" />
   * ```
   */
  undoRedo = input(...ngDevMode ? [void 0, {
    debugName: "undoRedo"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable CSV/JSON export functionality.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/export';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [export]="true" />
   * <tbw-grid [export]="{ filename: 'data.csv' }" />
   * ```
   */
  exportFeature = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "exportFeature"
  } : (
    /* istanbul ignore next */
    {}
  )), {
    alias: "export"
  }));
  /**
   * Enable print functionality.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/print';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [print]="true" />
   * ```
   */
  print = input(...ngDevMode ? [void 0, {
    debugName: "print"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable pivot table functionality.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/pivot';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [pivot]="{ rowFields: ['category'], valueField: 'sales' }" />
   * ```
   */
  pivot = input(...ngDevMode ? [void 0, {
    debugName: "pivot"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Enable server-side data operations.
   *
   * **Requires feature import:**
   * ```typescript
   * import '@toolbox-web/grid-angular/features/server-side';
   * ```
   *
   * @example
   * ```html
   * <tbw-grid [serverSide]="{ dataSource: fetchDataFn }" />
   * ```
   */
  serverSide = input(...ngDevMode ? [void 0, {
    debugName: "serverSide"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Controls the tooltip behavior for the grid.
   *
   * @example
   * ```html
   * <tbw-grid [tooltip]="true" />
   * <tbw-grid [tooltip]="{ header: true, cell: false }" />
   * ```
   */
  tooltip = input(...ngDevMode ? [void 0, {
    debugName: "tooltip"
  }] : (
    /* istanbul ignore next */
    []
  ));
  // ═══════════════════════════════════════════════════════════════════════════
  // EVENT OUTPUTS - All grid events
  // ═══════════════════════════════════════════════════════════════════════════
  /**
   * Emitted when a cell is clicked.
   *
   * @example
   * ```html
   * <tbw-grid (cellClick)="onCellClick($event)">...</tbw-grid>
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cellClick = output();
  /**
   * Emitted when a row is clicked.
   *
   * @example
   * ```html
   * <tbw-grid (rowClick)="onRowClick($event)">...</tbw-grid>
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowClick = output();
  /**
   * Emitted when a cell is activated (Enter key or double-click).
   *
   * @example
   * ```html
   * <tbw-grid (cellActivate)="onCellActivate($event)">...</tbw-grid>
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cellActivate = output();
  /**
   * Emitted when a cell value changes (before commit).
   *
   * @example
   * ```html
   * <tbw-grid (cellChange)="onCellChange($event)">...</tbw-grid>
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cellChange = output();
  /**
   * Emitted when a cell value is committed (inline editing).
   * Provides the row, field, new value, and change tracking information.
   *
   * @example
   * ```html
   * <tbw-grid (cellCommit)="onCellCommit($event)">...</tbw-grid>
   * ```
   *
   * ```typescript
   * onCellCommit(event: CellCommitEvent) {
   *   console.log(`Changed ${event.field} to ${event.value} in row ${event.rowIndex}`);
   * }
   * ```
   */
  cellCommit = output();
  /**
   * Emitted when a row's values are committed (bulk/row editing).
   * Provides the row data and change tracking information.
   *
   * @example
   * ```html
   * <tbw-grid (rowCommit)="onRowCommit($event)">...</tbw-grid>
   * ```
   */
  rowCommit = output();
  /**
   * Emitted when the changed rows are reset.
   *
   * @example
   * ```html
   * <tbw-grid (changedRowsReset)="onChangedRowsReset($event)">...</tbw-grid>
   * ```
   */
  changedRowsReset = output();
  /**
   * Emitted when sort state changes.
   *
   * @example
   * ```html
   * <tbw-grid (sortChange)="onSortChange($event)">...</tbw-grid>
   * ```
   */
  sortChange = output();
  /**
   * Emitted when filter values change.
   *
   * @example
   * ```html
   * <tbw-grid (filterChange)="onFilterChange($event)">...</tbw-grid>
   * ```
   */
  filterChange = output();
  /**
   * Emitted when a column is resized.
   *
   * @example
   * ```html
   * <tbw-grid (columnResize)="onColumnResize($event)">...</tbw-grid>
   * ```
   */
  columnResize = output();
  /**
   * Emitted when a column is moved via drag-and-drop.
   *
   * @example
   * ```html
   * <tbw-grid (columnMove)="onColumnMove($event)">...</tbw-grid>
   * ```
   */
  columnMove = output();
  /**
   * Emitted when column visibility changes.
   *
   * @example
   * ```html
   * <tbw-grid (columnVisibility)="onColumnVisibility($event)">...</tbw-grid>
   * ```
   */
  columnVisibility = output();
  /**
   * Emitted when column state changes (resize, reorder, visibility).
   *
   * @example
   * ```html
   * <tbw-grid (columnStateChange)="onColumnStateChange($event)">...</tbw-grid>
   * ```
   */
  columnStateChange = output();
  /**
   * Emitted when selection changes.
   *
   * @example
   * ```html
   * <tbw-grid (selectionChange)="onSelectionChange($event)">...</tbw-grid>
   * ```
   */
  selectionChange = output();
  /**
   * Emitted when a row is moved via drag-and-drop.
   *
   * @example
   * ```html
   * <tbw-grid (rowMove)="onRowMove($event)">...</tbw-grid>
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowMove = output();
  /**
   * Emitted when a group is expanded or collapsed.
   *
   * @example
   * ```html
   * <tbw-grid (groupToggle)="onGroupToggle($event)">...</tbw-grid>
   * ```
   */
  groupToggle = output();
  /**
   * Emitted when a tree node is expanded.
   *
   * @example
   * ```html
   * <tbw-grid (treeExpand)="onTreeExpand($event)">...</tbw-grid>
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  treeExpand = output();
  /**
   * Emitted when a detail panel is expanded or collapsed.
   *
   * @example
   * ```html
   * <tbw-grid (detailExpand)="onDetailExpand($event)">...</tbw-grid>
   * ```
   */
  detailExpand = output();
  /**
   * Emitted when responsive mode changes (table ↔ card).
   *
   * @example
   * ```html
   * <tbw-grid (responsiveChange)="onResponsiveChange($event)">...</tbw-grid>
   * ```
   */
  responsiveChange = output();
  /**
   * Emitted when cells are copied to clipboard.
   *
   * @example
   * ```html
   * <tbw-grid (copy)="onCopy($event)">...</tbw-grid>
   * ```
   */
  copy = output();
  /**
   * Emitted when cells are pasted from clipboard.
   *
   * @example
   * ```html
   * <tbw-grid (paste)="onPaste($event)">...</tbw-grid>
   * ```
   */
  paste = output();
  /**
   * Emitted when undo/redo is performed.
   *
   * @example
   * ```html
   * <tbw-grid (undoRedoAction)="onUndoRedo($event)">...</tbw-grid>
   * ```
   */
  undoRedoAction = output();
  /**
   * Emitted when export completes.
   *
   * @example
   * ```html
   * <tbw-grid (exportComplete)="onExportComplete($event)">...</tbw-grid>
   * ```
   */
  exportComplete = output();
  /**
   * Emitted when print starts.
   *
   * @example
   * ```html
   * <tbw-grid (printStart)="onPrintStart($event)">...</tbw-grid>
   * ```
   */
  printStart = output();
  /**
   * Emitted when print completes.
   *
   * @example
   * ```html
   * <tbw-grid (printComplete)="onPrintComplete($event)">...</tbw-grid>
   * ```
   */
  printComplete = output();
  // Map of output names to event names for automatic wiring
  eventOutputMap = {
    cellClick: "cell-click",
    rowClick: "row-click",
    cellActivate: "cell-activate",
    cellChange: "cell-change",
    cellCommit: "cell-commit",
    rowCommit: "row-commit",
    changedRowsReset: "changed-rows-reset",
    sortChange: "sort-change",
    filterChange: "filter-change",
    columnResize: "column-resize",
    columnMove: "column-move",
    columnVisibility: "column-visibility",
    columnStateChange: "column-state-change",
    selectionChange: "selection-change",
    rowMove: "row-move",
    groupToggle: "group-toggle",
    treeExpand: "tree-expand",
    detailExpand: "detail-expand",
    responsiveChange: "responsive-change",
    copy: "copy",
    paste: "paste",
    undoRedoAction: "undo-redo",
    exportComplete: "export-complete",
    printStart: "print-start",
    printComplete: "print-complete"
  };
  // Store event listeners for cleanup
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  eventListeners = /* @__PURE__ */ new Map();
  ngOnInit() {
    this.adapter = new GridAdapter(this.injector, this.appRef, this.viewContainerRef);
    It.registerAdapter(this.adapter);
    const grid = this.elementRef.nativeElement;
    grid.__frameworkAdapter = this.adapter;
    this.setupEventListeners(grid);
  }
  /**
   * Sets up event listeners for all outputs using the eventOutputMap.
   */
  setupEventListeners(grid) {
    for (const [outputName, eventName] of Object.entries(this.eventOutputMap)) {
      const listener = (e) => {
        const detail = e.detail;
        this[outputName].emit(detail);
      };
      grid.addEventListener(eventName, listener);
      this.eventListeners.set(eventName, listener);
    }
  }
  /**
   * Creates plugins from feature inputs.
   * Uses the feature registry to allow tree-shaking - only imported features are bundled.
   * Returns the array of created plugins (doesn't modify grid).
   */
  createFeaturePlugins() {
    const plugins = [];
    const addPlugin = (name, config) => {
      if (config === void 0 || config === null || config === false) return;
      const plugin = a(name, config);
      if (plugin) plugins.push(plugin);
    };
    addPlugin("selection", this.selection());
    addPlugin("editing", this.editing());
    addPlugin("clipboard", this.clipboard());
    addPlugin("contextMenu", this.contextMenu());
    addPlugin("multiSort", this.multiSort() ?? this.sorting());
    addPlugin("filtering", this.filtering());
    addPlugin("reorderColumns", this.reorderColumns() ?? this.reorder());
    addPlugin("visibility", this.visibility());
    addPlugin("pinnedColumns", this.pinnedColumns());
    const gcConfig = this.groupingColumns();
    if (gcConfig && typeof gcConfig === "object" && this.adapter) {
      addPlugin("groupingColumns", this.adapter.processGroupingColumnsConfig(gcConfig));
    } else {
      addPlugin("groupingColumns", gcConfig);
    }
    addPlugin("columnVirtualization", this.columnVirtualization());
    addPlugin("reorderRows", this.reorderRows() ?? this.rowReorder());
    const grConfig = this.groupingRows();
    if (grConfig && typeof grConfig === "object" && this.adapter) {
      addPlugin("groupingRows", this.adapter.processGroupingRowsConfig(grConfig));
    } else {
      addPlugin("groupingRows", grConfig);
    }
    const prConfig = this.pinnedRows();
    if (prConfig && typeof prConfig === "object" && this.adapter) {
      addPlugin("pinnedRows", this.adapter.processPinnedRowsConfig(prConfig));
    } else {
      addPlugin("pinnedRows", prConfig);
    }
    addPlugin("tree", this.tree());
    addPlugin("masterDetail", this.masterDetail());
    addPlugin("responsive", this.responsive());
    addPlugin("undoRedo", this.undoRedo());
    addPlugin("export", this.exportFeature());
    addPlugin("print", this.print());
    addPlugin("pivot", this.pivot());
    addPlugin("serverSide", this.serverSide());
    addPlugin("tooltip", this.tooltip());
    return plugins;
  }
  ngAfterContentInit() {
    const grid = this.elementRef.nativeElement;
    if (grid && typeof grid.refreshColumns === "function") {
      setTimeout(() => {
        grid.refreshColumns();
        this.configureMasterDetail(grid);
        this.configureResponsiveCard(grid);
        if (typeof grid.refreshShellHeader === "function") {
          grid.refreshShellHeader();
        }
        this.registerCustomStyles(grid);
      }, 0);
    }
  }
  /**
   * Registers custom styles into the grid.
   * Uses the grid's registerStyles() API for clean encapsulation.
   */
  registerCustomStyles(grid) {
    const styles = this.customStyles();
    if (!styles) return;
    grid.ready?.().then(() => {
      grid.registerStyles?.("angular-custom-styles", styles);
    });
  }
  /**
   * Configures the MasterDetailPlugin after Angular templates are registered.
   * - If plugin exists: refresh its detail renderer
   * - If plugin doesn't exist but <tbw-grid-detail> is present: dynamically import and add the plugin
   */
  async configureMasterDetail(grid) {
    if (!this.adapter) return;
    const existingPlugin = grid.gridConfig?.plugins?.find((p) => p.name === "masterDetail");
    if (existingPlugin && typeof existingPlugin.refreshDetailRenderer === "function") {
      existingPlugin.refreshDetailRenderer();
      return;
    }
    const detailElement = grid.querySelector("tbw-grid-detail");
    if (!detailElement) return;
    const detailRenderer = this.adapter.createDetailRenderer(grid);
    if (!detailRenderer) return;
    const animationAttr = detailElement.getAttribute("animation");
    let animation = "slide";
    if (animationAttr === "false") {
      animation = false;
    } else if (animationAttr === "fade") {
      animation = "fade";
    }
    const showExpandColumn = detailElement.getAttribute("showExpandColumn") !== "false";
    const {
      MasterDetailPlugin
    } = await import("./master-detail-B6BTBNTB.js");
    const plugin = new MasterDetailPlugin({
      detailRenderer,
      showExpandColumn,
      animation
    });
    const currentConfig = grid.gridConfig || {};
    const existingPlugins = currentConfig.plugins || [];
    grid.gridConfig = __spreadProps(__spreadValues({}, currentConfig), {
      plugins: [...existingPlugins, plugin]
    });
  }
  /**
   * Configures the ResponsivePlugin with Angular template-based card renderer.
   * - If plugin exists: updates its cardRenderer configuration
   * - If plugin doesn't exist but <tbw-grid-responsive-card> is present: logs a warning
   */
  configureResponsiveCard(grid) {
    if (!this.adapter) return;
    const cardElement = grid.querySelector("tbw-grid-responsive-card");
    if (!cardElement) return;
    const cardRenderer = this.adapter.createResponsiveCardRenderer(grid);
    if (!cardRenderer) return;
    const existingPlugin = grid.gridConfig?.plugins?.find((p) => p.name === "responsive");
    if (existingPlugin && typeof existingPlugin.setCardRenderer === "function") {
      existingPlugin.setCardRenderer(cardRenderer);
      return;
    }
    console.warn('[tbw-grid-angular] <tbw-grid-responsive-card> found but ResponsivePlugin is not configured.\nAdd ResponsivePlugin to your gridConfig.plugins array:\n\n  import { ResponsivePlugin } from "@toolbox-web/grid/plugins/responsive";\n  gridConfig = {\n    plugins: [new ResponsivePlugin({ breakpoint: 600 })]\n  };');
  }
  ngOnDestroy() {
    const grid = this.elementRef.nativeElement;
    if (grid) {
      for (const [eventName, listener] of this.eventListeners) {
        grid.removeEventListener(eventName, listener);
      }
      this.eventListeners.clear();
    }
    if (grid && this.customStyles()) {
      grid.unregisterStyles?.("angular-custom-styles");
    }
    if (this.adapter) {
      this.adapter.destroy?.();
      this.adapter = null;
    }
  }
  static ɵfac = function Grid_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Grid)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _Grid,
    selectors: [["tbw-grid"]],
    inputs: {
      customStyles: [1, "customStyles"],
      sortable: [1, "sortable"],
      filterable: [1, "filterable"],
      selectable: [1, "selectable"],
      loading: [1, "loading"],
      rows: [1, "rows"],
      columns: [1, "columns"],
      fitMode: [1, "fitMode"],
      gridConfig: [1, "gridConfig"],
      angularConfig: [1, "angularConfig"],
      selection: [1, "selection"],
      editing: [1, "editing"],
      clipboard: [1, "clipboard"],
      contextMenu: [1, "contextMenu"],
      multiSort: [1, "multiSort"],
      sorting: [1, "sorting"],
      filtering: [1, "filtering"],
      reorderColumns: [1, "reorderColumns"],
      reorder: [1, "reorder"],
      visibility: [1, "visibility"],
      pinnedColumns: [1, "pinnedColumns"],
      groupingColumns: [1, "groupingColumns"],
      columnVirtualization: [1, "columnVirtualization"],
      reorderRows: [1, "reorderRows"],
      rowReorder: [1, "rowReorder"],
      groupingRows: [1, "groupingRows"],
      pinnedRows: [1, "pinnedRows"],
      tree: [1, "tree"],
      masterDetail: [1, "masterDetail"],
      responsive: [1, "responsive"],
      undoRedo: [1, "undoRedo"],
      exportFeature: [1, "export", "exportFeature"],
      print: [1, "print"],
      pivot: [1, "pivot"],
      serverSide: [1, "serverSide"],
      tooltip: [1, "tooltip"]
    },
    outputs: {
      cellClick: "cellClick",
      rowClick: "rowClick",
      cellActivate: "cellActivate",
      cellChange: "cellChange",
      cellCommit: "cellCommit",
      rowCommit: "rowCommit",
      changedRowsReset: "changedRowsReset",
      sortChange: "sortChange",
      filterChange: "filterChange",
      columnResize: "columnResize",
      columnMove: "columnMove",
      columnVisibility: "columnVisibility",
      columnStateChange: "columnStateChange",
      selectionChange: "selectionChange",
      rowMove: "rowMove",
      groupToggle: "groupToggle",
      treeExpand: "treeExpand",
      detailExpand: "detailExpand",
      responsiveChange: "responsiveChange",
      copy: "copy",
      paste: "paste",
      undoRedoAction: "undoRedoAction",
      exportComplete: "exportComplete",
      printStart: "printStart",
      printComplete: "printComplete"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Grid, [{
    type: Directive,
    args: [{
      selector: "tbw-grid"
    }]
  }], () => [], {
    customStyles: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "customStyles",
        required: false
      }]
    }],
    sortable: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "sortable",
        required: false
      }]
    }],
    filterable: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "filterable",
        required: false
      }]
    }],
    selectable: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "selectable",
        required: false
      }]
    }],
    loading: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "loading",
        required: false
      }]
    }],
    rows: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "rows",
        required: false
      }]
    }],
    columns: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "columns",
        required: false
      }]
    }],
    fitMode: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "fitMode",
        required: false
      }]
    }],
    gridConfig: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "gridConfig",
        required: false
      }]
    }],
    angularConfig: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "angularConfig",
        required: false
      }]
    }],
    selection: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "selection",
        required: false
      }]
    }],
    editing: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "editing",
        required: false
      }]
    }],
    clipboard: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "clipboard",
        required: false
      }]
    }],
    contextMenu: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "contextMenu",
        required: false
      }]
    }],
    multiSort: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "multiSort",
        required: false
      }]
    }],
    sorting: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "sorting",
        required: false
      }]
    }],
    filtering: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "filtering",
        required: false
      }]
    }],
    reorderColumns: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "reorderColumns",
        required: false
      }]
    }],
    reorder: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "reorder",
        required: false
      }]
    }],
    visibility: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "visibility",
        required: false
      }]
    }],
    pinnedColumns: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pinnedColumns",
        required: false
      }]
    }],
    groupingColumns: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "groupingColumns",
        required: false
      }]
    }],
    columnVirtualization: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "columnVirtualization",
        required: false
      }]
    }],
    reorderRows: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "reorderRows",
        required: false
      }]
    }],
    rowReorder: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "rowReorder",
        required: false
      }]
    }],
    groupingRows: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "groupingRows",
        required: false
      }]
    }],
    pinnedRows: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pinnedRows",
        required: false
      }]
    }],
    tree: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "tree",
        required: false
      }]
    }],
    masterDetail: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "masterDetail",
        required: false
      }]
    }],
    responsive: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "responsive",
        required: false
      }]
    }],
    undoRedo: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "undoRedo",
        required: false
      }]
    }],
    exportFeature: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "export",
        required: false
      }]
    }],
    print: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "print",
        required: false
      }]
    }],
    pivot: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "pivot",
        required: false
      }]
    }],
    serverSide: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "serverSide",
        required: false
      }]
    }],
    tooltip: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "tooltip",
        required: false
      }]
    }],
    cellClick: [{
      type: Output,
      args: ["cellClick"]
    }],
    rowClick: [{
      type: Output,
      args: ["rowClick"]
    }],
    cellActivate: [{
      type: Output,
      args: ["cellActivate"]
    }],
    cellChange: [{
      type: Output,
      args: ["cellChange"]
    }],
    cellCommit: [{
      type: Output,
      args: ["cellCommit"]
    }],
    rowCommit: [{
      type: Output,
      args: ["rowCommit"]
    }],
    changedRowsReset: [{
      type: Output,
      args: ["changedRowsReset"]
    }],
    sortChange: [{
      type: Output,
      args: ["sortChange"]
    }],
    filterChange: [{
      type: Output,
      args: ["filterChange"]
    }],
    columnResize: [{
      type: Output,
      args: ["columnResize"]
    }],
    columnMove: [{
      type: Output,
      args: ["columnMove"]
    }],
    columnVisibility: [{
      type: Output,
      args: ["columnVisibility"]
    }],
    columnStateChange: [{
      type: Output,
      args: ["columnStateChange"]
    }],
    selectionChange: [{
      type: Output,
      args: ["selectionChange"]
    }],
    rowMove: [{
      type: Output,
      args: ["rowMove"]
    }],
    groupToggle: [{
      type: Output,
      args: ["groupToggle"]
    }],
    treeExpand: [{
      type: Output,
      args: ["treeExpand"]
    }],
    detailExpand: [{
      type: Output,
      args: ["detailExpand"]
    }],
    responsiveChange: [{
      type: Output,
      args: ["responsiveChange"]
    }],
    copy: [{
      type: Output,
      args: ["copy"]
    }],
    paste: [{
      type: Output,
      args: ["paste"]
    }],
    undoRedoAction: [{
      type: Output,
      args: ["undoRedoAction"]
    }],
    exportComplete: [{
      type: Output,
      args: ["exportComplete"]
    }],
    printStart: [{
      type: Output,
      args: ["printStart"]
    }],
    printComplete: [{
      type: Output,
      args: ["printComplete"]
    }]
  });
})();
export {
  AngularGridAdapter,
  BaseFilterPanel,
  BaseGridEditor,
  BaseGridEditorCVA,
  BaseOverlayEditor,
  GRID_ICONS,
  GRID_TYPE_DEFAULTS,
  Grid,
  GridAdapter,
  GridColumnEditor,
  GridColumnView,
  GridDetailView,
  GridFormArray,
  GridIconRegistry,
  GridLazyForm,
  GridResponsiveCard,
  GridToolPanel,
  GridTypeRegistry,
  TbwEditor as TbwCellEditor,
  TbwRenderer as TbwCellView,
  TbwEditor,
  TbwGridColumn,
  TbwGridHeader,
  TbwGridToolButtons,
  TbwRenderer,
  w as clearFeatureRegistry,
  a as createPluginFromFeature,
  c as getFeatureFactory,
  getFormArrayContext,
  getLazyFormContext,
  f as getRegisteredFeatures,
  injectGrid,
  isComponentClass,
  s as isFeatureRegistered,
  provideGridIcons,
  provideGridTypeDefaults,
  i as registerFeature
};
//# sourceMappingURL=@toolbox-web_grid-angular.js.map
