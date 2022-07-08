'use strict';

/**
 * global-data router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::global-data.global-data');
