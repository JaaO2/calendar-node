import { ValidationChain } from "express-validator";
import eventNameValidator from "./event/eventName.validator";
import dateValidator from "./event/date.validator";
import timeFromValidator from "./event/time_from.validator";
import timeToValidator from "./event/time_to.validator";
import descriptionValidator from "./event/description.validator";
import personsValidator from "./event/persons.validator";

const EventValidator : ValidationChain[] = [
    eventNameValidator,
    dateValidator,
    timeFromValidator,
    timeToValidator,
    descriptionValidator,
    personsValidator
];

export default EventValidator