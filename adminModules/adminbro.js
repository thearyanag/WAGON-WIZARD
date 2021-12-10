const AdminBro = require('admin-bro');
const mongooseAdminBro = require('@admin-bro/mongoose');
const expressAdminBro = require('@admin-bro/express');

const Admin = require('../models/admin');
const Workshop = require('../models/workshopProfile');
const TripDetails = require('../models/tripDetails');
const Driver = require('../models/driverProfile');

AdminBro.registerAdapter(mongooseAdminBro)
const AdminBroOptions = {
    resources : [ Admin , Workshop , TripDetails , Driver ]
};

const adminBro = new AdminBro(AdminBroOptions);
const adminBroRouter = expressAdminBro.buildRouter(adminBro);

module.exports = { adminBro , adminBroRouter };
