const unitChecker = (prevUnits, currentUnits) => {
    minLimit = (prevUnits - 0.05*prevUnits);
    maxLimit = (prevUnits + 0.05*prevUnits);

    if (currentUnits < minLimit || currentUnits > maxLimit)  {
        return false;
    }

    return true;
}

module.exports = unitChecker;