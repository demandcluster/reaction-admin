/**
 * @namespace Constants
 *
 * @description Application global variables and constants to set to configure default layout, workflows and more.
 * Learn how to override layout and workflow constants in the [docs](https://docs.demandcluster.com/reaction-docs/trunk/layout).
 */

/**
 * @constant
 * @type {string}
 * @default
 * @name DEFAULT_LAYOUT
 * @memberof Constants
 * @summary Use this to override a default layout. Learn [what layouts are](https://docs.demandcluster.com/reaction-docs/trunk/layout) and how to [create a custom layout](https://docs.demandcluster.com/reaction-docs/trunk/plugin-layouts-3) in the docs.
 * @example import { Session } from "meteor/session";
 * Session.set("DEFAULT_LAYOUT", "customCoreLayout");
 */
export const DEFAULT_LAYOUT = "coreLayout";

/**
 * @constant
 * @type {string}
 * @default
 * @name DEFAULT_WORKFLOW
 * @memberof Constants
 * @summary Use this to override and set default workflow
 */
export const DEFAULT_WORKFLOW = "coreWorkflow";

/**
 * @constant
 * @type {string}
 * @default
 * @name INDEX_OPTIONS
 * @memberof Constants
 * @summary Use this to override the home Package
 * @example Session.set("INDEX_OPTIONS", {
    template: "customHomePageTemplate",
    layoutHeader: "NavBar",
    layoutFooter: "Footer",
    notFound: "notFound",
    dashboardControls: "dashboardControls",
    adminControlsFooter: "adminControlsFooter"
  });
 */
export const INDEX_OPTIONS = {
  workflow: "coreProductGridWorkflow"
};

/**
 * @constant
 * @type {number}
 * @default
 * @name ITEMS_INCREMENT
 * @memberof Constants
 * @summary Set default number of items to load for product grid
 */
export const ITEMS_INCREMENT = 24;
