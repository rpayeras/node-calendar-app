const {Router} = require('express');
const router = Router();

const {getEvents, createEvent, updateEvent, deleteEvent} = require('../controllers/events');
const { validateRequestBody } = require("../middlewares/validations");

const {check} = require('express-validator');
const { validateJwt } = require('../middlewares/validate-jwt');

const { isDate } = require('../helpers/isDate');

router.use(validateJwt);

router.get('/', getEvents)

router.post('/', [
    check('title', 'Ti ntle is mandatory').not().isEmpty(),
    check('startDate', 'startDate must be a date').custom(isDate),
    check('endDate', 'endDate must be a date').custom(isDate),
    check('notes', 'notes must be a string').isString(),
    validateRequestBody
], createEvent)

router.put('/:id', [
    check('title', 'Title is mandatory').not().isEmpty(),
    check('startDate', 'startDate must be a date').custom(isDate),
    check('endDate', 'endDate must be a date').custom(isDate),
    check('notes', 'notes must be a string').isString(),
    validateRequestBody
], updateEvent)

router.delete('/:id', [
    validateRequestBody
], deleteEvent)

module.exports = router;