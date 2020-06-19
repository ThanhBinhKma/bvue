'use strict';
const dotenv = require('dotenv');
dotenv.config();

const CONFIG = require('./env/' + (process.env.CONFIG_ENV || 'development')).default;
export default CONFIG;
