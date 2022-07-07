'use strict';

/**
 * home-hero service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::home-hero.home-hero');
