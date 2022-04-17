const weightChecker = (prevWeight, currWeight) => {

    const minLimit = (prevWeight - 0.05*prevWeight);
    const maxLimit = (prevWeight + 0.05*prevWeight);

    console.log(minLimit, maxLimit)

    if (currWeight < minLimit || currWeight > maxLimit)  {
        return false;
    }

    return true;
}

module.exports = weightChecker;